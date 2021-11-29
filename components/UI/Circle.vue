<template>
  <div class="circle">
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<style lang="less" scoped>
.circle {
  border-radius: 100%;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: inline-block;

  line-height: 100%;
  text-align: center;
  p {
    display: inline-block;
    line-height: normal;
  }
}
</style>
