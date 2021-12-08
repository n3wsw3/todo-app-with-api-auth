<template>
  <ClientOnly>
    <UITodos />
    <template #fallback> Loading... </template>
  </ClientOnly>
</template>

<script lang="ts" setup></script>
