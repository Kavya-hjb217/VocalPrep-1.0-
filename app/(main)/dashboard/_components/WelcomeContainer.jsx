"use client";
import React from "react";
import { useContext } from "react";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import { useUser } from "@/app/context/useUser";
import Image from "next/image";
function WelcomeContainer() {
  var user= useUser();
  user=user.userData;
  //  const context = useContext(UserDetailContext);
  // console.log("user data in webconatainer:",user);
  console.log("user context in WelcomeContainer:",user);
  if (!user) return <p>Loading user...</p>; // fallback UI

  return (
    <div className="p-4 text-white bg-white rounded-2xl ">
      <div className="text-xl font-semibold text-black  flex flex-row items-center">
       <h1>Welcome Back,</h1> 
        <h2 className="text-black ml-1">{user.displayName}</h2>
        



    <Image
        src={user.photoURL} // Fallback image if photoURL is not available
        alt="user avatar"
        width={40}
        height={40}
        className="rounded-full mt-2 ml-2"
      />
      </div>
     
    </div>
  );
}
 
export default WelcomeContainer;
