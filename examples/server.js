/**
 * This is a simple example server, mostly here for demonstration
 * purposes.
 * The subfolders in this directory contain actual client code with
 * supporting tests.
 **/

const WebSocket = require("ws");

const PORT = 8080;
const server = new WebSocket.Server({ port: PORT });

server.on("connection", function connection(ws, req) {
  ws.on("message", function incoming(message) {
    const text = `{"server v2": ${message}}` 

    console.log(`[received] ${message}`);
    console.log(`[sending] ${text}`);
    ws.send(text);
  });

  const remoteAddress = req.socket.remoteAddress;
  const status = `connected111 address ${remoteAddress}`
  console.log(`[connected] ${status}`);
  ws.send(`{"message": "${status}"}`);
});

console.log(`[start] Starting echo server on port ${PORT}.`);
