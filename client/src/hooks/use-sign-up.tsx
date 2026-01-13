import { signUpSchema, type signUpSchemaType } from "@/lib/validations/auth";
import { authService } from "@/services/auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useSignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: signUpSchemaType) => {
    try {
      const { email, firstName, lastName, password, username } = data;
      await authService.signUp(username, password, email, firstName, lastName);
      toast.success(
        "Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập."
      );
      navigate("/signin");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
  };
};

export default useSignUpForm;
