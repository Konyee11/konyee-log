import * as cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

export function syntaxHighlighter(content: string): string {
    const $ = cheerio.load(content);

    $("pre code").each((_, element) => {
        const code = $(element).text();
        const lang = $(element).attr("class")?.replace("language-", "") || "";

        try {
            let result;
            if (!lang) {
                result = hljs.highlightAuto(code).value;
            } else {
                result = hljs.highlight(code, {
                    language: lang,
                }).value;
            }
            $(element).html(result);
        } catch (error) {
            console.warn(`Failed to highlight code block: ${code}`, error);
        }
    });

    return $.html();
}
