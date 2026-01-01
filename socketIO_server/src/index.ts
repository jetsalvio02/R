import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

httpServer.on("request", (req, res) => {
  if (req.method === "POST" && req.url === "/emit") {
    let body = "";

    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      //   const { pollId } = JSON.parse(body)
      res.writeHead(200);
      res.end("ok");
    });
  }
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server is running on PORT ${PORT}`);
});
