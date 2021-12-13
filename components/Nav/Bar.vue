<template>
  <nav class="main-wrapper">
    <RouterLink to="/" class="logo">Todo App</RouterLink>
    <div>
      <ClientOnly v-if="auth">
        <RouterLink to="/todo">Todos</RouterLink>
      </ClientOnly>
    </div>
    <div>
      <ClientOnly>
        <template v-if="auth">
          <RouterLink to="/logout">Logout</RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/login" class="outline">Login</RouterLink>
        </template>
      </ClientOnly>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import auth from "../../utility/auth";
</script>

<style lang="less" scoped>
@import "assets/definitions.less";

nav {
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  font-size: 1.3em;
  font-weight: 500;
  padding-bottom: 1.5em;
  > div {
    display: flex;
  }

  a {
    padding: 0.3em 0.7em;
    margin: 0 0.5em;
    color: .colors() [text];
    text-decoration: none;
    position: relative;

    &:visited {
      color: .colors() [text];
    }

    &:hover {
      cursor: pointer;
    }

    &:active {
      color: .colors() [text-hover];
    }

    &.outline {
      border: 2px solid .colors() [text];
      border-radius: 10px;

      &:active {
        border: 2px solid .colors() [text-hover];
      }
    }

    &.logo {
      font-size: 1.3em;
    }
  }
}
</style>
