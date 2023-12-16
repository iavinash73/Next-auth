"use client";
import { signIn } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

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



const GoogleButton = () => {
  const searchParams = useSearchParams()!;
  return (
    <p
      onClick={() => signIn("google")}
      className="border-[1px] border-black w-[300px] rounded-full flex items-center justify-center py-2 hover:cursor-pointer hover:bg-[#e7a6e7] hover:text-black duration-[300ms] mx-auto"
    >
      <FcGoogle
        size={20}
        
      />
      <span className={`${poppins500.className} ml-4`}> Continue with Google</span>
    </p>
  );
};

export default GoogleButton;
