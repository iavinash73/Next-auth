"use client";
import { Button } from "@/app/components/button/Button";
import eye from "@/public/auth/eye.png";
import eyec from "@/public/auth/eyec.png";
import { signIn, useSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const params = useSearchParams()!;
  const session = useSession();
  const router = useRouter();

  // useEffect(() => {
  // toast.error(params.get("error"));
  // }, [params]);

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { email, password } = formData;
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      // console.log(response);
      if (response?.error) {
        toast.error("Email or Password is invalid");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className={`text-[34px] ${poppins600.className} mb-3`}>
        Login with your email
      </div>
      <div className={`${poppins400.className}`}>
        <div className="relative z-0 w-[100%] mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="block py-2.5 px-0 w-full text-md text-black bg-transparent border-0 border-b-[1.5px] border-black appearance-none dark:text-black dark:border-black dark:focus:border-[#E589E5] focus:outline-none focus:ring-0 focus:border-[#E589E5] peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-[300ms] transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#8f589e] peer-focus:dark:text-[#8f589e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email address
          </label>
        </div>
        <div className="relative z-0 w-[100%] mb-5 group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[1.5px] border-black appearance-none dark:text-black dark:border-black dark:focus:border-[#E589E5] focus:outline-none focus:ring-0 focus:border-[#E589E5] peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-[300ms] transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#8f589e] peer-focus:dark:text-[#8f589e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
          <button
            type="button"
            className="absolute right-4 top-4 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Image height={20} width={20} alt="open_eye" src={eye}></Image>
            ) : (
              <Image height={20} width={20} alt="open_eye" src={eyec}></Image>
            )}
          </button>
        </div>
        <p className={`w-full text-[13px] ${poppins400.className}`}>
          <Link href="/register" className="hover:underline block">
            Don't have an account?
          </Link>
          <Link href="/forgot-password" className="hover:underline block mt-1">
            Forgot password
          </Link>
        </p>
        <div className="w-full items-center flex justify-center ">
          <Button
            type="submit"
            size={"default"}
            variant={"black"}
            className={`${poppins400.className} rounded-full w-[300px] mt-4 `}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
