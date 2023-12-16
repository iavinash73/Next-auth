"use client";
import { signOut, useSession } from "next-auth/react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button/Button";

const outfit400 = Outfit({
  subsets: ["latin"],
  weight: ["400"],
});
const outfit600 = Outfit({
  subsets: ["latin"],
  weight: ["600"],
});

const DesktopNav = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className={`w-full fixed z-30 ${outfit400.className}`}>
      <div className=" h-[60px] flex flex-row items-center bg-white bg-opacity-[0.20] backdrop-blur-md drop-shadow-2xl  justify-end gap-5 pr-10">
        <Button
          onClick={() => {
            signOut({
              callbackUrl: "/login",
              redirect: true,
            });
          }}
          size="default"
          variant={`${pathname === "/" ? "active" : "default"}`}
        >
          sign out
        </Button>
        <Link href="/login">
          <Button
            size="default"
            variant={`${pathname === "/login" ? "active" : "default"}`}
          >
            Log in
          </Button>
        </Link>
        <Link href={"/register"}>
          <Button
            size={"default"}
            variant={`${pathname === "/register" ? "active" : "default"}`}
          >
            Sign up
          </Button>
        </Link>
      </div>
      {/* <hr className="border-t border-black"/>  */}
    </div>
    //   className={`hidden mx-auto max-w-5xl px-6 lg:flex justify-between items-center py-6`}
    // >
    //   <div className="flex items-center">
    //     <h1 className="text-3xl font-semibold">
    //       <Link href="/">Auth Demo</Link>
    //     </h1>
    //   </div>
    //   <div className="flex items-center cursor-pointer">
    //     {session ? (
    //       <>
    //         <p className="my-4 text-black  ">
    //           Signed in as {session.user?.email}
    //         </p>
    //         <p className="my-4 text-black mx-10">
    //           <Link href={"forgot-password"}> password</Link>
    //         </p>
    //         <p
    //           onClick={() => signOut()}
    //           className="bg-green-700 ml-6 my-4 rounded-md p-2 px-4 mx-2 text-white"
    //         >
    //           <BsPersonFill /> Logout
    //         </p>
    //       </>
    //     ) : (
    //       <>
    //         {" "}
    //         <p className="border-[1px] mx-4 min-w-[168px] w-full text-center py-[10px] px-8 text-sm font-medium  border-solid rounded-[24px] border-green-700">
    //           <Link href="/login">Log in</Link>
    //         </p>
    //         <p className="rounded-[24px] hover:bg-white hover:border-2 hover:text-green-700 hover:border-green-700 text-white font-medium text-sm shadow-button py-[10px] mx-4 min-w-[168px] w-full text-center bg-green-700 ">
    //           <Link href="/register">Register</Link>
    //         </p>
    //       </>
    //     )}
    //   </div>
    // </nav>
  );
};

export default DesktopNav;
