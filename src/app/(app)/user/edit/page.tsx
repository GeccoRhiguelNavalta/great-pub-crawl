import Layout from "../../../../../components/ui/layout/layout";

function EditUser() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <h1>Edit User Page</h1>
    </div>
  );
}

export default async function WrapEditUser() {
  return (
    <Layout>
      <EditUser />
    </Layout>
  );
}
