import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Layout from "../../../components/ui/layout/layout";
import { getServerSession } from "next-auth";
import List from "./list";
import Link from "next/link";

function AllReview({ userId }: { userId: string }) {
  return (
    <div className="h-[550px] w-screen flex flex-col p-3 justify-center overflow-y-scroll space-y-6 items-center bg-slate-100">
      <h1 className="font-bold">Your Reviews</h1>
      <Link href="/dashboard">
        <h1 className="text-red-500 hover:text-red-700 hover:underline">
          Back
        </h1>
      </Link>
      <List userId={userId} />
    </div>
  );
}

export default async function WrapAllReview() {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user.id;
  return (
    <Layout>
      <AllReview userId={userId} />
    </Layout>
  );
}
