<script setup lang="ts" name="App">

import RouterTest from "@/components/router/RouterTest.vue";
import PdfCopy from "@/components/pdf/pdfCopy.vue";
import DontShowHeader from "@/components/eltable/DontShowHeader.vue";
import RealTimeWeather from "@/components/weather/hefeng/realTimeWeather.vue";
</script>

<template>
  <div class="app-container">
    <!--  <WatchRefBasic/>-->
    <!--  <WatchRefObject/>-->
    <!--  <WatchReactiveObject/>-->
    <!--  <WatchRefOrReactiveObjectField/>-->
    <!--  <WatchRefOrReactiveObjectFields/>-->
    <!--  <WatchEffectDemo/>-->
    <!--  <LabelRef/>-->
    <!--  <ComponentRef/>-->
    <!--  <div style="width: 600px; height: 500px; margin: auto; display: flex; align-items: center; justify-content: center;">-->
    <!--    <DownloadFragment/>-->
    <!--  </div>-->
    <!--  <PropsDemo/>-->
    <!--  <LifecycleDemoParent/>-->
    <!--  <CustomHookDemo/>-->
    <!--    <RouterTest/>-->
    <!--    <PdfCopy/>-->
    <!--    <DontShowHeader/>-->
    <RealTimeWeather/>
  </div>
</template>

<style scoped>
.app-container {
  width: 600px;
  height: 500px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
