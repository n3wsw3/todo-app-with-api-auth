<template>
  <div>
    <h1>Todos</h1>
    <ClientOnly>
      <UITodos />
      <template #fallback> Loading... </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup></script>
