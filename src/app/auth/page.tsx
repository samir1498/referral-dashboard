"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const handleLogin = () => {
    // In a real app, you'd perform authentication here
    // For this mock auth, we'll just set a cookie
    document.cookie = "auth=true; path=/";
    router.push("/dashboard/referrals");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">This is a mock login screen.</p>
          <Button onClick={handleLogin} className="w-full">
            Login as Demo User
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
