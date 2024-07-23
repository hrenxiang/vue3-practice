<template>
  <div id="vs"></div>
</template>
<script setup>
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";
import {nextTick, onMounted} from "vue";

onMounted(() => {
  nextTick(() => {
    const player = new Player({
      id: 'vs',
      autoplay: true,
      controls: true,
      width: 600,
      height: 337.5,
      fluid: true,
      videoFillMode: "auto",
      volume: 0.3,
      url: 'http://169.254.176.231:19098/template-api/file/s3/fragment/download?filePath=/template-admin/2024/5/30/default/1717000524201_开放api平台（7）.m4v',
      poster: "https://lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/poster.jpg",
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
    })
  })
})

</script>
<style scoped>
::v-deep .el-dialog__header,
::v-deep .el-dialog__footer {
  display: none;
}
::v-deep .el-dialog {
  background: black;
}
::v-deep .el-dialog__body {
  padding: 0;
  position: relative;
  border: none;
}

::v-deep .el-dialog__body .icon {
  z-index: 100;
  position: absolute;
  right: 20px;
  top: 10px;
  width: 20px;
  height: 20px;


}

::v-deep .el-dialog__body .icon .el-icon-close {
  font-size: 24px;
  color: red;
  font-weight: 600;
}
</style>
