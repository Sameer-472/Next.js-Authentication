import NextAuth from "next-auth";
// import { auth } from "./auth"
import authConfig from "./auth.config";
import { defaultLoginRedirect, authRoutes, publicRoutes, apiAuthPrefix } from "./routes";



const { auth } = NextAuth(authConfig)


export default auth((req) => {

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoutes) {
    return null
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(defaultLoginRedirect, nextUrl))
    }
    return null
  }

  if(!isLoggedIn && !isPublicRoutes){
    return Response.redirect(new URL("/auth/login" , nextUrl))
  }

  return null

  // req.auth
})


// its means when ever this route entered the above functions will invoke
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}