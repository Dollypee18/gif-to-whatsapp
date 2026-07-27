module.exports = [
"[project]/Desktop/gif-to-whatsapp/app/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/gif-to-whatsapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/gif-to-whatsapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function Home() {
    const [url, setUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    async function handleConvert(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);
        try {
            const res = await fetch("/api/extract", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url
                })
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Something went wrong.");
            } else {
                setResult(data);
            }
        } catch  {
            setError("Network error — check your connection and try again.");
        } finally{
            setLoading(false);
        }
    }
    const [shareState, setShareState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle"); // idle | sharing | unsupported
    const proxiedUrl = result ? `/api/proxy?url=${encodeURIComponent(result.mp4Url)}` : null;
    async function handleShare() {
        if (!result) return;
        setShareState("sharing");
        try {
            const res = await fetch(proxiedUrl);
            const blob = await res.blob();
            const file = new File([
                blob
            ], "clip.mp4", {
                type: "video/mp4"
            });
            if (navigator.canShare && navigator.canShare({
                files: [
                    file
                ]
            })) {
                await navigator.share({
                    files: [
                        file
                    ],
                    title: "Shared clip"
                });
                setShareState("idle");
                return;
            }
        } catch  {
        // fall through to the fallback below (user may have also cancelled the share sheet)
        }
        // No Web Share API support (most desktop browsers) — fall back to
        // opening WhatsApp Web with a prompt, since we can't attach a file this way.
        setShareState("unsupported");
        window.open("https://web.whatsapp.com", "_blank", "noopener,noreferrer");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: styles.main,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: styles.card,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    style: styles.h1,
                    children: "Tweet GIF → WhatsApp"
                }, void 0, false, {
                    fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: styles.sub,
                    children: "Paste a tweet link that has a GIF or video."
                }, void 0, false, {
                    fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleConvert,
                    style: styles.form,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: url,
                            onChange: (e)=>setUrl(e.target.value),
                            placeholder: "https://x.com/username/status/1234567890",
                            style: styles.input,
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            style: styles.button,
                            children: loading ? "Converting..." : "Convert"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: styles.error,
                    children: error
                }, void 0, false, {
                    fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
                    lineNumber: 87,
                    columnNumber: 19
                }, this),
                result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.result,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                            src: result.mp4Url,
                            poster: result.posterUrl,
                            controls: true,
                            style: styles.video
                        }, void 0, false, {
                            fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.actions,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: proxiedUrl,
                                    download: "clip.mp4",
                                    style: styles.linkButton,
                                    children: "Download MP4"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleShare,
                                    disabled: shareState === "sharing",
                                    style: styles.linkButtonSecondary,
                                    children: shareState === "sharing" ? "Preparing..." : "Send to WhatsApp"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this),
                        shareState === "unsupported" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$gif$2d$to$2d$whatsapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: styles.hint,
                            children: "Your browser can't attach files to WhatsApp directly — opened WhatsApp Web for you instead. Download the MP4 above and attach it manually. On a phone, this button uses the native share sheet and attaches it for you automatically."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
                            lineNumber: 114,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
                    lineNumber: 90,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
            lineNumber: 69,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/gif-to-whatsapp/app/page.js",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
const styles = {
    main: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f1115",
        fontFamily: "system-ui, sans-serif",
        padding: "24px"
    },
    card: {
        width: "100%",
        maxWidth: "480px",
        background: "#181b21",
        borderRadius: "12px",
        padding: "32px",
        color: "#f2f2f2"
    },
    h1: {
        fontSize: "22px",
        marginBottom: "4px"
    },
    sub: {
        color: "#9a9fa8",
        fontSize: "14px",
        marginBottom: "20px"
    },
    form: {
        display: "flex",
        gap: "8px"
    },
    input: {
        flex: 1,
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #2a2e37",
        background: "#0f1115",
        color: "#f2f2f2",
        fontSize: "14px"
    },
    button: {
        padding: "10px 16px",
        borderRadius: "8px",
        border: "none",
        background: "#25d366",
        color: "#0f1115",
        fontWeight: 600,
        cursor: "pointer"
    },
    error: {
        color: "#ff6b6b",
        marginTop: "14px",
        fontSize: "14px"
    },
    hint: {
        color: "#9a9fa8",
        fontSize: "13px",
        marginTop: "10px",
        lineHeight: 1.4
    },
    result: {
        marginTop: "20px"
    },
    video: {
        width: "100%",
        borderRadius: "8px"
    },
    actions: {
        display: "flex",
        gap: "8px",
        marginTop: "12px"
    },
    linkButton: {
        flex: 1,
        textAlign: "center",
        padding: "10px",
        borderRadius: "8px",
        background: "#2a2e37",
        color: "#f2f2f2",
        textDecoration: "none",
        fontSize: "14px"
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
        cursor: "pointer"
    }
};
}),
"[project]/Desktop/gif-to-whatsapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Desktop/gif-to-whatsapp/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=Desktop_gif-to-whatsapp_138mlo9._.js.map