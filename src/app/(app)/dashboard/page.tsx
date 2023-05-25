import Layout from "../../components/ui/layout/layout";
import { Button } from "../../components/ui/button/button";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="h-[580px] md:h-[600px] lg:h-[750px] w-full flex flex-col p-3 justify-center overflow-y-scroll space-y-6 items-center bg-slate-100">
      <div className="flex flex-col justify-center items-center pb-8 pt-10 w-[150px] space-y-8">
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
