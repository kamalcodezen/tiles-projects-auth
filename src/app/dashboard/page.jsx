import { auth } from "@/lib/auth";
import { setErrorMap } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  console.log(session, "dashboard");

  const user = session?.user;
  if (!user) {
    redirect("/signin");
    return;
  }

  return (
    <div>
      <h2>This is Dashboard</h2>
    </div>
  );
};

export default Dashboard;
