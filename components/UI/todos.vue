<template>
  <UITodo
    v-for="todo in todos"
    :todo="todo"
    @update="changeTodo(todo.id, $event)"
  ></UITodo>
  <button @click="addTodo('new')">CREATE</button>
</template>

<script lang="ts" setup>
const auth = useAuth();
const todos = ref(
  await $fetch<Todo[]>("/api/v1/todo", {
    headers: { authorization: auth.value },
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
