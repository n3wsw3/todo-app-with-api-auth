<template>
  <div v-if="error">{{ error }}</div>
  <template v-else>
    <UITodo
      v-for="todo in todos"
      :todo="todo"
      @update="changeTodo(todo.id, $event)"
    ></UITodo>
    <button @click="addTodo('new')">CREATE</button>
  </template>
</template>

<script lang="ts" setup>
import auth from "../../utility/auth";
const error = ref<string>("");
const todos = ref(
  await $fetch<Todo[]>("/api/v1/todo", {
    headers: { authorization: auth.value },
  }).catch((err) => {
    error.value = err.data.error;
    return [];
  })
);

const addTodo = async (message: string) => {
  const todo = await $fetch<Todo>("/api/v1/todo", {
    method: "POST",
    headers: { authorization: auth.value },
    body: { message },
  });
  todos.value.push(todo);
};

const changeTodo = async (id: string, message: string) => {
  const todo = await $fetch<Todo>(`/api/v1/todo/${id}`, {
    method: "PATCH",
    headers: { authorization: auth.value },
    body: { message },
  });
  const index = todos.value.findIndex((el) => el.id === todo.id);
  todos.value[index] = todo;
};
</script>
