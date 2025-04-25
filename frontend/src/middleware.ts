import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/signup'];

export default async function middleware(req: NextRequest) { // Ajout de async
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // Récupérer le token dans les cookies (attendre la résolution de la Promise)
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // Rediriger vers /login si l'utilisateur n'est pas authentifié
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    
    // Rediriger vers /dashboard si l'utilisateur est déjà authentifié
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    return NextResponse.next();
}

// Appliquer le middleware uniquement aux pages sécurisées
export const config = {
    matcher: ['/login', '/signup', '/dashboard/:path*'],
};
