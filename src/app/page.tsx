import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";

//example how to get session server side
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <div>Hello World</div>
      <h2>Server call</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client call</h2>
      <User />
    </main>
  );
}
