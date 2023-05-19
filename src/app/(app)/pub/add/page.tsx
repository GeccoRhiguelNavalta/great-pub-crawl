import Layout from "../../../components/ui/layout/layout";
import { PubForm } from "./pubForm";
import Link from "next/link";

function Pub() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="flex flex-col justify-center items-center sm:shadow-xl pb-8 pt-12 sm:bg-white rounded-xl space-y-1">
        <PubForm />
        <Link href="/dashboard">
          <h1 className="text-red-500 hover:text-red-700 hover:underline">
            Back
          </h1>
        </Link>
      </div>
    </div>
  );
}

export default async function WrapReview() {
  return (
    <Layout>
      <Pub />
    </Layout>
  );
}
