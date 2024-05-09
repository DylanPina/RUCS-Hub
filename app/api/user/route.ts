import { createUser, getUserByAuth0Id } from "@/lib/data/user";

export async function POST(request: Request) {
  const formData = await request.formData();
  const userId = formData.get("userId");

  const authUser = await getUserByAuth0Id(userId as string);
  if (!authUser) {
    return new Response("User not found", { status: 404 });
  }

  const user = await createUser(authUser.email);
  if (!user) {
    return new Response("User cannot be created", { status: 500 });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}
