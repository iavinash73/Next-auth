import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login/?callbackUrl=/dashboard");
  }
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h2>
        {session !== null && (
          <p className="text-4xl font-semibold">Hi {session?.user?.name}!</p>
        )}
      </h2>
    </main>
  );
}
