import ChangePasswordForm from "@/app/components/password/ChangePasswordForm";
import ResetPasswordForm from "@/app/components/password/ResetPasswordForm";
import User from "@/app/models/User";
import bg from "@/public/auth/bg.png";
import { Poppins } from "next/font/google";
import Image from "next/image";
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

interface ResetPasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  if (searchParams.token) {
    const user = await User.findOne({
      forgotPasswordToken: searchParams.token as string,
    });
    if (!user) {
      return (
        <div className="relative h-screen w-screen items-center justify-center flex">
          <Image
            fill={true}
            alt="background image"
            src={bg}
            className="object-cover"
          ></Image>
          <div
            className={`${poppins500.className} flex flex-col items-center justify-center p-10 backdrop-blur-sm bg-white bg-opacity-[0.15] rounded-xl`}
          >
            Invalid Token
          </div>
        </div>
      );
    }
    return (
      <ChangePasswordForm forgotPasswordToken={searchParams.token as string} />
    );
  } else {
    return <ResetPasswordForm />;
  }
};

export default ResetPasswordPage;
