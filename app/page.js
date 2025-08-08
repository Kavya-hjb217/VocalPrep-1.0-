"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="h-screen w-full bg-white-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md w-full text-center border border-gray-200">
        
        {/* Heading */}
        <h2 className="text-3xl font-semibold mb-4 tracking-wide text-gray-900">
          Welcome to VocalPrep
        </h2>
        
        
        {/* Logo / Illustration */}
        <div className="flex justify-center mb-6">
          <Image
            src="/vocalprep-illustration.png"
            alt="VocalPrep Illustration"
            width={400}
            height={140}
            className="object-contain"
          />
        </div>

        

        {/* Logged in message or button */}
        {user ? (
          <>
            <p className="mb-6 text-lg text-gray-600">
              Logged in as:{" "}
              <strong className="text-blue-600">{user.email}</strong>
            </p>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </>
        ) : (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200"
            onClick={() => router.push("/login")}
          >
            Click here to Login
          </Button>
        )}
      </div>
    </div>
  );
}
