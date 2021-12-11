<template>
  <div v-if="error">{{ error }}</div>
  <template v-else>
    <UITodo
      v-for="todo in todos"
      :todo="todo"
      @update="changeTodo(todo.id, $event)"
      @remove="deleteTodo(todo.id)"
    ></UITodo>
    <button @click="addTodo('new')" class="n3 primary">CREATE</button>
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

const deleteTodo = async (id: string) => {
  await $fetch(`/api/v1/todo/${id}`, {
    method: "DELETE",
    headers: { authorization: auth.value },
  })
    .then((resp) => {
      const index = todos.value.findIndex((el) => el.id === id);
      todos.value.splice(index, 1);
    })
    .catch((err) => console.error(err));
};
</script>
