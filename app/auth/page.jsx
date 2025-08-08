"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { auth, provider, signInWithPopup } from "@/services/firebase";
import { getUsers, addUserToFirestore } from "@/services/firestore";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  // Firebase Google Sign-In
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);

      // 🔥 Add user to Firestore and fetch all users
      await addUserToFirestore(user);
      await getUsers();

      // ✅ Redirect to homepage
      router.push("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center border rounded-2xl p-8">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={100}
          className="w-[150px]"
        />
        <div className="flex flex-col items-center">
          <Image
            src={"/login.png"}
            alt="login"
            width={600}
            height={400}
            className="w-[400px] h-[250px] rounded-2xl"
          />

          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome to VocalPrep
          </h2>
          <p className="text-gray-500 text-center">Sign in with Google</p>

          <Button className="mt-7 w-full" onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
