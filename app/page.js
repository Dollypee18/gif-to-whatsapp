"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleConvert(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const [shareState, setShareState] = useState("idle"); // idle | sharing | unsupported

  const proxiedUrl = result
    ? `/api/proxy?url=${encodeURIComponent(result.mp4Url)}`
    : null;

  async function handleShare() {
    if (!result) return;
    setShareState("sharing");

    try {
      const res = await fetch(proxiedUrl);
      const blob = await res.blob();
      const file = new File([blob], "clip.mp4", { type: "video/mp4" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Shared clip" });
        setShareState("idle");
        return;
      }
    } catch {
      // fall through to the fallback below (user may have also cancelled the share sheet)
    }

    // No Web Share API support (most desktop browsers) — fall back to
    // opening WhatsApp Web with a prompt, since we can't attach a file this way.
    setShareState("unsupported");
    window.open("https://web.whatsapp.com", "_blank", "noopener,noreferrer");
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1 style={styles.h1}>Tweet GIF → WhatsApp</h1>
        <p style={styles.sub}>Paste a tweet link that has a GIF or video.</p>

        <form onSubmit={handleConvert} style={styles.form}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://x.com/username/status/1234567890"
            style={styles.input}
            required
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Converting..." : "Convert"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        {result && (
          <div style={styles.result}>
            <video
              src={result.mp4Url}
              poster={result.posterUrl}
              controls
              style={styles.video}
            />
            <div style={styles.actions}>
              <a
                href={proxiedUrl}
                download="clip.mp4"
                style={styles.linkButton}
              >
                Download MP4
              </a>
              <button
                onClick={handleShare}
                disabled={shareState === "sharing"}
                style={styles.linkButtonSecondary}
              >
                {shareState === "sharing" ? "Preparing..." : "Send to WhatsApp"}
              </button>
            </div>
            {shareState === "unsupported" && (
              <p style={styles.hint}>
                Your browser can't attach files to WhatsApp directly — opened
                WhatsApp Web for you instead. Download the MP4 above and attach
                it manually. On a phone, this button uses the native share sheet
                and attaches it for you automatically.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f1115",
    fontFamily: "system-ui, sans-serif",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    background: "#181b21",
    borderRadius: "12px",
    padding: "32px",
    color: "#f2f2f2",
  },
  h1: { fontSize: "22px", marginBottom: "4px" },
  sub: { color: "#9a9fa8", fontSize: "14px", marginBottom: "20px" },
  form: { display: "flex", gap: "8px" },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #2a2e37",
    background: "#0f1115",
    color: "#f2f2f2",
    fontSize: "14px",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#25d366",
    color: "#0f1115",
    fontWeight: 600,
    cursor: "pointer",
  },
  error: { color: "#ff6b6b", marginTop: "14px", fontSize: "14px" },
  hint: {
    color: "#9a9fa8",
    fontSize: "13px",
    marginTop: "10px",
    lineHeight: 1.4,
  },
  result: { marginTop: "20px" },
  video: { width: "100%", borderRadius: "8px" },
  actions: { display: "flex", gap: "8px", marginTop: "12px" },
  linkButton: {
    flex: 1,
    textAlign: "center",
    padding: "10px",
    borderRadius: "8px",
    background: "#2a2e37",
    color: "#f2f2f2",
    textDecoration: "none",
    fontSize: "14px",
  },
  linkButtonSecondary: {
    flex: 1,
    textAlign: "center",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#25d366",
    color: "#0f1115",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
