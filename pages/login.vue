<template>
  <div>
    <div v-if="error">
      <span>{{ error }}</span>
    </div>
    <div>
      <label for="username">Email: </label>
      <input type="text" name="username" id="username" v-model="username" />
    </div>
    <div>
      <label for="password">Password: </label>
      <input type="password" name="password" id="password" v-model="password" />
    </div>
    <input type="button" @click="login" value="Login" />
  </div>
</template>

<script lang="ts" setup>
const username = ref("");
const password = ref("");
const router = useRouter();
const error = ref("");
const auth = useAuth();

const login = async () => {
  await $fetch<{ user: User; token: Token }>("/api/v1/auth/login", {
    method: "POST",
    body: {
      email: username.value,
      password: password.value,
    },
  })
    .then((resp) => {
      localStorage.setItem("auth_token", resp.token.token);
      auth.value = resp.token.token;
      router.push("/todo");
    })
    .catch((err) => {
      error.value = err.data;
    });
};
</script>
