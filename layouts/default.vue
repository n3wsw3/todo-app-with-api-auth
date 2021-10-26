<template>
  <div class="main-wrapper">
    <nav>
      Navbar template
    </nav>
    <h1>This is a demo Application</h1>
    <slot></slot>
  </div>
</template>

<style lang="less">
@import "assets/definitions.less";

body {
  margin: 0;
  padding: 0;

  background-color: .colors()[BG];
}

.main-wrapper {
  max-width: 1200px;
  margin: 0 auto;

  nav {
    height: 50px;
  }

  h1 {
    color: .colors()[text];
  }
}
</style>
