export const authConfig = {
  secret: "Top@Secret",
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboardPage = nextUrl.pathname.startsWith("/d");
      if (isOnDashboardPage) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
  },
  providers: [],
};