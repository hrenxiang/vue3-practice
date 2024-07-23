<script setup lang="ts" name="LifecycleDemoParent">
import LifecycleDemo from "@/components/lifecycle/lifecycleDemo.vue";
import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref} from "vue";

let isShow = ref(true);

console.log('setup --- Parent')
// 生命周期钩子
onBeforeMount(()=>{
  console.log('挂载之前 --- Parent')
})
onMounted(()=>{
  console.log('挂载完毕 --- Parent')
})
onBeforeUpdate(()=>{
  console.log('更新之前 --- Parent')
})
onUpdated(()=>{
  console.log('更新完毕 --- Parent')
})
onBeforeUnmount(()=>{
  console.log('卸载之前 --- Parent')
})
onUnmounted(()=>{
  console.log('卸载完毕 --- Parent')
})
</script>

<template>
  <LifecycleDemo v-if="isShow"/>
</template>

<style scoped>

</style>