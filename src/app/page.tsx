// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
// ^ for session server side
import { User } from "./user";
import { LoginButton, LogoutButton } from "./auth";

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

export default function Home() {
  return (
    <main>
      <LoginButton />
      <LogoutButton />
      <User />
    </main>
  );
}
