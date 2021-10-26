<template>
  <p class="fuck">{{ data }}</p>
  <p v-if="counter > 10">{{ counter }}</p>
  <button @click="increase">Increase Count!</button>
</template>

<script lang="ts" setup>
const { data } = await useFetch("/api/hello");
let counter = ref(0);
const increase = () => counter.value++;
</script>
