import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest Area",
  description: "The guest area of the wild oasis resort",
};

async function page() {
  const session = await auth();
  const firstName = session.user.name.split(" ").at(0);
  return (
    <div>
      <h1>Welcome, {firstName}</h1>
    </div>
  );
}

export default page;
