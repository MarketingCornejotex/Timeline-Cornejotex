import { NextResponse, type NextRequest } from 'next/server'

// Sitio completamente desactivado a pedido — bloquea catálogo público y admin
// por igual, sin excepciones. Para reactivar, revertir este archivo a la
// versión que llama a updateSession(request).
const MAINTENANCE_HTML = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Cornejotex · Licencias 2026</title>
<style>
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; background:#090C12; color:#fff; font-family:system-ui,-apple-system,sans-serif; text-align:center; padding:24px; box-sizing:border-box; }
  h1 { font-size:20px; margin:0 0 8px; font-weight:700; }
  p { font-size:14px; color:rgba(235,242,248,.64); margin:0; }
</style>
</head>
<body>
  <div>
    <h1>Sitio temporalmente no disponible</h1>
    <p>Volvé a intentarlo más tarde.</p>
  </div>
</body>
</html>`

export function proxy(_request: NextRequest) {
  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
