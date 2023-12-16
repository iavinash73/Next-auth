"use client";
import bg from "@/public/auth/bg.png";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { resetPassword } from "../../actions/users/resetPassword";
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
const ResetPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(40);
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (isButtonDisabled) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        setIsButtonDisabled(false);
        setCountdown(40);
        clearInterval(countdownInterval);
      }, 40000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isButtonDisabled]);
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const message = await resetPassword(email);
    setMessage(message);
    toast.info("Check your Email Inbox");
    setIsButtonDisabled(true);
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
          <div className={`text-[34px] ${poppins600.className} px-24 mb-6`}>
            Reset Password
          </div>
          <div className="relative z-0 w-[100%] mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2.5 px-0 w-full text-md text-black bg-transparent border-0 border-b-[1.5px] border-black appearance-none dark:text-black dark:border-black dark:focus:border-[#E589E5] focus:outline-none focus:ring-0 focus:border-[#E589E5] peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-[300ms] transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#8f589e] peer-focus:dark:text-[#8f589e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email
            </label>
          </div>
          <Button
            type="submit"
            size={"default"}
            variant={"black"}
            className={`${poppins400.className} px-6 py-3 mt-2`}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled
              ? `Resend in ${countdown}s`
              : "Send mail to verify"}
          </Button>
          <div className={`${poppins500.className} mt-4 text-[15px]`}>
            {message}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
