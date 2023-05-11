import Layout from "../../../../components/ui/layout/layout";

function Review() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      Protected page
    </div>
  );
}

export default function WrapReview() {
  return (
    <Layout>
      <Review />
    </Layout>
  );
}
