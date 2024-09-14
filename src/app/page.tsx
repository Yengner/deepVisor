// app/page.tsx (or any other path in the /app directory)
import prisma from '../../utils/db'; // Make sure this path is correct

export default async function Page() {
  // Fetch data directly in the Server Component
  const user = await prisma.user.findFirst({
    where: {
      email: "test@test.com",
    },
  });

  // You can now use the user object directly in your component
  return (
    <div>
      <h1>User Info</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
}
