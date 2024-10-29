import { NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "../components/input/TextInput";
import { Button } from "../components/shared/Button";
import { useAuthStore } from "../store/AuthStore";
import { SignUpFormFields, SignUpSchema } from "../schema/SignUp.schema";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, error: signUpError } = useAuthStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    await signUp(data);
    console.log("SignUp successful");
    navigate("/");
  };

  return (
    <div className="max-w-[1500px] min-h-screen flex flex-col items-center justify-center m-auto md:gap-8 md:p-4">
      <div className="w-full lg:w-[1000px]">
        <div className="mx-6 grid grid-cols-1 md:grid-cols-2 md:gap-12 items-center justify-center">
          <div>
            <div className="w-full lg:w-[1000px] hidden md:block mb-4">
              <h1 className="text-accent font-bold text-5xl font-playpen">PAWsome Places</h1>
            </div>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd_cpvOb8ukzVtTrvl7-_f8s3z8lqGb5-RlfMwDud78ZSZJ59SxRLyHI07jn3osJe8IvoWmzCVBbphl62UPjw8v7RU2DvPf2SpbIygl74DHE0tflvjH1G_Gj6S9E1grdLsbbJnrPTTjlM3IsSOD09CFEdOcff-u1oPOAuZCyHeah1bokCXXlJaFVQHTWU/s3100/pets.png"
              alt="Celebration illustration"
              className="max-h-[26.6rem] w-full hidden md:block"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-playpen font-bold text-3xl md:text-center text-left mb-4 text-title">Be Pawsome!</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 md:gap-4"
            >
              <TextInput
                label="Your PAWsome Name"
                placeholder="I'm..."
                type="text"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              <TextInput
                label="Your Lastname"
                placeholder="Your lastname here"
                type="text"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
              <TextInput
                label="E-mail"
                placeholder="name@example.com"
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />
              <TextInput
                label="Create your PAWsword"
                placeholder="Password here"
                {...register("password")}
                error={errors.password?.message}
              />
              <TextInput
                label="Can you repeat your PAWsword?"
                placeholder="Password here, again"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />
              {signUpError && <span className="text-red-500 text-sm text-center">{signUpError}</span>}
              <Button
                text="I'm PAWsome now"
                type="submit"
                className="mt-2 font-semibold text-base w-[20rem]"
              />
            </form>
            <div className="mt-2 text-center font-dosis">
              <NavLink
                className="text-base font-medium hover:text-accent"
                to={"/login"}
              >
                Go to login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
