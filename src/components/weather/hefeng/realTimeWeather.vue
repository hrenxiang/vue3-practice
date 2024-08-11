<script setup lang="ts" name="HeFengShiShiWeather">
  import {Get} from "@/api/api.ts";
  import {ref} from "vue";

  let weatherData = ref({});

  Get("/v7/weather/now?location=101010100&key=b35770fe8b0e4880927b0a969f74a189").then(res => {
    console.log(res[0], "====")
    weatherData.value = res[0]?.now;
  })
</script>

<template>
  <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
    <h1 style="margin-right: 20px">当前温度：{{weatherData.temp}}</h1>
    <i :class="'qi-' + weatherData.icon" style="font-size: 100px"></i>
  </div>
</template>

<style scoped>

</style>