import { useAuthStore } from "@/stores/use-auth-store";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

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
  return <Button onClick={handleSignOut}>Logout</Button>;
};

export default SignOut;
