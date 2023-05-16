import Layout from "../../../../../components/ui/layout/layout";
import { PubForm } from "./pubForm";

function Pub() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="flex flex-col justify-center items-center sm:shadow-xl pb-8 pt-12 sm:bg-white rounded-xl space-y-8">
        <PubForm />
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
