import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin routes
    if (pathname.startsWith("/admin")) {
      if (!token || token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // Protected grow routes
    if (pathname.startsWith("/grow") && pathname !== "/grow") {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // Contributor routes (strain creation)
    if (pathname.startsWith("/strains/create") || pathname.startsWith("/strains/edit")) {
      if (!token || !["ADMIN", "CONTRIBUTOR"].includes(token.role)) {
        return NextResponse.redirect(new URL("/strains", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Public routes that don't need authentication
        const publicRoutes = [
          "/",
          "/strains",
          "/strains/[id]",
          "/legal",
          "/about",
          "/login",
          "/register",
          "/api/auth",
          "/api/health",
          "/api/strains",
          "/api/strains/[id]",
          "/_next",
          "/favicon.ico"
        ];

        // Check if current path is public
        const isPublicRoute = publicRoutes.some(route => {
          if (route.includes("[id]")) {
            return pathname.match(/^\/strains\/[^\/]+$/);
          }
          return pathname === route || pathname.startsWith(route);
        });

        if (isPublicRoute) {
          return true;
        }

        // For protected routes, require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/grow/:path*",
    "/strains/create",
    "/strains/edit/:path*",
    "/profile/:path*"
  ]
};
