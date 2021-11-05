<template>
  <p>{{ HelloAPI }}</p>
  <p>{{ counter }}</p>
  <button @click="increase">Increase Count!</button>
</template>

<script lang="ts" setup>
const HelloAPI = await $fetch("/api/hello");

let counter = ref(0);
const increase = () => counter.value++;
</script>

<style></style>
