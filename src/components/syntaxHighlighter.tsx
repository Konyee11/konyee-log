"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

type Props = { content: string };

export default function SyntaxHighlighter({ content }: Props) {
    useEffect(() => {
        // 1. ページ内のコードブロックをハイライトする
        document.querySelectorAll("pre code").forEach((el) => {
            hljs.highlightElement(el as HTMLElement);
        });

        // 2. コードブロックのコピー機能を追加する
        document.querySelectorAll("pre").forEach((pre) => {
            if (pre.querySelector(".copy-btn")) return;

            const code = pre.querySelector("code")?.textContent || "";

            // コピー用のボタンを作成
            const btn = document.createElement("button");
            btn.className = "copy-btn";
            btn.textContent = "Copy";
            btn.dataset.code = code;

            // コピー用のボタンをクリックしたときの処理
            btn.addEventListener("click", () => {
                navigator.clipboard.writeText(code).then(() => {
                    btn.textContent = "Copied!";
                    setTimeout(() => {
                        btn.textContent = "Copy";
                    }, 1000);
                });
            });

            // コピー用のボタンをコードブロックの右上に追加
            pre.style.position = "relative";
            btn.style.position = "absolute";
            btn.style.top = "0";
            btn.style.right = "0";
            btn.style.width = "48px";
            btn.style.height = "32px";
            btn.style.color = "#fff";
            btn.style.border = "none";
            btn.style.cursor = "pointer";
            btn.style.fontSize = "12px";

            pre.appendChild(btn);
        });
    }, [content]);

    return <article dangerouslySetInnerHTML={{ __html: content }} />;
}
