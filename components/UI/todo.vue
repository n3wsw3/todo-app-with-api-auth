<template>
  <div class="todo">
    <div v-if="!isEditing" class="message">{{ todo.message }}</div>
    <div v-else>
      <input type="text" v-model="tempValue" />
      <button @click="save">Save</button>
    </div>
    <div class="buttons">
      <button @click="edit">Edit</button>
      <button class="close">X</button>
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
  background-color: .colors() [BG-plus];
  padding: 0.5em;
  border-radius: 6px;
  margin: 10px 0;
}
.message {
  line-height: 1em;
}
.buttons {
  display: flex;
  button {
    margin: 0 0.2em;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    height: auto;

    &.close {
      background-color: .colors() [error];
      box-shadow: 1px 1px 0px 0px .colors() [error-click];

      &:hover {
        background-color: .colors() [error-hover];
      }

      &:active {
        box-shadow: none;
        background-color: .colors() [error-click];
      }
    }
  }
}
</style>
