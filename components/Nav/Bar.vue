<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <ClientOnly>
      <template v-if="auth">
        <RouterLink to="/todo">Todos</RouterLink>
        <RouterLink to="/logout">Logout</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/login">Login or Register</RouterLink>
        <!-- <RouterLink to="/register">Register</RouterLink> -->
      </template>
    </ClientOnly>
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
  justify-content: center;
  a {
    padding: 0.5em 1em;
    margin: 0 0.5em;
    color: .colors() [primary];
    text-decoration: none;
    position: relative;

    &:visited {
      color: .colors() [primary];
    }

    &:hover {
      color: .colors() [primary-hover];
    }

    &:active {
      color: .colors() [primary-click];
    }

    &.router-link-active {
      &:before {
        content: "";
        position: absolute;

        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;

        background-color: .colors() [primary];
      }
    }
  }
}
</style>
