<template>
  <div>
    {{ todo.message }}
    <button
      @click="
        isEditing = !isEditing;
        add();
      "
    >
      KNAPP
    </button>
    <span v-if="isEditing">EDITING</span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ todo: { message: string } }>();

const emit = defineEmits<{ (e: "mrnoob", msg: string): void }>();

let isEditing = ref(false);

const add = () => {
  emit("mrnoob", "hejsan");
};
</script>
