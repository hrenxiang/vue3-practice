<script lang="ts" setup name="RouterTest">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <div class="router-test">
    <h2 class="title">Vue路由测试</h2>

    <!-- 导航区 -->
    <div class="navigate">
      <RouterLink to="/home" active-class="active">首页</RouterLink>

      <RouterLink to="/about" active-class="active">关于</RouterLink>

      <!-- 第一种：to的字符串写法 -->
      <router-link active-class="active" to="/home">主页</router-link>

      <!-- 第二种：to的对象写法 -->
      <router-link active-class="active" :to="{path:'/home'}">Home</router-link>


      <RouterLink to="/about/detail" active-class="active">关于详情</RouterLink>
      <RouterLink :to="{name: 'guanyudetail'}" active-class="active">关于详情2</RouterLink>


    </div>

    <!-- 展示区 -->
    <div class="main-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.router-test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
}
</style>
