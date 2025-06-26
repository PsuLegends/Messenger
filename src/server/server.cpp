#include "server.h"
#include <iostream>
#include <fstream>
#include <sstream>

WebSocketServer::WebSocketServer(int port) : port(port) {}

static std::string readFile(const std::string &path) {
    std::ifstream file(path, std::ios::binary);
    if (!file.is_open()) return "";
    std::ostringstream ss;
    ss << file.rdbuf();
    return ss.str();
}

void WebSocketServer::run() {
    uWS::App app({
        .key_file_name = "misc/key.pem",
        .cert_file_name = "misc/cert.pem",
        .passphrase = "1234"
    });

    // HTTP маршруты для отдачи статических файлов
    app.get("/", [](auto *res, auto *req) {
        std::string content = readFile("src/www/index.html");
        if (content.empty()) {
            res->writeStatus("404 Not Found")->end("File not found");
            std::cout<<"index.html не найден"<<std::endl;
            return;
        }
        res->writeHeader("Content-Type", "text/html; charset=utf-8");
        res->end(content);
    });

    app.get("/style.css", [](auto *res, auto *req) {
        std::string content = readFile("src/www/style.css");
        if (content.empty()) {
            res->writeStatus("404 Not Found")->end("File not found");
            std::cout<<"style.css не найден"<<std::endl;
            return;
        }
        res->writeHeader("Content-Type", "text/css; charset=utf-8");
        res->end(content);
    });

    app.get("/script.js", [](auto *res, auto *req) {
        std::string content = readFile("src/www/scripts.js");
        if (content.empty()) {
            res->writeStatus("404 Not Found")->end("File not found");
            std::cout<<"scripts.js не найден"<<std::endl;
            return;
        }
        res->writeHeader("Content-Type", "application/javascript; charset=utf-8");
        res->end(content);
    });

    // WebSocket сервер
    app.ws<PerSocketData>("/*", {
        .compression = uWS::CompressOptions(uWS::DEDICATED_COMPRESSOR | uWS::DEDICATED_DECOMPRESSOR),
        .maxPayloadLength = 100 * 1024 * 1024,
        .idleTimeout = 16,
        .maxBackpressure = 100 * 1024 * 1024,
        .closeOnBackpressureLimit = false,
        .resetIdleTimeoutOnSend = false,
        .sendPingsAutomatically = true,
        .upgrade = nullptr,
        .open = [](auto *ws) {
            std::cout << "Новое WebSocket соединение открыто." << std::endl;
            // Можно отправить приветственное сообщение или запрос на аутентификацию
            ws->send(R"({"action":"request_auth","message":"Пожалуйста, войдите или зарегистрируйтесь"})", uWS::OpCode::TEXT);
        },
        .message = [](auto *ws, std::string_view message, uWS::OpCode opCode) {
            // Здесь нужно реализовать обработку сообщений (логика аутентификации, регистрация и т.п.)
            std::cout << "Получено сообщение: " << message << std::endl;
            ws->send(message, opCode, false); // Эхо назад для теста
        },
        .dropped = [](auto */*ws*/, std::string_view /*message*/, uWS::OpCode /*opCode*/) {},
        .drain = [](auto */*ws*/) {},
        .ping = [](auto */*ws*/, std::string_view) {},
        .pong = [](auto */*ws*/, std::string_view) {},
        .close = [](auto */*ws*/, int /*code*/, std::string_view /*message*/) {
            std::cout << "WebSocket соединение закрыто." << std::endl;
        }
    });

    app.listen(port, [this](auto *listen_socket) {
        if (listen_socket) {
            std::cout << "Сервер слушает порт " << port << std::endl;
        } else {
            std::cerr << "Не удалось открыть порт " << port << std::endl;
        }
    }).run();
}
