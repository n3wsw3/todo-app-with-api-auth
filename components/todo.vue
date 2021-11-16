<template>
  <div>
    {{ todo.title }}
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
defineProps<{ todo: todo }>();

const emit = defineEmits<{ (e: "mrnoob", msg: string): void }>();

interface todo {
  id: string;
  title: string;
  user: string;
}

let isEditing = ref(false);

const add = () => {
  emit("mrnoob", "hejsan");
};
</script>
