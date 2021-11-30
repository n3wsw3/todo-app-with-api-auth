<template>
  <div class="todo">
    <div class="message">{{ todo.message }}</div>
    <div class="buttons">
      <button>Edit</button>
      <button>X</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ todo: Todo }>();

// const emit = defineEmits<{ (e: "mrnoob", msg: string): void }>();

// let isEditing = ref(false);

// const add = () => {
// emit("mrnoob", "hejsan");
// };
</script>
<style lang="less" scoped>
@import "../assets/definitions.less";
.todo {
  display: flex;
  justify-content: space-between;
  background-color: .colors() [BG-hover];
  // height: 30px;
  padding: 0.5em;
  border-radius: 6px;
  margin-bottom: 5px;
}
.message {
}

.buttons {
  button {
    // padding: 0.5em;
    margin: 0 0.2em;
  }
}
</style>
