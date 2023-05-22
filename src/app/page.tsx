import MainPageList from "./(app)/main/pubs/mainPageList";
import Layout from "./components/ui/layout/layout";

function MainPage() {
  return (
    <main>
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
