<template>
  <div class="main-wrapper">
    <Html lang="en">
      <Head>
        <Title>Todo Application</Title>
        <Meta name="description" content="Website used for managing todos" />
      </Head>
    </Html>
    <NavBar />
    <slot></slot>
  </div>
</template>

<style lang="less">
@import "assets/definitions.less";

* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;

  background-color: .colors() [BG];
  box-sizing: border-box;
  color: .colors() [text];
}

.main-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.5em;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 1.5em;
  letter-spacing: 0.5px;
}
</style>
