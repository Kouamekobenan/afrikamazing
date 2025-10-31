import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("🔥🔥🔥 MIDDLEWARE APPELÉ 🔥🔥🔥");
  console.log("URL:", request.nextUrl.pathname);

  const pathname = request.nextUrl.pathname;

  // Si c'est la racine, rediriger vers /fr
  if (pathname === "/") {
    console.log("➡️ Redirection vers /fr");
    return NextResponse.redirect(new URL("/fr", request.url));
  }

  // Si commence par /fr, /en, /ar, laisser passer
  if (
    pathname.startsWith("/fr") ||
    pathname.startsWith("/en") ||
    pathname.startsWith("/ar")
  ) {
    console.log("✅ Locale détectée, continue");
    return NextResponse.next();
  }

  // Sinon ajouter /fr devant
  console.log("➡️ Ajout de /fr devant", pathname);
  return NextResponse.redirect(new URL("/fr" + pathname, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
