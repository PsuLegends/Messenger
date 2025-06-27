#include "server.h"
#include <iostream>
#include <fstream>
#include <sstream>

WebSocketServer::WebSocketServer(int port) : port(port) {}

static std::string readFile(const std::string &path)
{
    std::ifstream file(path, std::ios::binary);
    if (!file.is_open())
        return "";
    std::ostringstream ss;
    ss << file.rdbuf();
    return ss.str();
}
static bool is_authenticated = false;
void WebSocketServer::run()
{
    uWS::App app({.key_file_name = "misc/key.pem",
                  .cert_file_name = "misc/cert.pem",
                  .passphrase = "1234"});

    // HTTP маршруты для отдачи статических файлов
    app.get("/", [](auto *res, auto *req)
            {
        std::string content = readFile("src/www/index.html");
        if (content.empty()) {
            res->writeStatus("404 Not Found")->end("File not found");
            std::cout<<"index.html не найден"<<std::endl;
            return;
        }
        res->writeHeader("Content-Type", "text/html; charset=utf-8");
        res->end(content); });

    app.get("/style.css", [](auto *res, auto *req)
            {
        std::string content = readFile("src/www/style.css");
        if (content.empty()) {
            res->writeStatus("404 Not Found")->end("File not found");
            std::cout<<"style.css не найден"<<std::endl;
            return;
        }
        res->writeHeader("Content-Type", "text/css; charset=utf-8");
        res->end(content); });

    app.get("/script.js", [](auto *res, auto *req)
            {
        std::string content = readFile("src/www/script.js");
        if (content.empty()) {
            res->writeStatus("404 Not Found")->end("File not found");
            std::cout<<"script.js не найден"<<std::endl;
            return;
        }
        res->writeHeader("Content-Type", "application/javascript; charset=utf-8");
        res->end(content); });
    app.get("/image/*", [](auto *res, auto *req)
            {
                std::string_view url = req->getUrl();  // Пример: "/images/logo.png"
                std::string filename = "src/www" + std::string(url);  // "src/www/images/logo.png"

                std::string content = readFile(filename);
                if (content.empty()) {
                    res->writeStatus("404 Not Found")->end("Image not found");
                    std::cout << "Картинка не найдена: " << filename << std::endl;
                    return;
                }

                // Определим Content-Type по расширению
                if (filename.ends_with(".png")) {
                    res->writeHeader("Content-Type", "image/png");
                } else if (filename.ends_with(".jpg") || filename.ends_with(".jpeg")) {
                    res->writeHeader("Content-Type", "image/jpeg");
                } else if (filename.ends_with(".gif")) {
                    res->writeHeader("Content-Type", "image/gif");
                } else {
                    res->writeHeader("Content-Type", "application/octet-stream");
                }

    res->end(content); });
    app.get("/main/*", [](auto *res, auto *req)
            {
                if (!is_authenticated) {
                    res->writeStatus("403 Forbidden")->end("Access denied. Please login first.");
                    return;
                }

                std::string_view url = req->getUrl();  // например: /main/script.js
                std::string relative = std::string(url.substr(5)); // убираем "/main"

                if (relative.empty() || relative == "/") {
                    relative = "index.html";  // по умолчанию
                } else if (relative.front() == '/') {
                    relative.erase(0, 1); // удаляем ведущий слэш
                }

                // Защита от path traversal
                if (relative.find("..") != std::string::npos) {
                    res->writeStatus("400 Bad Request")->end("Invalid path");
                    return;
                }

                std::string full_path = "src/www/main/" + relative;

                if (!fs::exists(full_path) || !fs::is_regular_file(full_path)) {
                    res->writeStatus("404 Not Found")->end("File not found");
                    std::cout << "Файл не найден: " << full_path << std::endl;
                    return;
                }

                std::string content = readFile(full_path);

                // MIME-тип
                std::string mime = "application/octet-stream";
                if (full_path.ends_with(".html")) mime = "text/html; charset=utf-8";
                else if (full_path.ends_with(".css")) mime = "text/css; charset=utf-8";
                else if (full_path.ends_with(".js")) mime = "application/javascript; charset=utf-8";
                else if (full_path.ends_with(".png")) mime = "image/png";
                else if (full_path.ends_with(".jpg") || full_path.ends_with(".jpeg")) mime = "image/jpeg";
                else if (full_path.ends_with(".gif")) mime = "image/gif";

                res->writeHeader("Content-Type", mime);
                res->end(content); });

    // WebSocket сервер
    app.ws<PerSocketData>("/*", {.compression = uWS::CompressOptions(uWS::DEDICATED_COMPRESSOR | uWS::DEDICATED_DECOMPRESSOR),
                                 .maxPayloadLength = 100 * 1024 * 1024,
                                 .idleTimeout = 16,
                                 .maxBackpressure = 100 * 1024 * 1024,
                                 .closeOnBackpressureLimit = false,
                                 .resetIdleTimeoutOnSend = false,
                                 .sendPingsAutomatically = true,
                                 .upgrade = nullptr,
                                 .open = [](auto *ws)
                                 {
            std::cout << "Новое WebSocket соединение открыто." << std::endl;
            // Можно отправить приветственное сообщение или запрос на аутентификацию
            /*ws->send(R"({"action":"request_auth","message":"Пожалуйста, войдите или зарегистрируйтесь"})", uWS::OpCode::TEXT);*/ },
                                 .message = [](auto *ws, std::string_view message, uWS::OpCode opCode)
                                 {
                                    std::cout << "Получено сообщение: " << message << std::endl;

                                    try {
                                        // Парсим JSON
                                        json parsed = json::parse(message);

                                        if (!parsed.contains("action")) {
                                            ws->send(R"({"error":"Missing 'action' field"})", opCode, false);
                                            return;
                                        }

                                        std::string action = parsed["action"];

                                        // Обработка по значению action
                                        if (action == "login") {
                                            std::string log_in = parsed.value("email", "");
                                            std::string password = parsed.value("password", "");

                                            std::cout << "Аутентификация: " << log_in << std::endl;
                                            is_authenticated = true;

                                            ws->send(R"({"success": true})", opCode, false);
                                        }
                                        else if (action == "register") {
                                            // Пример: {"action": "register", "username": "...", "password": "..."}
                                            std::string username = parsed.value("username", "");
                                            std::string password = parsed.value("password", "");
                                            std::cout << "Регистрация: " << username << std::endl;
                                            // registerUser(ws, username, password);
                                            ws->send(R"({"status":"register_ok"})", opCode, false);
                                        }
                                        else if (action == "echo") {
                                            // Эхо-ответ
                                            ws->send(message, opCode, false);
                                        }
                                        else {
                                            std::string response = R"({"error":"Unknown action: )" + action + R"("})";
                                            ws->send(response, opCode, false);
                                        }
                                    }
                                    catch (const std::exception &e) {
                                        std::cerr << "Ошибка при разборе JSON: " << e.what() << std::endl;
                                        ws->send(R"({"error":"Invalid JSON format"})", opCode, false);
                                    } },
                                 .dropped = [](auto * /*ws*/, std::string_view /*message*/, uWS::OpCode /*opCode*/) {},
                                 .drain = [](auto * /*ws*/) {},
                                 .ping = [](auto * /*ws*/, std::string_view) {},
                                 .pong = [](auto * /*ws*/, std::string_view) {},
                                 .close = [](auto * /*ws*/, int /*code*/, std::string_view /*message*/)
                                 { std::cout << "WebSocket соединение закрыто." << std::endl; }});

    app.listen(port, [this](auto *listen_socket)
               {
        if (listen_socket) {
            std::cout << "Сервер слушает порт " << port << std::endl;
        } else {
            std::cerr << "Не удалось открыть порт " << port << std::endl;
        } })
        .run();
}
static json readMainDirectory(const std::string &path)
{
    json result = json::array();

    for (const auto &entry : fs::directory_iterator(path))
    {
        if (entry.is_regular_file())
        {
            std::string name = entry.path().filename().string();
            std::string content = readFile(entry.path().string());
            result.push_back({{"filename", name},
                              {"content", content}});
        }
    }

    return result;
}