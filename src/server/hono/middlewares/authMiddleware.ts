// import { auth } from "@/server/auth";
// import { Context } from "hono";
// import { Next } from "hono/types";

// const authMiddleware = async (context: Context, next: Next) => {
//   const session = await auth();

//   if (!session || !session?.user) {
//     return context.json({
//       message: 'Unauthorized'
//     }, 401);
//   }

//   context.set('user', session.user);
//   await next();
// }

// export default authMiddleware;