import User from "@/app/models/User";
import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login/?callbackUrl=/question");
  } 
  let user = await User.findOne({
    email: session.user?.email,
  });

  if (user.details) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col item-center justify-center h-screen w-screen ">
      {session?.user?.email}
    </div>
  );
};

export default page;
