// GET /api/gif?url=<twimg mp4 url>
// Fetches the MP4, converts it to a real animated GIF file using ffmpeg,
// and streams the GIF back. This is what makes WhatsApp treat it as an
// actual GIF (auto-loop, no player controls, no sound) instead of a video.

import { spawn } from "child_process";
import { writeFile, readFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import path from "path";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";

const ALLOWED_HOSTS = ["video.twimg.com"];

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath.path, args);
    let stderr = "";
    proc.stderr.on("data", (d) => {
      stderr += d.toString();
    });
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited ${code}: ${stderr.slice(-500)}`));
    });
    proc.on("error", reject);
  });
}

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

  const id = Math.random().toString(36).slice(2);
  const inputPath = path.join(tmpdir(), `${id}-in.mp4`);
  const outputPath = path.join(tmpdir(), `${id}-out.gif`);

  try {
    const upstream = await fetch(targetUrl);
    if (!upstream.ok) {
      return Response.json(
        { error: "Failed to fetch source video" },
        { status: 502 },
      );
    }
    const buffer = Buffer.from(await upstream.arrayBuffer());
    await writeFile(inputPath, buffer);

    // Palette-based conversion: much better quality/size than a naive
    // direct-to-gif conversion. Capped at 480px wide and 15fps to keep
    // file size reasonable for WhatsApp (which limits GIF/media size).
    await runFfmpeg([
      "-i",
      inputPath,
      "-vf",
      "fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",
      "-y",
      outputPath,
    ]);

    const gifBuffer = await readFile(outputPath);

    return new Response(gifBuffer, {
      headers: {
        "Content-Type": "image/gif",
        "Content-Disposition": 'attachment; filename="clip.gif"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return Response.json(
      { error: "GIF conversion failed", detail: String(err.message || err) },
      { status: 500 },
    );
  } finally {
    // Best-effort cleanup — ignore errors if files were never created
    unlink(inputPath).catch(() => {});
    unlink(outputPath).catch(() => {});
  }
}
