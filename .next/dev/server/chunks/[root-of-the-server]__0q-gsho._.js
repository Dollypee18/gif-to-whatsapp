module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Desktop/gif-to-whatsapp/app/api/proxy/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
// GET /api/proxy?url=<twimg video url>
// Streams the video back through our own origin so:
// 1. The browser's `download` attribute actually triggers a download
//    instead of navigating away (cross-origin downloads are unreliable)
// 2. The Web Share API can fetch it as a blob without hitting CORS
const ALLOWED_HOSTS = [
    "video.twimg.com",
    "pbs.twimg.com"
];
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get("url");
    if (!targetUrl) {
        return Response.json({
            error: "Missing url param"
        }, {
            status: 400
        });
    }
    let parsed;
    try {
        parsed = new URL(targetUrl);
    } catch  {
        return Response.json({
            error: "Invalid url"
        }, {
            status: 400
        });
    }
    if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
        return Response.json({
            error: "URL host not allowed"
        }, {
            status: 403
        });
    }
    const upstream = await fetch(targetUrl);
    if (!upstream.ok || !upstream.body) {
        return Response.json({
            error: "Failed to fetch media"
        }, {
            status: 502
        });
    }
    return new Response(upstream.body, {
        headers: {
            "Content-Type": upstream.headers.get("content-type") || "video/mp4",
            "Content-Disposition": 'attachment; filename="clip.mp4"',
            "Cache-Control": "public, max-age=3600"
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0q-gsho._.js.map