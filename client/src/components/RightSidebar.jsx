// import React, { useContext } from 'react'
// import assets, { imagesDummyData } from '../assets/assets'
// import { ChatContext } from '../context/ChatContext'

// const RightSidebar = ({ selectedUser }) => {
//   return (
//     selectedUser && (
//       <div
//         className={`bg-[#018582]/10 text-white w-full relative overflow-y-scroll ${
//           selectedUser ? "max-md:w-full" : "max-md:hidden"
//         }`}
//       >
//         {/* Profile Section */}
//         <div className="pt-8 flex flex-col items-center gap-2 text-xs font-light mx-auto">
//           <img
//             src={selectedUser?.profilePic || assets.avatar_icon}
//             alt="User Avatar"
//             className="w-16 aspect-[1/1] rounded-full"
//           />
//           <h1 className="px-10 text-lg font-medium mx-auto flex items-center gap-2">
//             {selectedUser.fullName}
//             <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
//           </h1>
//           <p className="px-10 mx-auto">{selectedUser.bio}</p>
//         </div>

//         <hr className="border-[#ffffff50] my-4" />

//         {/* Media Section */}
//         <div>
//           <p className="px-5 text-xs">Media</p>
//           <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80 p-5">
//             {imagesDummyData.map((url, index) => (
//               <div
//                 key={index}
//                 onClick={() => window.open(url)}
//                 className="cursor-pointer rounded"
//               >
//                 <img src={url} alt="" className="h-full rounded-md" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Logout Button */}
//         <div className="py-5 flex justify-center">
//           <button className="bg-gradient-to-r from-purple-400 to-purple-800 text-white py-2 px-8 rounded-full shadow-lg">
//             Log Out
//           </button>
//         </div>
//       </div>
//     )
//   )
// }

// export default RightSidebar



import React, { useContext } from "react";
import assets, { imagesDummyData } from "../assets/assets";
import { ChatContext } from "../context/ChatContext";

const RightSidebar = () => {
  const { selectedUser, currentUser } = useContext(ChatContext);

  // fallback to currentUser if no selectedUser
  const userToShow = selectedUser || currentUser;

  if (!userToShow) return null; // wait until currentUser is loaded

  return (
    <div className="bg-[#018582]/10 text-white w-full relative overflow-y-scroll max-md:w-full">
      {/* Profile Section */}
      <div className="pt-8 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img
          src={userToShow.profilePic || assets.avatar_icon}
          alt="User Avatar"
          className="w-16 aspect-[1/1] rounded-full"
        />
        <h1 className="px-10 text-lg font-medium mx-auto flex items-center gap-2">
          {userToShow.fullName}
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
        </h1>
        <p className="px-10 mx-auto">{userToShow.bio}</p>
      </div>

      <hr className="border-[#ffffff50] my-4" />

      {/* Media Section */}
      <div>
        <p className="px-5 text-xs">Media</p>
        <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80 p-5">
          {imagesDummyData.map((url, index) => (
            <div
              key={index}
              onClick={() => window.open(url)}
              className="cursor-pointer rounded"
            >
              <img src={url} alt="" className="h-full rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="py-5 flex justify-center">
        <button className="bg-gradient-to-r from-purple-400 to-purple-800 text-white py-2 px-8 rounded-full shadow-lg">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
