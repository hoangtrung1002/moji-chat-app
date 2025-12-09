import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useSignInForm from "@/hooks/use-sign-in";

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { errors, handleSubmit, isSubmitting, register, onSubmit } =
    useSignInForm();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* header - logo */}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit text-center">
                  <img src="/logo.svg" alt="logo" />
                </a>
                <h1 className="text-2xl font-bold">Chào mừng quay lại</h1>
                <p className="text-muted-foreground text-balance">
                  Đăng nhập vào tài khoản Moji của bạn
                </p>
              </div>

              {/* username */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="identifier" className="block text-sm">
                  Tên đăng nhập hoặc email
                </Label>
                <Input
                  type="text"
                  id="identifier"
                  placeholder="username/email"
                  {...register("identifier")}
                />
                {errors.identifier && (
                  <p className="text-destructive text-sm">
                    {errors.identifier.message}
                  </p>
                )}
              </div>
              {/* password */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm">
                  Mật khẩu
                </Label>
                <Input
                  type="password"
                  id="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* submit action */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Đăng nhập
              </Button>
              <div className="text-center text-sm">
                Chưa có tài khoản?{" "}
                <a href="/signup" className="underline">
                  Đăng ký
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offset-4">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
        <a href="#">Chích sách bảo mật</a> của chúng tôi
        <input type="text" name="" id="" />.
      </div>
    </div>
  );
}
