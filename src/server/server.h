#pragma once

#include <App.h>
#include <string>
#include <string_view>
#include "json.hpp"
using json = nlohmann::json;
namespace fs = std::filesystem;
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
