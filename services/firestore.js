// lib/firestore.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { getDoc, getFirestore} from "firebase/firestore";


import { doc, setDoc} from "firebase/firestore";
export const getUsers = async () => {
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);
  // console.log("users:",usersRef);
  // console.log("snapshot:",snapshot);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addUserToFirestore = async (user) => {
  if (!user || !user.uid) return;

  try {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        createdAt: new Date().toISOString(),
      });
      console.log("✅ User added to Firestore");
    } else {
      console.log("ℹ️ User already exists in Firestore");
    }
  } catch (error) {
    console.error("❌ Error adding user to Firestore:", error);
  }
};