<template>
  <NuxtLayout name="default">
    <template #hero>
      <div class="main-wrapper">
        <div class="hero-text">
          <h1>The last todo app <span>you'll need.</span></h1>
          <p>
            A website catered for your needs with the highest security and
            professionalism in mind.
          </p>
        </div>
      </div>
      <svg
        class="hero-bottom"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill-opacity="1"
          d="M0,224L17.1,213.3C34.3,203,69,181,103,192C137.1,203,171,245,206,261.3C240,277,274,267,309,272C342.9,277,377,299,411,304C445.7,309,480,299,514,245.3C548.6,192,583,96,617,96C651.4,96,686,192,720,224C754.3,256,789,224,823,176C857.1,128,891,64,926,69.3C960,75,994,149,1029,197.3C1062.9,245,1097,267,1131,234.7C1165.7,203,1200,117,1234,90.7C1268.6,64,1303,96,1337,117.3C1371.4,139,1406,149,1423,154.7L1440,160L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"
        ></path>
      </svg>
    </template>
    <div class="spacing">
      <h1 class="center">We help you excel at your work</h1>
      <p class="smol center">
        We're not the solution you want, but the solution you need. The days of
        the past will seem as a horror story after you've used the <b>best</b>.
      </p>
      <p class="smol center">
        Register for <b>free</b> at
        <RouterLink to="/login" class="n3 primary">Register</RouterLink>
      </p>
    </div>
    <div class="split spacing">
      <div>
        <h1>Adapting your workflow</h1>
        <p>
          Starting to use todos in your professional work can be a challenge
        </p>
        <p>
          But, with our streamlined process even the most <b>stupid</b> or
          <b>incompetent</b>
          coworker can reach the stars.
        </p>
      </div>
      <div>
        <img src="@/assets/adapting.png" alt="" />
      </div>
    </div>
    <div class="spacing">
      <h1 class="center">What we do best</h1>
      <div class="cards">
        <UICard>
          <img src="@/assets/hashing_graphic.webp" alt="" />
          <h2>Password Hashing Strategy</h2>
          <p>
            Our password hashing strategy has been especially made to adhere to
            the highest of security standards.
          </p>
        </UICard>
        <UICard>
          <img src="@/assets/cicd.png" alt="" />
          <h2>Continuous Integration and Continuous Delivery</h2>
          <p>
            Our automated systems guarantee swift and precise delivery, allowing
            for uninterrupted todoing.
          </p>
        </UICard>
        <UICard>
          <img src="@/assets/webdev.png" alt="" />
          <h2>Maintainable and High Standards</h2>
          <p>
            Todo App is created using the most forefront technologies and by the
            most educated software architects in the world.
          </p>
        </UICard>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
export default {
  layout: "",
};
</script>

<script lang="ts" setup>
let counter = ref(0);
const increase = () => counter.value++;
</script>

<style lang="less" scoped>
@import "assets/definitions.less";
.hero-text {
  padding: 5em;
  padding-top: 2em;

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }

  h1 {
    text-align: center;
    font-size: 2.7em;
    font-weight: 500;
    text-shadow: 3px 3px 12px .colors() [text-accent-click];

    span {
      font-weight: 200;
    }
  }
  p {
    font-size: 1.4em;
    font-weight: 500;
    text-align: center;
    max-width: 550px;
    margin: auto;

    text-shadow: 3px 3px 12px .colors() [text-accent-click];
  }
}
.hero-bottom {
  height: 100px;
}
.cards {
  display: flex;
}
.split {
  display: flex;
  > div {
    margin: 0.5em;
    padding: 1em;
    > img {
      width: 100%;
      height: auto;
    }
  }
}
.center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.smol {
  width: 660px;
}

.spacing {
  margin: 4em 0;
}

// h2 {
//   font-size: 1.3em;
// }
</style>
