import SendEmail from "@/app/components/SendEmail";
import User from "@/app/models/User";
import { authOptions } from "@/app/utils/auth";
import bg from "@/public/auth/bg.png";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { redirect } from "next/navigation";

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

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/register/?callbackUrl=/verify-email");
  }
  let user = await User.findOne({
    email: session.user?.email,
  });

  if (user.emailVerified) {
    redirect("/questions");
  }
  if (searchParams.token) {
    const user = await User.findOne({
      emailVerificationToken: searchParams.token as string,
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

    await User.findOneAndUpdate(
      { emailVerificationToken: searchParams.token as string },
      { emailVerified: true, emailVerificationToken: null }
    );

    redirect("/questions");
  } else {
    return (
      <div className="relative h-screen w-screen items-center justify-center flex">
        <Image
          fill={true}
          alt="background image"
          src={bg}
          className="object-cover"
        ></Image>
        <div className="flex flex-col items-center justify-center p-10 backdrop-blur-sm bg-white bg-opacity-[0.15] rounded-xl">
          <div className={`${poppins600.className} text-[32px]`}>
            Email Verification
          </div>
          <div className={`${poppins400.className} my-4`}>
            Click the button below to verify your email.{" "}
            <span className={`${poppins500.className}`}>
              ({session.user?.email})
            </span>
          </div>
          <SendEmail />
        </div>
      </div>
    );
  }
};

export default VerifyEmailPage;
