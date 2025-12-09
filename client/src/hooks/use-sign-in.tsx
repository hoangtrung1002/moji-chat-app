import { signInSchema, type signInSchemaType } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useSignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: signInSchemaType) => {
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

export default useSignInForm;
