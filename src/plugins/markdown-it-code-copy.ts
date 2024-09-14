import _ from 'lodash';
import ClipboardJS from 'clipboard';

let clipboard: ClipboardJS | null = null;
try {
    // 判断是否在浏览器环境
    if (typeof window !== 'undefined') {
        clipboard = new ClipboardJS('.markdown-it-code-copy');
    }
} catch (_err) {
    // 捕获错误
}

interface Options {
    iconStyle?: string;
    iconClass?: string;
    buttonStyle?: string;
    buttonClass?: string;
    element?: string;
    onSuccess?: (e: ClipboardJS.Event) => void;
    onError?: (e: ClipboardJS.Event) => void;
}

const defaultOptions: Options = {
    iconStyle: '',
    iconClass: 'mdi mdi-clipboard-outline',
    buttonStyle: 'position: absolute; top: 7.5px; right: 6px; cursor: pointer; outline: none; ' +
        'background-color: #F6F8FA; padding: 3px 3px; border: 1px solid rgba(0, 0, 0, 0.3); border-radius: 3px; ',
    buttonClass: '',
    element: ''
};

function renderCode(origRule: (...args: any[]) => string, options: Options) {
    options = _.merge(defaultOptions, options);

    return (...args: any[]) => {
        const [tokens, idx] = args;
        const content = tokens[idx].content
            .replaceAll('"', '&quot;')
            .replaceAll("'", "&apos;");
        const origRendered = origRule(...args);

        if (content.length === 0) return origRendered;

        return `
             <div style="position: relative">
                ${origRendered}
                  <button class="markdown-it-code-copy ${options.buttonClass}" 
                          data-clipboard-text="${content}" 
                          style="${options.buttonStyle}" title="Copy"
                  >
                    <span style="font-size: 21px; opacity: 0.5; ${options.iconStyle}" class="${options.iconClass}">${options.element}</span>
                    <span style="font-size: 12px; font-weight: bold; line-height: 24px; opacity: 0;" class="copy-tooltip">Copied</span>
                  </button>
            </div>
            <style>
              .copy-tooltip {
                position: absolute;
                left: -60px;
                top: 50%;
                width: 60px;
                transform: translateY(-50%);
                background: #F6F8FA;
                border: 1px solid rgba(0, 0, 0, 0.3);
                border-radius: 3px 0 0 3px;
                color: rgba(0,0,0,0.5);
                padding: 3px 6px;
                white-space: nowrap;
                transition: opacity 1s ease;
              }
              .markdown-it-code-copy.active {
                border-left-width: 0;
                border-radius: 0 3px 3px 0;
              }
              .markdown-it-code-copy.active .copy-tooltip {
                opacity: 1 !important;
              }
            </style>
        `;
    };
}

export default (md: any, options: Options) => {
    if (clipboard) {
        if (options.onSuccess) {
            clipboard.on('success', (e) => {
                // 获取当前被点击的按钮
                const button = e.trigger as HTMLElement;

                // 激活按钮，显示“Copied”提示
                button.classList.add('active');

                // 2秒后移除“Copied”提示
                setTimeout(() => {
                    button.classList.remove('active');
                }, 2000);

                options.onSuccess?.(e); // 调用用户的 onSuccess 回调
            });
        }
        if (options.onError) {
            clipboard.on('error', options.onError);
        }
    }
    md.renderer.rules.code_block = renderCode(md.renderer.rules.code_block, options);
    md.renderer.rules.fence = renderCode(md.renderer.rules.fence, options);
};
