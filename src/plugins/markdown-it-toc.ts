import MarkdownIt from 'markdown-it';

// 默认的 slugify 函数，用于将标题转换为 URL 友好的锚点 ID
function slugify(e: string): string {
    return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g, "-"));
}

// HTML 转义函数，防止 XSS 攻击
function escapeHtml(e: string): string {
    return String(e)
        .replace(/&/g, "&amp;")  // 转义 &
        .replace(/"/g, "&quot;") // 转义 "
        .replace(/'/g, "&#39;") // 转义 '
        .replace(/</g, "&lt;")  // 转义 <
        .replace(/>/g, "&gt;"); // 转义 >
}

export default function markdownItToc(md: MarkdownIt, options: any = {}) {
    // 默认的选项配置
    const defaultOptions = {
        // placeholder: "(\\$\\{toc\\}|\\[\\[?_?toc_?\\]?\\]|\\$\\<toc(\\{[^}]*\\})\\>)",
        placeholder: "",
        slugify: slugify,  // 使用默认的 slugify 函数
        uniqueSlugStartIndex: 1,  // 唯一 slug 的起始索引
        containerClass: "table-of-contents",  // TOC 容器的 CSS 类
        containerId: undefined,  // TOC 容器的 ID
        listClass: undefined,  // 列表的 CSS 类
        itemClass: undefined,  // 列表项的 CSS 类
        linkClass: undefined,  // 链接的 CSS 类
        level: 1,  // TOC 起始级别
        listType: "ol",  // 列表类型，支持 "ol" 或 "ul"
        listStyle: undefined,
        format: undefined,  // 用于格式化标题的函数
        callback: undefined  // 目录生成后的回调函数
    };

    // 合并用户选项与默认选项
    const opts = {...defaultOptions, ...options};
    const tocRegex = new RegExp(`^${opts.placeholder}$`, "i");

    // 渲染 TOC 开始标签
    md.renderer.rules.tocOpen = function (tokens: any[], idx: number) {
        const tocOptions = {...opts, ...(tokens[idx]?.inlineOptions || {})};
        return `<nav${tocOptions.containerId ? ` id="${escapeHtml(tocOptions.containerId)}"` : ''} class="${escapeHtml(tocOptions.containerClass)}">`;
    };

    // 渲染 TOC 结束标签
    md.renderer.rules.tocClose = function () {
        return "</nav>";
    };

    // 渲染 TOC 内容
    md.renderer.rules.tocBody = function (tokens: any[], idx: number) {
        const tocOptions = {...opts, ...(tokens[idx]?.inlineOptions || {})};

        // 递归渲染 TOC 的函数
        function renderToc(data: any): string {
            const listClass = tocOptions.listClass ? ` class="${escapeHtml(tocOptions.listClass)}"` : "";
            const listStyle = tocOptions.listStyle ? ` style="${escapeHtml(tocOptions.listStyle)}"` : "";
            const itemClass = tocOptions.itemClass ? ` class="${escapeHtml(tocOptions.itemClass)}"` : "";
            const linkClass = tocOptions.linkClass ? ` class="${escapeHtml(tocOptions.linkClass)}"` : "";

            if (data.c.length === 0) return "";  // 如果没有子项，返回空字符串

            let html = "";

            // 检查当前级别是否需要渲染
            const levelCheck = Array.isArray(tocOptions.level)
                ? (level: number) => tocOptions.level.includes(level)
                : (level: number) => level >= tocOptions.level;

            // 渲染列表的开头
            if ((data.l === 0 || levelCheck(data.l))) {
                html += `<${escapeHtml(tocOptions.listType)}${listClass}${listStyle}>`;
            }

            // 渲染每个子项
            data.c.forEach((item: any) => {
                if (item.l === 0 || levelCheck(item.l)) {
                    html += `<li${itemClass}><a${linkClass} href="#${generateSlug(item.n, tocOptions.slugify)}">${typeof tocOptions.format === 'function' ? tocOptions.format(item.n) : item.n}</a>${renderToc(item)}</li>`;
                } else {
                    html += renderToc(item);
                }
            });

            // 渲染列表的结束
            if (data.l === 0 || levelCheck(data.l)) {
                html += `</${escapeHtml(tocOptions.listType)}>`;
            }

            return html;
        }

        // 生成唯一 slug 的函数
        function generateSlug(text: string, slugify: (text: string) => string): string {
            let slug = slugify(text);
            let index = tocSlugIndex[slug] ? tocSlugIndex[slug] : opts.uniqueSlugStartIndex;
            while (tocSlugIndex[slug]) {
                slug = `${slug}-${index++}`;
            }
            tocSlugIndex[slug] = index; // 更新 tocSlugIndex 中的索引
            return slug;
        }

        const tocSlugIndex: { [key: string]: number } = {};
        const tocData = parseToc(tokens);
        console.log(tocData, "=======tocData")
        // 生成 TOC HTML 并调用回调函数（如果提供）
        console.log(md.renderer.rules, "=======md.renderer.rules")
        if (md.renderer.rules.tocOpen && md.renderer.rules.tocClose) {
            const tocHtml = `${md.renderer.rules.tocOpen([], 0, {}, {}, md.renderer)}${renderToc(tocData)}${md.renderer.rules.tocClose([], 0, {}, {}, md.renderer)}`;

            if (typeof opts.callback === 'function') {
                opts.callback(tocHtml, tocData);
            }

            return tocHtml;
        }

        return ""
    };

    // 解析 TOC 数据的函数
    function parseToc(tokens: any[]): any {
        const root = {l: 0, n: "", c: [] as any[]}; // TOC 根节点
        const stack: any[] = [root]; // 栈，用于处理层级结构
        tokens.forEach((token: any) => {
            if (token.type === 'heading_open') {
                const level = parseInt(token.tag.substring(1), 10); // 获取标题级别
                const title = tokens[tokens.indexOf(token) + 1]?.content || ""; // 获取标题内容
                const node = {l: level, n: title, c: [] as any[]}; // 创建节点

                // 处理栈中的层级
                while (stack.length > 0 && stack[0].l >= level) {
                    stack.shift();
                }

                stack[0].c.push(node); // 将节点添加到当前层级
                stack.unshift(node); // 将节点推入栈中，成为新的层级
            }
        });
        return root;
    }

    // 替换 TOC 占位符为实际 TOC
    md.core.ruler.push("generateTocAst", function (state: any) {
        const tokens = state.tokens;
        if (tokens.some((token: any) => tocRegex.test(token.content))) {
            const tocStartToken = tokens.find((token: any) => tocRegex.test(token.content));
            const tocEndToken = tokens[tokens.indexOf(tocStartToken) + 2];
            const tocTokens = tokens.slice(tokens.indexOf(tocStartToken), tokens.indexOf(tocEndToken) + 1);

            tocStartToken.type = 'tocOpen';
            tocEndToken.type = 'tocClose';
            tocTokens[1].type = 'tocBody';
        }
    });

    // 处理 TOC 占位符的行
    md.block.ruler.before("heading", "toc", function (state: any, startLine: number, _endLine: number, silent: boolean) {
        const line = state.src.slice(state.bMarks[startLine] + state.tShift[startLine], state.eMarks[startLine]).split(" ")[0];
        if (!tocRegex.test(line)) return false;

        if (silent) return true;

        const tocMatch = tocRegex.exec(line);
        const tocOptions: any = {};
        if (tocMatch && tocMatch[3]) {
            try {
                Object.assign(tocOptions, JSON.parse(tocMatch[3]));
            } catch (err) {
                // 解析失败，使用默认选项
            }
        }

        state.line = startLine + 1;
        const tocOpen = state.push("tocOpen", "nav", 1);
        tocOpen.markup = "";
        tocOpen.map = [startLine, state.line];
        tocOpen.inlineOptions = tocOptions;

        const tocBody = state.push("tocBody", "", 0);
        tocBody.markup = "";
        tocBody.map = [startLine, state.line];
        tocBody.inlineOptions = tocOptions;

        const tocClose = state.push("tocClose", "nav", -1);
        tocClose.markup = "";

        return true;
    }, {alt: ["paragraph", "reference", "blockquote"]});
}
