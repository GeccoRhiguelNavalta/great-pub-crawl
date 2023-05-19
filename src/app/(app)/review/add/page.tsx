import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Layout from "../../../components/ui/layout/layout";
import { AddReviewForm } from "./reviewForm";
import { getServerSession } from "next-auth";
import Link from "next/link";

function AddReview({ userId }: { userId: string | undefined }) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="flex flex-col justify-center items-center sm:shadow-xl pb-8 pt-12 sm:bg-white rounded-xl ">
        <AddReviewForm userId={userId} />
        <Link href="/dashboard">
          <h1 className="pb-10 text-red-500 hover:text-red-700 hover:underline">
            Back
          </h1>
        </Link>
      </div>
    </div>
  );
}

export default async function WrapAddReview() {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user.id;
  return (
    <Layout>
      <AddReview userId={userId} />
    </Layout>
  );
}
