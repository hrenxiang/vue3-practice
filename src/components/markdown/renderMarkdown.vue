<template>
  <div>
<!--    <input type="file" @change="handleFileUpload" accept=".md"/>-->
    <!--    <div v-html="compiledMarkdown" class="markdown-body"></div>-->
    <!-- TOC 部分 -->
    <div v-html="tocHtml2" class="toc-container"></div>
  </div>
</template>

<script setup lang="ts" name="RenderMarkdown">
import {ref} from 'vue'
import MarkdownIt from 'markdown-it'
import markdownItHighlightjs from 'markdown-it-highlightjs'
import markdownItCodeCopy from '@/plugins/markdown-it-code-copy'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItToc from '@/plugins/markdown-it-toc.ts'
import uslug from "uslug";

const md = MarkdownIt()
const tocHtml2 = ref('')
// 配置代码高亮插件
md.use(markdownItHighlightjs)
// 配置代码块复制插件
md.use(markdownItCodeCopy, {
  onSuccess: () => {
    console.log('Copy successful');
  },
  onError: () => {
    console.log('Copy failed');
  },
})
md.use(markdownItAnchor, {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#',
  slugify: (x: any) => {
    return uslug(x)
  }
})
md.use(markdownItToc, {
  slugify: (x: any) => {
    return uslug(x)
  },
  level: [1],
  listType: 'ol',
  listStyle: "list-style: none",
  callback: (tocHtml: string, tocData: any) => {
    // 在此处你可以拿到 TOC 的 HTML 和解析后的数据结构 tocData
    console.log('TOC HTML:', tocHtml);
    console.log('TOC Data:', tocData);
    tocHtml2.value = tocHtml;
  },
})

const compiledMarkdown = ref('')

// 处理文件上传
// const handleFileUpload = (event: Event) => {
//   const input = event.target as HTMLInputElement
//   const file = input.files ? input.files[0] : null
//   if (file) {
//     const reader = new FileReader()
//     reader.onload = (e: ProgressEvent<FileReader>) => {
//       const result = e.target?.result
//       if (typeof result === 'string') {
//         compiledMarkdown.value = md.render(result)
//       } else {
//         console.error('文件内容无法转换为字符串')
//       }
//     }
//     reader.readAsText(file)
//   } else {
//     alert('请选择一个有效的 Markdown 文件 (.md)')
//   }
// }

const markdownText = `
# Title

## Section 1

### Subsection 1.1

## Section 2

### Subsection 2.1
`;

compiledMarkdown.value = md.render(markdownText);
</script>

<style scoped>
.markdown-body {
  font-family: 'PingFang SC';
  font-size: 16px;
}
</style>
