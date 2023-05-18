import Layout from "../../components/ui/layout/layout";
import { Button } from "../../components/ui/button/button";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="flex flex-col justify-center items-center pb-8 pt-12 w-[150px] space-y-8">
        <div className="w-full">
          <Link href="/pub/add">
            <Button className="w-full" size="sm">
              Add New Pub
            </Button>
          </Link>
        </div>{" "}
        <div className="w-full">
          <Link href="/review/add">
            <Button className="w-full" size="sm">
              Add Review
            </Button>
          </Link>
        </div>{" "}
        <div className="w-full">
          <Link href="/review/all">
            <Button className="w-full" size="sm">
              View All Reviews
            </Button>
          </Link>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default async function WrapReview() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}
