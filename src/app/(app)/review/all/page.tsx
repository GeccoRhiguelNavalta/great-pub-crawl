import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Layout from "../../../../../components/ui/layout/layout";
import { getServerSession } from "next-auth";

function AllReview({ userId }: { userId: string | undefined }) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <h1>All reviews Page</h1>
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
