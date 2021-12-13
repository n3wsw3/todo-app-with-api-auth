<template>
  <div class="outer">
    <Html lang="en">
      <Head>
        <Title>Todo Application</Title>
        <Meta name="description" content="Website used for managing todos" />
      </Head>
    </Html>
    <div class="hero">
      <NavBar />
      <slot name="hero"
        ><svg
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
      </slot>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="less">
@import "assets/definitions.less";

* {
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;

  background-color: .colors() [BG];
  box-sizing: border-box;
  color: .colors() [text];

  .outer {
    .hero {
      padding-top: 1.7em;
      background: linear-gradient(
        135deg,
        .colors() [primary] 35%,
        .colors() [second]
      );
    }
  }
}

.main-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 0.5em;
}

h1,
h2 {
  font-weight: 500;
}

p {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5em;
  letter-spacing: 0.5px;
}

.hero-bottom {
  display: block;
  height: 35px;
  width: 100%;
  path {
    fill: .colors() [BG];
  }
}
</style>
