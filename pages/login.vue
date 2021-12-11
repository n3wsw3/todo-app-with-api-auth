<template>
  <div>
    <div
      class="container"
      id="container"
      :class="{ 'right-panel-active': rightPanelActive }"
    >
      <div class="form-container sign-up-container">
        <form action="#" @submit.prevent="register()">
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" v-model="name" />
          <input type="email" placeholder="Email" v-model="username" />
          <input type="password" placeholder="Password" v-model="password" />
          <button>Register</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#" @submit.prevent="login()">
          <h1>Sign in</h1>
          <input type="email" placeholder="Email" v-model="username" />
          <input type="password" placeholder="Password" v-model="password" />
          <!-- <a href="#">Forgot your password?</a> -->
          <RouterLink to="/forgot">Forgot your password?</RouterLink>
          <button>Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              The data you are giving us is valuable to the CCPs fight for
              <s>obedience</s> freedom.
            </p>
            <button
              class="ghost"
              id="signIn"
              @click="rightPanelActive = !rightPanelActive"
            >
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Stranger!</h1>
            <p>
              We are not GDPR compliant and we sell your data to the Russian
              Government and the CCP. <br />Please give us your info.
            </p>
            <button
              class="ghost"
              id="signUp"
              @click="rightPanelActive = !rightPanelActive"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const name = ref("");
const username = ref("");
const password = ref("");
const router = useRouter();
/**
 * Fuck error messages.
 * Keep 'em, but don't show 'em.
 */
const error = ref("");
import auth from "../utility/auth";

const rightPanelActive = ref(false);

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

const register = async () => {
  await $fetch<{ user: User; token: Token }>("/api/v1/auth/register", {
    method: "POST",
    body: {
      name: name.value,
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

<style lang="less" scoped>
@import "../assets/definitions.less";

// Copy pasted from the internet
// With modifications to color and things like that

h1 {
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.2em;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: .colors() [text-accent];
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid .colors() [second];
  background-color: .colors() [second];
  color: .colors() [text];
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }

  &.ghost {
    background-color: transparent;
    border-color: .colors() [text];
  }
}

form {
  background-color: .colors() [BG-plus];
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: .colors() [BG-plus-light];
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 5px;
  color: inherit;
}

.container {
  background-color: .colors() [BG-plus];
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  margin: 6em auto;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
  button {
    border: 1px solid .colors() [primary];
    background-color: .colors() [primary];
  }
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  button {
    border: 1px solid .colors() [second];
    background-color: .colors() [second];
  }
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: .colors() [primary];
  background: linear-gradient(
    to right,
    .colors() [second],
    .colors() [primary]
  );
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: .colors() [text];
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
</style>
