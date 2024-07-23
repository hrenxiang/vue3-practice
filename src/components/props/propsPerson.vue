<script setup lang="ts" name="PropsPerson">

import {PropsPersonType} from "@/components/props/propsType.ts";

defineProps<{list: PropsPersonType}>()

// withDefaults(defineProps<{list?: PropsPersonType}>(), {
//   list: () => [{id: "1", name: "Person Default", age: 10}]
// })
</script>

<template>
  <div class="person">
    <ul>
      <li v-for="item in list" :key="item.id">
        {{item.name}}--{{item.age}}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>