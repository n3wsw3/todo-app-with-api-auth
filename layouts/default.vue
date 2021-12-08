<template>
  <div class="main-wrapper">
    <nav>Navbar template</nav>
    <h1>This is a demo Application</h1>
    <slot></slot>
  </div>
</template>

<style lang="less">
@import "assets/definitions.less";

* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

body {
  margin: 0;
  padding: 0;

  background-color: .colors() [BG];
  box-sizing: border-box;
}

.main-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.5em;

  nav {
    height: 50px;
  }

  h1 {
    color: .colors() [text];
  }
}
</style>
