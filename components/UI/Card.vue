<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style lang="less">
@import "assets/definitions.less";
.card {
  background-color: .colors() [BG-plus];
  box-shadow: 2px 3px 4px 0px rgb(0 0 0 / 25%), 2px 2px 9px 2px rgb(0 0 0 / 22%);
  border-radius: 20px;
  flex: 1;
  padding: 1em;
  margin: 0.5em;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
