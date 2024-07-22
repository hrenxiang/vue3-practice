<script setup name="ComponentRef">
import ComponentDemo from '@/components/labelRef/component.vue';
import {nextTick, onMounted, ref} from "vue";

let personRef = ref();

onMounted(() => {
  nextTick(() => {
    console.log(personRef.value);
    console.log(personRef.value.person);
    console.log(personRef.value.person.name);
    console.log(personRef.value.person.age);
    console.log(personRef.value.person.hobby);
  })
})
</script>

<template>
  <ComponentDemo ref="personRef"/>
</template>

<style scoped>

</style>