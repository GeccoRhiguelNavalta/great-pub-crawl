import MainPageList from "./(app)/main/pubs/mainPageList";
import Layout from "./components/ui/layout/layout";

function MainPage() {
  return (
    <div className="h-[580px] md:h-[600px] lg:h-[750px] w-full flex flex-col p-3 justify-center overflow-y-scroll space-y-6 items-center bg-slate-100">
      <h1 className="font-bold">Pub Ratings</h1>
      <MainPageList />
    </div>
  );
}

export default async function WrapMainPage() {
  return (
    <Layout>
      <MainPage />
    </Layout>
  );
}
