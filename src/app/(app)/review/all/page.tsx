import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Layout from "../../../components/ui/layout/layout";
import { getServerSession } from "next-auth";
import List from "./list";

function AllReview({ userId }: { userId: string }) {
  return (
    <div className="h-screen w-screen flex flex-col p-5 overflow-y-scroll justify-center items-center bg-slate-100">
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
