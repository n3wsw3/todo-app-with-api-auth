<template>
  <div>
    <UICircle class="accent"></UICircle>
    <UICircle class="subtle"></UICircle>
    <UICircle class="BG"></UICircle>
    <UICircle class="BG-plus"></UICircle>
    <UICircle class="text"></UICircle>
  </div>
  <div>
    <UICircle class="accent hover"></UICircle>
    <UICircle class="subtle hover"></UICircle>
    <UICircle class="BG hover"></UICircle>
    <UICircle class="BG-plus hover"></UICircle>
    <UICircle class="text hover"></UICircle>
  </div>
  <div>
    <UICircle class="accent active"></UICircle>
    <UICircle class="subtle active"></UICircle>
    <UICircle class="BG active"></UICircle>
    <UICircle class="BG-plus active"></UICircle>
    <UICircle class="text active"></UICircle>
  </div>
</template>

<style lang="less">
@import "../assets/definitions.less";

.circle {
  margin: 10px;
  color: white;
}

.accent {
  background-color: .colors() [second];

  &.hover {
    background-color: .colors() [second-hover];
  }

  &.active {
    background-color: .colors() [second-click];
  }
}

.subtle {
  background-color: .colors() [primary];

  &.hover {
    background-color: .colors() [primary-hover];
  }

  &.active {
    background-color: .colors() [primary-click];
  }
}

.BG {
  background-color: .colors() [BG];

  &.hover {
    background-color: .colors() [BG-hover];
  }

  &.active {
    background-color: .colors() [BG-click];
  }
}

.BG-plus {
  background-color: .colors() [BG-plus];

  &.hover {
    background-color: .colors() [BG-plus-hover];
  }

  &.active {
    background-color: .colors() [BG-plus-click];
  }
}

.text {
  background-color: .colors() [text];

  &.hover {
    background-color: .colors() [text-hover];
  }

  &.active {
    background-color: .colors() [text-click];
  }
}
</style>
