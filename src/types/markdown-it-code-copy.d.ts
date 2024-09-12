declare module 'markdown-it-code-copy' {
    import MarkdownIt from 'markdown-it';

    interface CodeCopyOptions {
        /**
         * 复制成功时的回调函数
         */
        onSuccess?: () => void;

        /**
         * 复制失败时的回调函数
         */
        onError?: () => void;

        /**
         * 自定义复制按钮的文本
         */
        copyButtonText?: string;

        /**
         * 复制按钮图标的样式
         */
        iconStyle?: string;

        /**
         * 复制按钮图标的类名
         */
        iconClass?: string;

        /**
         * 复制按钮的样式
         */
        buttonStyle?: string;

        /**
         * 复制按钮的额外类名
         */
        buttonClass?: string;

        /**
         * 复制按钮内的额外 HTML 元素
         */
        element?: string;
    }

    function codeCopy(md: MarkdownIt, opts?: CodeCopyOptions): void;

    export default codeCopy;
}
