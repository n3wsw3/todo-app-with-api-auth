<template>
  <div>Logging Out...</div>
</template>

<script lang="ts" setup>
import auth from "../utility/auth";
const router = useRouter();

onMounted(async () => {
  console.log(auth.value);
  await $fetch<Todo[]>("/api/v1/auth/logout", {
    method: "POST",
    headers: { authorization: auth.value },
  })
    .then((resp) => {
      localStorage.removeItem("auth_token");
      auth.value = "";
    })
    .catch((loggingOutError) => {
      console.error(loggingOutError);
    });
  router.push("/");
});
</script>
