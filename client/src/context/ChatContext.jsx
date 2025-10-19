// import { createContext, useContext, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import toast from "react-hot-toast";
// import { useEffect } from "react";


// export const  ChatContext=createContext();

// export const ChatProvider=({children})=>{
//     const [messages,setMessages]=useState([]);
//     const [users,setUsers]=useState([]);
//     const [selectedUser,setSelectedUser]=useState(null);
//     const [unseenMessages,setUnseenMessages]=useState({});

//     const {socket, axios}=useContext(AuthContext);

//     //funcrion to get all users for sidebar

//     const getUsers=async()=>{
//         try{
//             const {data}=await axios.get("/api/users");
//             if(data.success){
//                 setUsers(data.users)
//                 setUnseenMessages(data.unseenMessages||{});
//             }

//         } catch(error){
//             toast.error(error.message)
//         }
//     };

//         // Add a new user to context instantly
//     const addUser = (newUser) => {
//         setUsers(prev => [...prev, newUser]);
//     };
//     //function to get messages for selected user
//     const getMessages=async(userId)=>{
//         try{
//             const {data}=await axios.get(`/api/messages/${userId}`);
//             if(data.success){
//                 setMessages(data.message)
//             }

//         } catch(error){
//             toast.error(error.message)
//         }
//     }

//     //function to send message to selected user
//     const sendMessage=async(messageData)=>{
//         try{
//             const {data}=await axios.post(`/api/messages/send/${selectedUser._id}`,messageData);
//             if(data.success){
//                 setMessages((prevMessages)=>[...prevMessages,data.newMessage])
//             }else{
//                 toast.error(data.message);
//             }

//         } catch(error){
//             toast.error(error.message)
//         }
//     }
//     //function to subscribe to messages for selected user
//     const subscribeToMessages=()=>{
//         if(!socket) return;
//         socket.on("newMessage",(newMessage)=>{
//             if(selectedUser && newMessage.senderId===selectedUser._id){
//                 newMessage.seen=true;
//                 setMessages((prevMessages)=> [...prevMessages,newMessage]);
//                 axios.put(`/api/messages/mark/${newMessage._id}`);
  
//             }else{
//                 setUnseenMessages((prevUnseenMessages)=>({
//                     ...prevUnseenMessages,[newMessage.senderId]:prevUnseenMessages[newMessage.senderId]? prevUnseenMessages[newMessage.senderId]+1:1

//                 }))
//             }
//         })
//     }
//     // function to unsubscribe from messages
//     const unsubscribeFromMessages=()=>{
//         if(socket) socket.off("newMessage");
//     }
//      // ✅ Fetch users once when provider mounts
//   useEffect(() => {
//     getUsers();
//   }, []);
//     useEffect(()=>{
//         subscribeToMessages();
//         return()=>unsubscribeFromMessages();
//     },[socket,selectedUser])
//     const value={
//             users,
//             messages,
//             selectedUser,
//             sendMessage,
//             setSelectedUser,
//             unseenMessages,
//             setUnseenMessages,
//             getUsers,
//             getMessages,
//             addUser,

//     }
//     return(
//         <ChatContext.Provider value={value}>
//             {children}
//         </ChatContext.Provider>
//     )
// }


import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const [currentUser, setCurrentUser] = useState(null); // ✅ Add current user

  const { socket, axios, user: authUser } = useContext(AuthContext); // assuming AuthContext has logged-in user

  // Set current user on mount
  useEffect(() => {
    if (authUser) setCurrentUser(authUser);
  }, [authUser]);

  // Fetch all users for sidebar
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages || {});
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addUser = (newUser) => setUsers((prev) => [...prev, newUser]);

  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) setMessages(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) setMessages((prev) => [...prev, data.newMessage]);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const subscribeToMessages = () => {
    if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: prev[newMessage.senderId]
            ? prev[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value = {
    users,
    messages,
    selectedUser,
    currentUser, // ✅ expose currentUser
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    getUsers,
    getMessages,
    addUser,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
