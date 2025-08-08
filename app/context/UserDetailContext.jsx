// context/UserDetailContext.js
"use client";

import { createContext, useState, useEffect } from "react";
import { getUsers } from "@/services/firestore"; // make sure this fetches Firestore user data

export const UserDetailContext = createContext(null);

export const UserDetailProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // optional: for UI fallback
  const [error, setError] = useState(null);     // optional: for logging errors

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
         console.log("user data front:",users); 
        if (users && users.length > 0) {
          setUserData(users[0]); // Just using first user as placeholder
        } else {
          console.warn("No users found in Firestore.");
        }
      } catch (err) {
        console.error("Error fetching users from Firestore:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const contextValue = {
    userData,
    loading,
    error,
  };

  return (
    <UserDetailContext.Provider value={contextValue}>
      {children}
    </UserDetailContext.Provider>
  );
};
