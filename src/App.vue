<script setup lang="ts" name="App">

import RouterTest from "@/components/router/RouterTest.vue";
import PdfCopy from "@/components/pdf/pdfCopy.vue";
import DontShowHeader from "@/components/eltable/DontShowHeader.vue";
import RealTimeWeather from "@/components/weather/hefeng/hefengRealTimeWeather.vue";
import GaodeRealTimeWeather from "@/components/weather/gaode/gaodeRealTimeWeather.vue";
import HefengRealTimeWeather from "@/components/weather/hefeng/hefengRealTimeWeather.vue";
import SingleLineEdit from "@/components/eltable/SingleLineEdit.vue";
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
    <!--    <HefengRealTimeWeather/>-->
    <!--        <GaodeRealTimeWeather/>-->
    <SingleLineEdit/>
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
