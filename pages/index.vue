<template>
  <div>
    <h1>Fak u</h1>
    <!-- <p>{{ HelloAPI }}</p> -->
    <p>{{ counter }}</p>
    <button @click="increase">Increase Count!</button>
  </div>
</template>

<script lang="ts" setup>
// const HelloAPI = await $fetch<string>("/api/v1/hello").catch((err) =>
//   console.log(err)
// );

let counter = ref(0);
const increase = () => counter.value++;
</script>
