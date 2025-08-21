// lib/firestore.js
import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  doc, 
  setDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";



  



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

// export const saveInterviewToFirestore = async (formData, questionList) => {
//   return await addDoc(collection(db, "Created Interviews"), {
//     created_at: serverTimestamp(),
//     duration: formData.duration || "",
//     interview_id: crypto.randomUUID(),
//     jobDescription: formData.jobDescription || "",
//     jobPosition: formData.jobPosition || "",
//     questionlist: questionList, // Array of questions
//    userEmail: formData.userEmail || "",
//   });
// };
export const saveInterviewToFirestore = async (formData, questionList) => {
  try {
    // Step 1: Generate a new docRef manually
    const docRef = doc(collection(db, "Created Interviews"));

    // Step 2: Save data + doc ID in one call
    await setDoc(docRef, {
      interview_id: docRef.id,
      created_at: serverTimestamp(),
      duration: formData.duration || "",
      jobDescription: formData.jobDescription || "",
      jobPosition: formData.jobPosition || "",
      questionlist: questionList,
      userEmail: formData.userEmail || "",
    });

    console.log("✅ Interview saved with ID:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("❌ Error saving interview:", error);
    throw error;
  }
};