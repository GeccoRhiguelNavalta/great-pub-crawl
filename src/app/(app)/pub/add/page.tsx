import Layout from "../../../../../components/ui/layout/layout";

function Pub() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <h1>Add pub page</h1>
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
