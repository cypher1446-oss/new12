import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // Protected Admin Routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const adminSession = request.cookies.get('admin_session')?.value

        if (!adminSession) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // Optional: strict verification of the cookie value could go here
        // For now, presence of the cookie is enough as it's httpOnly
    }

    // Redirect to dashboard if already logged in
    if (request.nextUrl.pathname === '/login') {
        const adminSession = request.cookies.get('admin_session')?.value
        if (adminSession) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
