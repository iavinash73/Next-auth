"use client";
import bg from "@/public/auth/bg.png";
import eye from "@/public/auth/eye.png";
import eyec from "@/public/auth/eyec.png";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { changePassword } from "../../actions/users/changePassword";
import { Button } from "../button/Button";

const poppins400 = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
const poppins500 = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});
const poppins600 = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface ChangePasswordFormProps {
  forgotPasswordToken: string;
}

const ChangePasswordForm = ({
  forgotPasswordToken,
}: ChangePasswordFormProps) => {
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const message = await changePassword(forgotPasswordToken, password);
    toast.success(message);
    router.push("/login");
  };

  return (
    <form className="" onSubmit={handleSubmit} autoComplete="off">
      <div className="relative h-screen w-screen items-center justify-center flex">
        <Image
          fill={true}
          alt="background image"
          src={bg}
          className="object-cover"
        ></Image>
        <div className="flex flex-col items-center justify-center p-10 backdrop-blur-sm bg-white bg-opacity-[0.15] rounded-xl ">
          <div className={`text-[34px] ${poppins600.className} px-10 mb-6`}>
            Change Password
          </div>
          <div className="relative z-0 w-[100%] mb-5 group">
            <input
              type={showPassword1 ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block py-2.5 px-0 w-full text-md text-black bg-transparent border-0 border-b-[1.5px] border-black appearance-none dark:text-black dark:border-black dark:focus:border-[#E589E5] focus:outline-none focus:ring-0 focus:border-[#E589E5] peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-[300ms] transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#8f589e] peer-focus:dark:text-[#8f589e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
            <button
              type="button"
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword1 ? (
                <Image height={20} width={20} alt="open_eye" src={eye}></Image>
              ) : (
                <Image height={20} width={20} alt="open_eye" src={eyec}></Image>
              )}
            </button>
          </div>
          <div className="relative z-0 w-[100%] mb-5 group">
            <input
              type={showPassword2 ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block py-2.5 px-0 w-full text-md text-black bg-transparent border-0 border-b-[1.5px] border-black appearance-none dark:text-black dark:border-black dark:focus:border-[#E589E5] focus:outline-none focus:ring-0 focus:border-[#E589E5] peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-[300ms] transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#8f589e] peer-focus:dark:text-[#8f589e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirm password
            </label>
            <button
              type="button"
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? (
                <Image height={20} width={20} alt="open_eye" src={eye}></Image>
              ) : (
                <Image height={20} width={20} alt="open_eye" src={eyec}></Image>
              )}
            </button>
          </div>
          <Button
            type="submit"
            size={"default"}
            variant={"black"}
            className={`${poppins400.className} px-6 py-3 mt-2`}
          >
            Change Password
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
