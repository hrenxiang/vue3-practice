<script setup lang="ts" name="GaodeShiShiWeather">
import {Get} from "@/api/api.ts";
import {ref} from "vue";

const icons = import.meta.glob('@/components/weather/gaode/icon/*.png', {eager: true});

// 提取并整理成一个对象
const iconMap: Record<string, string> = {};
for (const path in icons) {
  const key = path.split('/').pop()?.replace('.png', '');
  if (key) {
    iconMap[key] = (icons[path] as any).default;
  }
}

let weatherData = ref({});

let weatherIcon = ref();

Get("/v3/weather/weatherInfo?key=95300c412a25300b414af6aaa2ef52be&city=410100&extensions=base&output=JSON").then(res => {
  console.log(res[0], "====")
  weatherData.value = res[0]?.lives[0];
  // 根据天气数据动态获取图片路径
  console.log(iconMap);
  console.log(weatherData);
  weatherIcon.value = iconMap[weatherData.value.weather];
})


</script>

<template>
  <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
    <h1 style="margin-right: 20px">当前温度：{{ weatherData.temperature }}</h1>
    <img :src="weatherIcon" alt="图片"/>
  </div>
</template>

<style scoped>

</style>