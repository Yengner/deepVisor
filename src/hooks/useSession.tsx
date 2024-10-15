// "use client";
// import { createContext, useContext } from "react";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   image: string | null;
// }

// interface Session {
//   user: User;
// }

// const SessionContext = createContext<Session>({} as Session);

// const useSession = () => useContext(SessionContext);

// const SessionProvider = ({
//   children,
//   session,
// }: {
//   children: React.ReactNode;
//   session: Session;
// }) => {
//   return (
//     <SessionContext.Provider value={session}>
//       {children}
//     </SessionContext.Provider>
//   );
// };

// export { SessionProvider, useSession };
