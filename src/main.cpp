#include "server/server.h"

int main() {
    WebSocketServer server(9001);
    server.run();
    return 0;
}
