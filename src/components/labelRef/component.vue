<script setup name="ComponentDemo">

import {ref} from "vue";

const person = ref({
  name: 'huangrx',
  age: 20,
  hobby: ['game', 'eat']
})

defineExpose({person})
</script>

<template>

</template>

<style scoped>

</style>