"use client";
import { FC, useEffect, useState } from "react";
import { Button } from "./button/Button";
import { verifyEmail } from "../actions/emails/verifyEmail";
import { useSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { toast } from "sonner";
import { stringify } from "querystring";
import { redirect } from "next/navigation";

const poppins400 = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
const poppins500 = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

interface SendEmailProps {
  // emailVerified: Boolean;
}

const SendEmail: FC<SendEmailProps> = ({}) => {
  const { data: session } = useSession();
  const [msg, setMsg] = useState("");
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
  if (session) {
    const verify = () => {
      if (session.user?.email) {
        const msg = verifyEmail(session.user.email);
        setMsg(`Mail sent to ${session.user.email}`);
        toast.info("Check your Email Inbox");
        setIsButtonDisabled(true);
      }
    };
    return (
      <div className="flex flex-col justify-center items-center">
        <Button
          onClick={() => {
            verify();
          }}
          size={"default"}
          variant={"black"}
          className={`${poppins400.className} px-6 py-3`}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? `Resend in ${countdown}s` : "Send mail to verify"}
        </Button>
        <div className={`${poppins500.className} mt-4 text-[15px]`}>{msg}</div>
      </div>
    );
  }
};

export default SendEmail;
