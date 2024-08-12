<script setup lang="ts" name="HeFengShiShiWeather">
import {Get} from "@/api/api.ts";
import {ref} from "vue";

let weatherData = ref({});

let weatherIcon = ref();

const icons = import.meta.glob('@/components/weather/hefeng/icon/*.png', {eager: true});

// 提取并整理成一个对象
const iconMap: Record<string, string> = {};
for (const path in icons) {
  const key = path.split('/').pop()?.replace('.png', '');
  if (key) {
    iconMap[key] = (icons[path] as any).default;
  }
}

Get("/v7/weather/now?location=101180101&key=b35770fe8b0e4880927b0a969f74a189").then(res => {
  console.log(res[0], "====")
  weatherData.value = res[0]?.now;
  weatherIcon.value = iconMap[weatherData.value.icon];
})
</script>

<template>
  <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
    <h1 style="margin-right: 20px">当前温度：{{ weatherData.temp }}</h1>
        <i :class="'qi-' + weatherData.icon" style="font-size: 100px"></i>
<!--    <img :src="weatherIcon" alt=""/>-->
  </div>
</template>

<style scoped>

</style>