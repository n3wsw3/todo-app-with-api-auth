<template>
  <todo v-for="todo in todos" :todo="todo" @mrnoob="addTodo($event)"></todo>
  <button @click="addTodo('new')">CREATE</button>
</template>

<script lang="ts" setup>

const todos = ref<[{ id?: string, title: string, user?: string }]>(await $fetch("/api/v1/todo"));

let addTodo = (title: string) => {
  todos.value.push({ title });
};
</script>

<style lang="less" scoped></style>
