<template>
  <div class="todo">
    <div v-if="!isEditing">{{ todo.message }}</div>
    <div v-else>
      <input type="text" v-model="tempValue" />
      <button @click="save">Save</button>
    </div>
    <div class="buttons">
      <button @click="edit">Edit</button>
      <button>X</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{ (e: "update", msg: string): void }>();

let isEditing = ref(false);

let tempValue = ref(props.todo.message);

const edit = () => {
  isEditing.value = true;
};

const save = () => {
  isEditing.value = false;
  emit("update", tempValue.value);
};
</script>
<style lang="less" scoped>
@import "../assets/definitions.less";
.todo {
  display: flex;
  justify-content: space-between;
  background-color: .colors() [BG-hover];
  padding: 0.5em;
  border-radius: 6px;
  margin-bottom: 5px;
}

.buttons {
  button {
    margin: 0 0.2em;
  }
}
</style>
