<script lang="ts" setup name="PropsDemo">

import PropsPerson from "@/components/props/propsPerson.vue";
import {type PropsPersonType} from "@/components/props/propsType";
import {reactive} from "vue";

let personList = reactive<PropsPersonType>([
  {id: "1", name: "Person 1", age: 12},
  {id: "2", name: "Person 2", age: 13},
  {id: "3", name: "Person 3", age: 14},
])

</script>

<template>
  <PropsPerson :list="personList"/>
</template>

<style scoped>

</style>