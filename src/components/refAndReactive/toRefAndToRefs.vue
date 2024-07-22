<script setup lang="ts" name="ToRefAndToRefs">
import {reactive, toRef, toRefs} from "vue";

// 数据
let person = reactive({name: "张三", age: 18, gender: "男"});

let {name, age} = toRefs(person);

let gender = toRef(person, 'gender');

// 方法
function changeName() {
  name.value += "~";
}

function changeAge() {
  age.value += 1;
}

function changeGender() {
  gender.value = "女";
}
</script>

<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>姓名：{{ name }}</h2>

    <h2>年龄：{{ person.age }}</h2>
    <h2>年龄：{{ age }}</h2>

    <h2>性别：{{ person.gender }}</h2>
    <h2>性别：{{ gender }}</h2>

    <button @click="changeName">修改名字</button>

    <button @click="changeAge">修改年龄</button>

    <button @click="changeGender">修改性别</button>
  </div>
</template>

<style scoped></style>
