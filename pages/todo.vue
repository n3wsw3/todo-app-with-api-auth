<template>
  <todo v-for="todo in todos" :todo="todo" @mrnoob="addTodo('tjo')"></todo>
  <button @click="addTodo('new')">CREATE</button>
</template>

<script lang="ts" setup>
let todos = ref([
  {
    message: "HEJSAN",
  },
  {
    message: "HEJDÅ",
  },
]);

let addTodo = (message: string) => {
  todos.value.push({ message });
};
</script>

<style lang="less" scoped></style>
