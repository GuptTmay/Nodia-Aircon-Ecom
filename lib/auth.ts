import CredentialsProvider from "next-auth/providers/credentials";

//NextAuth handles login, session, JWT, cookies, and SSR integration.
// User registration (creating new accounts in DB) is your responsibility.


export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Pass@123",
        },
      },

      // Validate User and return user object
      // Call prisma to validate the user. 
      async authorize(credentials: any) {
        console.log(credentials);
        // validation
        /*
        const email = credentials.email;
        const password = credentials.password;
        
        const user = prisma.user.findOne({
          where: {
            email: email,
            password: password
            }
            });
            
            if (user) return;
            return {
              id: user.id,
              email: user.email 
              };
              */
        return {
          id: "User id",
          email: "myemail",
          password: "123",
          name: "Tanmay",
          morething: "Something important",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    
    // At login adds important things to the jwt.   
    jwt: ({ token, user }: any) => {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
  
    // controls what goes out though, useSession & useServerSession
    session: ({ session, token, user }: any) => {
      if (session && session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin"
  }
};