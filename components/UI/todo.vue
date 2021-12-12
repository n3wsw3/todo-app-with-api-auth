<template>
  <div class="todo">
    <div v-if="!isEditing" class="begin">
      <span
        class="done"
        :class="{ true: todo.isDone }"
        @click="save({ isDone: !todo.isDone })"
      ></span>
      <span class="message">{{ todo.message }}</span>
    </div>
    <div v-else class="edit">
      <input type="text" v-model="tempValue" class="n3" placeholder="Message" />
    </div>
    <div class="buttons">
      <button v-if="!isEditing" @click="edit" class="n3 primary">Edit</button>
      <button v-else @click="save({ message: tempValue })" class="n3 primary">
        Save
      </button>
      <button @click="remove" class="n3">Delete</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{
  (e: "update", msg: TodoUpdateRequest): void;
  (e: "remove"): void;
}>();

const isEditing = ref(false);
const tempValue = ref(props.todo.message);

const edit = () => {
  isEditing.value = !isEditing.value;
};

const save = (obj: TodoUpdateRequest) => {
  isEditing.value = false;
  emit("update", obj);
};

const remove = () => {
  emit("remove");
};
</script>
<style lang="less" scoped>
@import "../assets/definitions.less";
@size: 40px;
.todo {
  display: flex;
  justify-content: space-between;
  background-color: .colors() [BG-plus];
  padding: 0.7em 1.2em;
  border-radius: 10px;
  margin: 10px 0;
  box-shadow: 2px 3px 4px 0px rgb(0 0 0 / 25%), 2px 2px 9px 2px rgb(0 0 0 / 22%);

  .begin {
    display: flex;
    @csize: 20px;
    > .done {
      border: 2px solid .colors() [text];
      border-radius: 100%;
      width: @csize;
      height: @csize;
      margin: auto;
      margin-right: 10px;
      cursor: pointer;

      &:hover {
        border-color: .colors() [text-hover];
      }

      &:active {
        border-color: .colors() [text-click];
      }

      &.true {
        border: none;
        font-size: 22px;
        line-height: @csize;

        &:after {
          content: "🗸";
          padding-left: 3px;
        }
      }
    }
    .message {
      margin: 0;
      line-height: @size;
      font-size: 1em;
      letter-spacing: 0.5px;
    }
  }

  .edit {
    width: 100%;
    margin-right: 1em;
  }
}
.buttons {
  display: flex;
}
</style>
