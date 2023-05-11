// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
// ^ for session server side
//example how to get session server side
// export default async function Home() {
//   const session = await getServerSession(authOptions);
//   return (
//     <main>
//       <LoginButton />
//       <LogoutButton />
//       <h2>Server call</h2>
//       <pre>{JSON.stringify(session)}</pre>
//       <h2>Client call</h2>
//       <User />
//     </main>
//   );
// }

import Layout from "../../components/ui/layout/layout";

function MainPage() {
  return (
    <main>
      <h1>Main page</h1>
    </main>
  );
}

export default function WrapMainPage() {
  return (
    <Layout>
      <MainPage />
    </Layout>
  );
}
