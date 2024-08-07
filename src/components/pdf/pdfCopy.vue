<template>
  <div>
    <button @click="generatePdf">生成 PDF</button>
  </div>
</template>

<script lang="ts" setup name="PdfCopy">
import {PDFDocument, rgb} from 'pdf-lib';

const generatePdf = async () => {
  // 创建一个新的 PDF 文档
  const pdfDoc = await PDFDocument.create();

  // 添加一个页面
  const page = pdfDoc.addPage([600, 400]);

  // 绘制文本
  page.drawText('This is the actual text that should be copyable!', {
    x: 50,
    y: 100,
    size: 20,
    color: rgb(0, 0, 0),
  });

  // 保存 PDF
  const pdfBytes = await pdfDoc.save();

  // 创建一个 Blob 对象并下载 PDF
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // 在新窗口中打开 PDF 预览
  // window.open(url);
  // 在新窗口中打开 PDF 预览
  window.open(url, '_black', "popup=true");

  // const a = document.createElement('a');
  // a.href = url;
  // a.download = 'example_with_text_and_image.pdf';
  // document.body.appendChild(a);
  // a.click();
  // document.body.removeChild(a);
};
</script>