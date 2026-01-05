import { useAuthStore } from "@/stores/use-auth-store";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const SignOut = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button variant="completeGhost" onClick={handleSignOut}>
      <LogOut className="text-destructive" />
      Logout
    </Button>
  );
};

export default SignOut;
