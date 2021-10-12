<template>
  <p>{{ counter }}</p>
  <button @click="increase">Increase Count!</button>
</template>

<script lang="ts" setup>
let counter = ref(0);
const increase = () => counter.value++;
</script>

<style></style>
