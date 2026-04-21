import { SignIn } from "@clerk/clerk-react";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAF9] px-4">
      <div className="w-full max-w-md">
        <SignIn routing="path" path="/login" signUpUrl="/signup" />
      </div>
    </div>
  );
}
