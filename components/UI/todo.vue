<template>
  <div class="todo">
    <div v-if="!isEditing" class="begin">
      <label class="input" :for="todo.id + 'done'">
        <input
          type="checkbox"
          name="isDone"
          :id="todo.id + 'done'"
          v-model="isDone"
        />
        <span></span>
      </label>
      <p class="message">{{ todo.message }}</p>
    </div>
    <div v-else>
      <input type="text" v-model="tempValue" />
    </div>
    <div class="buttons">
      <button v-if="!isEditing" @click="edit" class="primary">Edit</button>
      <button v-else @click="save" class="primary">Save</button>
      <button>Delete</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{ (e: "update", msg: string): void }>();

const isEditing = ref(false);
const isDone = ref(false);

const tempValue = ref(props.todo.message);

const edit = () => {
  isEditing.value = !isEditing.value;
};

const save = () => {
  isEditing.value = false;
  emit("update", tempValue.value);
};
</script>
<style lang="less" scoped>
@import "../assets/definitions.less";
@size: 30px;
.todo {
  display: flex;
  justify-content: space-between;
  background-color: .colors() [BG-plus];
  padding: 0.7em;
  border-radius: 10px;
  margin: 10px 0;
  box-shadow: 2px 3px 4px 0px rgb(0 0 0 / 25%), 2px 2px 9px 2px rgb(0 0 0 / 22%);
  > * {
    height: @size;
  }
  .begin {
    display: flex;
    @csize: 20px;
    label {
      display: block;
      position: relative;
      width: @csize;
      height: @csize;
      cursor: pointer;
      font-size: 22px;
      user-select: none;
      margin: auto;
      margin-right: 10px;

      span {
        position: absolute;
        top: 0;
        left: 0;
        height: @csize;
        width: @csize;

        border: 2px solid .colors() [text];
        border-radius: 100%;

        &:hover {
          border-color: .colors() [text-hover];
        }

        &:active {
          border-color: .colors() [text-click];
        }
      }

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked ~ span {
          border: none;
          &:after {
            content: "🗸";
            height: 100%;
            font-size: @csize;
            display: block;
            line-height: @csize - 2;
            padding-left: 3px;
          }
        }
      }
    }

    .message {
      margin: 0;
      line-height: @size;
    }
  }
}
.buttons {
  display: flex;
  button {
    margin: 0 0.2em;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    height: auto;

    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-width: 2px;
    line-height: @size - 2 * $padding - 2 * $border-width;
    font-size: @size - 2 * $padding - 2 * $border-width;

    color: .colors() [primary];

    background: linear-gradient(.colors() [BG-plus], .colors() [BG-plus])
        padding-box,
      linear-gradient(to right, .colors() [primary], .colors() [primary-hover])
        border-box;
    border: 2px solid transparent;

    &:hover {
      background: linear-gradient(.colors() [BG-plus], .colors() [BG-plus])
          padding-box,
        linear-gradient(
            to right,
            .colors() [primary-hover],
            .colors() [primary-click]
          )
          border-box;
    }

    &:active {
      background: linear-gradient(.colors() [BG-plus], .colors() [BG-plus])
          padding-box,
        .colors() [primary-click] border-box;
    }

    &.primary {
      border: none;
      background: linear-gradient(
        to right,
        .colors() [primary],
        .colors() [primary-hover]
      );
      color: .colors() [text];

      &:hover {
        background: linear-gradient(
          to right,
          .colors() [primary-hover],
          .colors() [primary-click]
        );
      }

      &:active {
        box-shadow: inset 1px 1px 3px 0px .colors() [primary-click];
      }
    }
  }
}
</style>
