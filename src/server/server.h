#pragma once

#include <App.h>
#include <string>

class WebSocketServer {
public:
    explicit WebSocketServer(int port = 9001);
    void run();

private:
    int port;

    struct PerSocketData {
        // Можно добавить поля для каждого клиента
    };

    void setupRoutes(uWS::App& app);
};
