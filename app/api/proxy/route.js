// GET /api/proxy?url=<twimg video url>
// Streams the video back through our own origin so:
// 1. The browser's `download` attribute actually triggers a download
//    instead of navigating away (cross-origin downloads are unreliable)
// 2. The Web Share API can fetch it as a blob without hitting CORS

const ALLOWED_HOSTS = ["video.twimg.com", "pbs.twimg.com"];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return Response.json({ error: "Missing url param" }, { status: 400 });
  }

  let parsed;
  try {
    parsed = new URL(targetUrl);
  } catch {
    return Response.json({ error: "Invalid url" }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    return Response.json({ error: "URL host not allowed" }, { status: 403 });
  }

  const upstream = await fetch(targetUrl);
  if (!upstream.ok || !upstream.body) {
    return Response.json({ error: "Failed to fetch media" }, { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "video/mp4",
      "Content-Disposition": 'attachment; filename="clip.mp4"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
