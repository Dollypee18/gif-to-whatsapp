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
"[project]/Desktop/gif-to-whatsapp/app/api/extract/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
// POST /api/extract
// Body: { url: "https://x.com/someuser/status/1234567890" }
// Returns: { mp4Url, posterUrl, tweetText } or { error }
function extractTweetId(rawUrl) {
    try {
        const url = new URL(rawUrl.trim());
        const validHosts = [
            "x.com",
            "twitter.com",
            "www.x.com",
            "www.twitter.com",
            "mobile.twitter.com"
        ];
        if (!validHosts.includes(url.hostname)) return null;
        // Path looks like /username/status/1234567890
        const match = url.pathname.match(/\/status\/(\d+)/);
        return match ? match[1] : null;
    } catch  {
        return null;
    }
}
async function fetchFromSyndication(tweetId) {
    // The syndication endpoint is what X's own embedded-tweet widgets use.
    // It's undocumented and can change or rate-limit without notice — this is
    // the fragile part of the whole project, flagged as such in the README.
    const endpoint = `https://cdn.syndication.twimg.com/tweet-result?id=${tweetId}&token=1`;
    const res = await fetch(endpoint, {
        headers: {
            "User-Agent": "Mozilla/5.0 (compatible; GifToWhatsAppBot/0.1)"
        }
    });
    if (!res.ok) {
        throw new Error(`Syndication endpoint returned ${res.status}`);
    }
    return res.json();
}
function pickBestMp4(tweetData) {
    // Shape (as of last known structure): tweetData.mediaDetails[] items with
    // type "video" or "animated_gif", each with video_info.variants[]
    const mediaDetails = tweetData?.mediaDetails || tweetData?.extended_entities?.media || [];
    for (const media of mediaDetails){
        if (media.type !== "video" && media.type !== "animated_gif") continue;
        const variants = media.video_info?.variants || [];
        const mp4Variants = variants.filter((v)=>v.content_type === "video/mp4");
        if (mp4Variants.length === 0) continue;
        // Highest bitrate = best quality
        mp4Variants.sort((a, b)=>(b.bitrate || 0) - (a.bitrate || 0));
        return {
            mp4Url: mp4Variants[0].url,
            posterUrl: media.media_url_https,
            isGif: media.type === "animated_gif"
        };
    }
    return null;
}
async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch  {
        return Response.json({
            error: "Invalid request body"
        }, {
            status: 400
        });
    }
    const tweetId = extractTweetId(body.url || "");
    if (!tweetId) {
        return Response.json({
            error: "Couldn't find a tweet ID in that URL. Make sure it looks like https://x.com/user/status/123..."
        }, {
            status: 400
        });
    }
    let tweetData;
    try {
        tweetData = await fetchFromSyndication(tweetId);
    } catch (err) {
        return Response.json({
            error: "Couldn't reach X's media endpoint. This can mean the tweet is private/deleted, or X has changed/rate-limited the endpoint this relies on.",
            detail: String(err.message || err)
        }, {
            status: 502
        });
    }
    const media = pickBestMp4(tweetData);
    if (!media) {
        return Response.json({
            error: "That tweet doesn't seem to contain a GIF or video."
        }, {
            status: 404
        });
    }
    return Response.json({
        mp4Url: media.mp4Url,
        posterUrl: media.posterUrl,
        isGif: media.isGif,
        tweetText: tweetData?.text || ""
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1ojr1ck._.js.map