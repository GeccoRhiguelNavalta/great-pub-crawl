import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Layout from "../../../../components/ui/layout/layout";
import { ReviewForm } from "./reviewForm";
import { getServerSession } from "next-auth";

function Review({ userId }: { userId: string | undefined }) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="flex flex-col justify-center items-center sm:shadow-xl pb-8 pt-12 sm:bg-white rounded-xl space-y-8">
        <h1 className="font-semibold text-2xl">Add Your Review</h1>
        <ReviewForm userId={userId} />
      </div>
    </div>
  );
}

export default async function WrapReview() {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user.id;
  return (
    <Layout>
      <Review userId={userId} />
    </Layout>
  );
}
