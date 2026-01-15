import { SignupForm } from "@/components/auth/signup-form";
import { useAuthStore } from "@/stores/use-auth-store";
import { Navigate } from "react-router";

const SignUp = () => {
  const { user } = useAuthStore();

  if (user) return <Navigate to="/" replace />;
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 absolute inset-0 z-0 bg-gradient-purple">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUp;
