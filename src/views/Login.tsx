import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/shared/Button";
import { PasswordInput } from "../components/input/PasswordInput";
import { TextInput } from "../components/input/TextInput";
import { useAuthStore } from "../store/AuthStore";
import { LoginFormFields, LoginSchema } from "../schema/Login.schema";
import { ToggleSwitchField } from "../components/toggleSwitch/ToggleSwitchField";
import { HomeButton } from "../components/shared/HomeButton";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    login,
    getRememberedEmail,
    setRememberedEmail,
    error: loginError,
  } = useAuthStore((state) => state);

  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  useEffect(() => {
    const rememberedEmail = getRememberedEmail();
    if (rememberedEmail) {
      setValue("email", rememberedEmail);
      setValue("rememberMe", true);
    }
  }, [setValue, getRememberedEmail]);

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      if (response.accessToken) {
        localStorage.setItem("authToken", response.accessToken);
        navigate("/");

        if (data.rememberMe) {
          setRememberedEmail(data.email);
        } else {
          setRememberedEmail(null);
        }
      } else {
        console.error("No token received");
      }
    } catch (error) {
      setHasAttemptedLogin(true);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="max-w-[1500px] min-h-screen flex flex-col items-center justify-center m-auto md:gap-8 md:p-4">
      <HomeButton />
      <div className="w-full lg:w-[1000px]">
        <div className="mx-6 grid grid-cols-1 md:grid-cols-2 md:gap-12 items-center justify-center">
          <div className="md:flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center ">
              <h2 className="text-title font-bold font-playpen text-3xl">
                Welcome
              </h2>
              <h2 className="text-primary font-playpen font-medium text-lg md:text-xl mt-2 md:mb-6 text-accent">
                PAWsome places for PAWsome pets
              </h2>
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd_cpvOb8ukzVtTrvl7-_f8s3z8lqGb5-RlfMwDud78ZSZJ59SxRLyHI07jn3osJe8IvoWmzCVBbphl62UPjw8v7RU2DvPf2SpbIygl74DHE0tflvjH1G_Gj6S9E1grdLsbbJnrPTTjlM3IsSOD09CFEdOcff-u1oPOAuZCyHeah1bokCXXlJaFVQHTWU/s3100/pets.png"
                alt="PAWsome Pets"
                className="min-w-[15rem] min-h-[14rem] w-[15rem] h-[14rem] sm:w-[20rem] sm:h-[18rem] md:hidden"
              />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-8 md:gap-6"
              >
                <TextInput
                  label="E-mail"
                  placeholder="name@example.com"
                  type="email"
                  {...register("email")}
                  error={errors.email?.message}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password here"
                  {...register("password")}
                  error={errors.password?.message}
                />
                <ToggleSwitchField
                  label="Keep me signed in"
                  name="rememberMe"
                  control={control}
                />
                {hasAttemptedLogin && loginError && (
                  <span className="text-red-500 text-sm text-center">
                    {loginError}
                  </span>
                )}
                <Button
                  text="Login"
                  type="submit"
                  className="mt-2 font-semibold text-base w-[20rem]"
                />
              </form>

              <div className="mt-4 text-center">
                <p className="text-base font-normal font-dosis text-text">
                  Aren't you PAWsome yet?{" "}
                </p>
                <NavLink
                  className="text-base font-medium hover:text-accent font-dosis"
                  to={"/signup"}
                >
                  Sign up here
                </NavLink>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full lg:w-[1000px] hidden md:block mb-4">
              <h1 className="text-primary font-bold text-5xl font-playpen text-accent">
                PAWsome Places
              </h1>
            </div>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd_cpvOb8ukzVtTrvl7-_f8s3z8lqGb5-RlfMwDud78ZSZJ59SxRLyHI07jn3osJe8IvoWmzCVBbphl62UPjw8v7RU2DvPf2SpbIygl74DHE0tflvjH1G_Gj6S9E1grdLsbbJnrPTTjlM3IsSOD09CFEdOcff-u1oPOAuZCyHeah1bokCXXlJaFVQHTWU/s3100/pets.png"
              alt="PAWsome Pets"
              className="max-h-[26.6rem] w-full hidden md:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
