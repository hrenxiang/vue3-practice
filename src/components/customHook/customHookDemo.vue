<script setup lang="ts" name="CustomHookDemo">

import useSum from "@/components/customHook/hooks/useSum.ts";
import useDog from "@/components/customHook/hooks/useDog.ts";

let {sum, increment, decrement} = useSum()
let {dogList, getDog} = useDog()
</script>

<template>
  <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;gap: 100px">
    <div style="display: flex;justify-content: center;align-items: center;">
      <h2>当前求和为：{{ sum }}</h2>

      <button @click="increment">点我+1</button>

      <button @click="decrement">点我-1</button>
    </div>

    <div>
      <div style="display: grid;grid-template-columns: 1fr 1fr;justify-content: center;align-items: center;gap: 20px">
        <img v-for="(u,index) in dogList" :key="index" :src="(u as string)" style="object-fit: cover;width: 400px;height: 300px">
      </div>
      <span v-show="dogList">加载中......</span><br>
      <button @click="getDog">再来一只狗</button>
    </div>
  </div>

</template>

<style scoped>

</style>