import { signUpSchema, type signUpSchemaType } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: signUpSchemaType) => {
    console.log(data);
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
