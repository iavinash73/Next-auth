import { Metadata } from "next";

import bg from "@/public/auth/bg.png";
import { Outfit } from "next/font/google";
import Image from "next/image";
import GoogleButton from "../../components/button/GoogleButton";
import Form from "../../components/register/Form";

const outfit500 = Outfit({
  subsets: ["latin"],
  weight: ["500"],
});
const outfit600 = Outfit({
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: " Register",
};

const Register = () => {
  return (
    <div className="relative h-screen w-screen items-center justify-center flex">
      <Image
        fill={true}
        alt="background image"
        src={bg}
        className="object-cover"
      ></Image>
      <div className="p-10 backdrop-blur-sm bg-white bg-opacity-[0.15] rounded-xl flex items-center justify-center flex-col">
        <Form />
        <div className="flex items-center w-[50%] mx-auto mb-6 mt-4">
          <hr className="flex-grow border-t border-gray-700" />
          <span className={`mx-3 text-gray-900 ${outfit500.className}`}>
            OR
          </span>
          <hr className="flex-grow border-t border-gray-700" />
        </div>
        <GoogleButton />
      </div>
    </div>
  );
};

export default Register;
