import express from "express";
import "dotenv/config"
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server, Socket } from "socket.io";
//create express app and HTTP server
const app = express();
const server=http.createServer(app)

//initialize socket.io server
export const io=new Server(server,{cors:{origin:"*"}})

//store online users
export const userSocketMap={}; //{userId:socketId}

// socket.io connection handler
io.on("connection",(Socket)=>{
  const userId=Socket.handshake.query.userId;
  console.log("User Connected",userId);

  if(userId) userSocketMap[userId]=Socket.id;

  //emit online users to all connected client
  io.emit("getOnlineUsers",Object.keys(userSocketMap));

  Socket.on("disconnect",()=>{
    console.log("User Disconnected",userId);
    delete userSocketMap[userId];
    io.emit("getOnlinUsers",Object.keys(userSocketMap))
  });
})

//middleware
app.use(express.json({limit:"4mb"}));
app.use(cors());

app.get("/api/status", (req, res) => {
  res.json({ message: "Server is live" });
});
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter);
await connectDB();
const PORT=process.env.PORT||5000;
server.listen(PORT,()=>console.log("Server is running on PORT: "+PORT));


// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import http from "http";
// import { connectDB } from "./lib/db.js";
// import userRouter from "./routes/userRoutes.js";
// import messageRouter from "./routes/messageRoutes.js";
// import { Server } from "socket.io";

// const app = express();
// const server = http.createServer(app);

// // Initialize Socket.IO
// export const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // match your frontend
//     methods: ["GET", "POST"],
//   },
// });

// // Store online users
// export const userSocketMap = {}; // { userId: socketId }

// // Socket.IO connection handler
// io.on("connection", (socket) => {
//   const userId = socket.handshake.query.userId;
//   console.log("✅ User Connected:", userId);

//   if (userId) userSocketMap[userId] = socket.id;

//   // Emit online users to all connected clients
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on("disconnect", () => {
//     console.log("❌ User Disconnected:", userId);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// // Middleware
// app.use(express.json({ limit: "4mb" }));
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

// // Routes
// app.get("/api/status", (req, res) => {
//   res.json({ message: "Server is live" });
// });
// app.use("/api/auth", userRouter);
// app.use("/api/messages", messageRouter);

// // Connect DB
// await connectDB();

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log("🚀 Server running on PORT:", PORT));
