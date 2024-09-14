import { supabase } from "@/lib/supabaseClient";

export default async function Page() {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) {
    return <div>Error: {error.message}</div>
  }

  // You can now use the user object directly in your component
  return (
    <div>
      <h1>User Info</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
    </div>
  );
}