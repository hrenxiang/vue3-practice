<template>
  <div>
    <input type="file" @change="handleFileUpload" accept=".md"/>
    <div v-html="compiledMarkdown" class="markdown-body"></div>
  </div>
</template>

<script setup lang="ts" name="RenderMarkdown">
import {ref} from 'vue'
import MarkdownIt from 'markdown-it'
import markdownItHighlightjs from 'markdown-it-highlightjs'
import markdownItCodeCopy from 'markdown-it-code-copy'

const md = MarkdownIt()
// 配置代码高亮插件
md.use(markdownItHighlightjs)
// 配置代码块复制插件
md.use(markdownItCodeCopy, {
  onSuccess: () => {
    alert("Copy successful")
    console.log('Copy successful');
  },
  onError: () => {
    console.log('Copy failed');
  },
  copyButtonText: 'Copy'
})

const compiledMarkdown = ref('')

// 处理文件上传
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files ? input.files[0] : null
  debugger
  if (file) {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result
      if (typeof result === 'string') {
        compiledMarkdown.value = md.render(result)
      } else {
        console.error('文件内容无法转换为字符串')
      }
    }
    reader.readAsText(file)
  } else {
    alert('请选择一个有效的 Markdown 文件 (.md)')
  }
}
</script>

<style scoped>
/* 自定义样式 */
h1 {
  color: #42b983;
}
</style>
