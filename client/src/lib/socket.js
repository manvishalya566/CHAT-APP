// // client/context/socket.js
// import { io } from "socket.io-client";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;

// export const connectSocket = (userData, setOnlineUser, setSocket) => {
//   if (!userData) return;

//   const newSocket = io(backendUrl, {
//     query: { userId: userData._id },
//   });

//   // save socket
//   setSocket(newSocket);

//   // listen for online users
//   newSocket.on("getOnlineUsers", (userIds) => {
//     setOnlineUser(userIds);
//   });

//   return newSocket;
// };
