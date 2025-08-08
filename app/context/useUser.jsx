// src/context/useUser.js
import { useContext } from "react";
import { UserDetailContext } from "./UserDetailContext";


export const useUser = () => {
  const context = useContext(UserDetailContext);
  console.log("user context:",context);
  if (!context) {
    throw new Error("useUser must be used within a UserDetailProvider");
  }
  return context;
};
// export default useUser;