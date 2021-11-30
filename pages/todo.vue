<template>
  <todo v-for="todo in todos" :todo="todo"></todo>
  <button @click="addTodo('new')">CREATE</button>
</template>

<script lang="ts" setup>
const todos = ref(await $fetch<Todo[]>("/api/v1/todo"));

let addTodo = (message: string) => {
  todos.value.push({ message, user: "", id: "" });
};
</script>
