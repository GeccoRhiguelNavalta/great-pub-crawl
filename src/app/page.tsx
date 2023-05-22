import MainPageList from "./(app)/main/pubs/mainPageList";
import Layout from "./components/ui/layout/layout";

function MainPage() {
  return (
    <main className="h-[550px] w-screen flex flex-col p-3 justify-center overflow-y-scroll space-y-6 items-center bg-slate-100">
      <h1 className="font-bold">Pub Ratings</h1>
      <MainPageList />
    </main>
  );
}

export default async function WrapMainPage() {
  return (
    <Layout>
      <MainPage />
    </Layout>
  );
}
