import { signInSchema, type signInSchemaType } from "@/lib/validations/auth";
import { useAuthStore } from "@/stores/use-auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const useSignInForm = () => {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: signInSchemaType) => {
    const { identifier, password } = data;
    await signIn(identifier, password);
    navigate("/");
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
  };
};

export default useSignInForm;
