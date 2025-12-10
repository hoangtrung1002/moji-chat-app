import { signUpSchema, type signUpSchemaType } from "@/lib/validations/auth";
import { useAuthStore } from "@/stores/use-auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const useSignUpForm = () => {
  const { signUp } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: signUpSchemaType) => {
    const { email, firstName, lastName, password, username } = data;

    await signUp(username, password, email, firstName, lastName);
    navigate("/signin");
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
