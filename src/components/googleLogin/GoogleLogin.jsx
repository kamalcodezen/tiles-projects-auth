"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const GoogleLogin = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onRequest: () => {
          //show loading
          //   console.log("Loading....");
        },
        onSuccess: () => {
          //redirect to the dashboard or sign in page
          toast.success("Google Login Successful");
          router.push("/");
        },
        onError: (ctx) => {
          // display the error message
          console.log(ctx.error.message);
        },
      },
    );
  };
  return (
    <div>
      <Button variant="bordered" onPress={handleGoogleLogin}>
        Continue with Google
      </Button>
    </div>
  );
};
export default GoogleLogin;
