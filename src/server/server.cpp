#include "server.h"
#include <iostream>
#include <fstream>
#include <sstream>

WebSocketServer::WebSocketServer(int port) : port(port) {}
static bool is_authenticated = false;
static std::string readFile(const std::string &path)
{
    std::ifstream file(path, std::ios::binary);
    if (!file.is_open())
        return "";
    std::ostringstream ss;
    ss << file.rdbuf();
    return ss.str();
}
static std::string detectMime(const std::string &path)
{
    static const std::unordered_map<std::string, std::string> m{
        {".html", "text/html; charset=utf-8"}, {".css", "text/css; charset=utf-8"}, {".js", "application/javascript; charset=utf-8"}, {".png", "image/png"}, {".jpg", "image/jpeg"}, {".jpeg", "image/jpeg"}, {".gif", "image/gif"}};
    auto ext = fs::path(path).extension().string();
    if (auto it = m.find(ext); it != m.end())
        return it->second;
    return "application/octet-stream";
}
static void handleStaticFile(auto *res, auto *req, const std::string& basePath, const std::string_view& url, bool authenticationRequired = false) {
    // Проверка аутентификации, если требуется
    if (authenticationRequired && !is_authenticated) {
        res->writeStatus("403 Forbidden")->end("Access denied. Please login first.");
        return;
    }

    std::string filePath;
    std::string relativePath;

    // Определяем относительный путь к файлу
    // Если url начинается с basePath, убираем basePath из url, чтобы получить относительный путь.
    // Это для случаев, когда вы хотите обрабатывать что-то вроде /main/*, где /main это basePath
    // Если basePath - это "src/www" и url - "/style.css", то relativePath будет "style.css"
    // Если basePath - это "src/www/main" и url - "/main/script.js", то relativePath будет "script.js"

    // Этот подход более гибок и позволяет избежать жесткой привязки к началу URL
    // в обработчиках app.get, которые используют URL с подстановочными знаками.

    // Для случаев типа app.get("/style.css")
    if (url.find_first_of('.') != std::string::npos) { // Простое предположение, что это файл
        relativePath = std::string(url);
        // Удаляем ведущий слэш, если он есть, чтобы путь был относительным к basePath
        if (!relativePath.empty() && relativePath.front() == '/') {
            relativePath.erase(0, 1);
        }
    } else { // Для случаев типа app.get("/main/*") или app.get("/image/*")
        // Извлекаем часть URL после базового пути, если он есть
        size_t base_url_pos = url.find(basePath.substr(basePath.find_last_of('/') + 1));
        if (base_url_pos != std::string::npos) {
            relativePath = std::string(url.substr(base_url_pos + basePath.substr(basePath.find_last_of('/') + 1).length()));
            if (!relativePath.empty() && relativePath.front() == '/') {
                relativePath.erase(0, 1); // Удаляем ведущий слэш для формирования пути
            }
        } else {
            relativePath = ""; // Если нет совпадения, оставляем пустым, обработаем как index.html
        }
    }


    // Обработка случаев, когда URL указывает на директорию (например, "/main/")
    if (relativePath.empty() || relativePath == "/") {
        relativePath = "index.html";
    }

    // Защита от Path Traversal
    if (relativePath.find("..") != std::string::npos || relativePath.find("./") != std::string::npos) {
        res->writeStatus("400 Bad Request")->end("Invalid path");
        return;
    }

    filePath = basePath + "/" + relativePath;

    // Проверяем существование файла и что это действительно файл
    if (!fs::exists(filePath) || !fs::is_regular_file(filePath)) {
        res->writeStatus("404 Not Found")->end("File not found");
        std::cerr << "File not found: " << filePath << std::endl; // Используем cerr для ошибок
        return;
    }

    std::string content = readFile(filePath);
    if (content.empty()) {
        // Это может произойти, если файл пуст или произошла ошибка чтения, но fs::exists вернул true
        res->writeStatus("500 Internal Server Error")->end("Error reading file");
        std::cerr << "Error reading file content: " << filePath << std::endl;
        return;
    }

    std::string mime = detectMime(filePath);
    res->writeHeader("Content-Type", mime);
    res->end(content);
}
void WebSocketServer::run()
{
    uWS::App app({.key_file_name = "misc/key.pem",
                  .cert_file_name = "misc/cert.pem",
                  .passphrase = "1234"});

    // HTTP маршруты для отдачи статических файлов
    app.get("/*", [](auto *res, auto *req)
            {
        handleStaticFile(res, req, "src/www", req->getUrl());
    });
    app.get("/main/*", [](auto *res, auto *req)
            {
        handleStaticFile(res, req, "src/www/", req->getUrl(), true);
    });

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
                                 },
                                 .message = [this](auto *ws, std::string_view message, uWS::OpCode opCode)
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
