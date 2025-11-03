import { type NextRequest, NextResponse } from 'next/server';

const allowedOrigins = ['https://127.0.0.1:5000/'];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, response: NextResponse) {
  const requestHeaders = new Headers(request.headers);
  const { pathname } = request.nextUrl;
  // const authSession = await auth();
  const session = request.cookies.get('session')?.value;
  requestHeaders.set('auth_token', `${session}`);

  // Check the origin from the request
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  const publicPaths = ['/', '/login', '/registration', '/forget_password.*', '/change_password.*', '/set_password.*'];
  const isPublicPath = publicPaths.some((path) => new RegExp(`^${path}$`).test(pathname));
  // Handle simple requests
  // 1. Get the current response (or create a new one for headers)
  const modified_response = NextResponse.next();
  // // if (session) {
  // // if (request.nextUrl.pathname === '/dashboard') {
  // //   return NextResponse.redirect(new URL('/dashboard/sales', request.url));
  // // }

  // 2. Set dynamic headers
  //   modified_response.headers.set('X-Request-ID', crypto.randomUUID()); // Example dynamic ID
  // 3. Set conditional headers (Example: based on a cookie)
  //   if (request.cookies.has('session')) {
  //     modified_response.headers.set('auth_token', `${session}`);
  //   } else {
  //     modified_response.headers.set('auth_token', 'null');
  //   }

  //   if (isAllowedOrigin) {
  //     modified_response.headers.set('Access-Control-Allow-Origin', origin);
  //   }

  //   Object.entries(corsOptions).forEach(([key, value]) => {
  //     modified_response.headers.set(key, value);
  //   });

  //   return modified_response;
  // } else {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  return modified_response;
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/(authenticated)/:path*',
    '/home/:path*',
    '/forget_password/:path*',
    '/change_password/:path*',
    '/set_password/:path*',
    '/public/:path*',
    '/dashboard/:path*',
    // "/set_password/:path*",
    // "/((?!_next/static|favicon.ico|api/auth|$).*)",
    // "/api/:path*",
    // {
    //   source: "/api/(authenticated)*",
    //   regexp: "^/api/(.*)",
    //   locale: false,
    //   has: [{ type: "header", key: "Authorization", value: "Bearer Token" }],
    //   missing: [{ type: "cookie", key: "session", value: "active" }],
    // },
  ],
};
