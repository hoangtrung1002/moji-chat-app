import SignOut from "@/components/auth/signout";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/axios";
import { useAuthStore } from "@/stores/use-auth-store";
import { toast } from "sonner";

const ChatApp = () => {
  const user = useAuthStore((state) => state.user);

  const handleClick = async () => {
    try {
      await fetchData("/users/test", { withCredentials: true });
      toast.success("ok");
    } catch (error) {
      toast.error("error");
      console.error(error);
    }
  };

  return (
    <div>
      {user?.username}
      <SignOut />
      <Button onClick={handleClick}>test</Button>
    </div>
  );
};

export default ChatApp;
