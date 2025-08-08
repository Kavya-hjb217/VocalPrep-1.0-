"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { UserDetailContext } from "./context/UserDetailContext";
import { AuthProvider } from "./context/AuthContext";

function Provider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await createNewUser(user);
        const fetchedUser = await fetchUserProfile(user.email);
        setUserData(fetchedUser);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const createNewUser = async (user) => {
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(usersRef, {
        name: user.displayName || "No Name",
        email: user.email,
        picture: user.photoURL || "",
      });
      console.log("New user created in Firestore");
    } else {
      console.log("User already exists:", querySnapshot.docs[0].data());
    }
  };

  const fetchUserProfile = async (email) => {
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    return null;
  };

  return (
    <AuthProvider>
      <UserDetailContext.Provider value={userData}>
        {children}
      </UserDetailContext.Provider>
    </AuthProvider>
  );
}

export default Provider;

export function Provider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
