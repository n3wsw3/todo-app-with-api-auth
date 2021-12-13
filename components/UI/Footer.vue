<template>
  <div class="footer">
    <svg
      class="footer-wave"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill-opacity="1"
        d="M0,224L17.1,213.3C34.3,203,69,181,103,192C137.1,203,171,245,206,261.3C240,277,274,267,309,272C342.9,277,377,299,411,304C445.7,309,480,299,514,245.3C548.6,192,583,96,617,96C651.4,96,686,192,720,224C754.3,256,789,224,823,176C857.1,128,891,64,926,69.3C960,75,994,149,1029,197.3C1062.9,245,1097,267,1131,234.7C1165.7,203,1200,117,1234,90.7C1268.6,64,1303,96,1337,117.3C1371.4,139,1406,149,1423,154.7L1440,160L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"
      ></path>
    </svg>
    <div class="socialmedia center">
      <a href="#" class="fa fa-facebook"></a>
      <a href="#" class="fa fa-twitter"></a>
      <a href="#" class="fa fa-google"></a>
      <a href="#" class="fa fa-instagram"></a>
      <a href="#" class="fa fa-skype"></a>
      <a href="#" class="fa fa-vine"></a>
      <a href="#" class="fa fa-reddit"></a>
      <a href="#" class="fa fa-rss"></a>
    </div>
    <div>
      <h3 class="center">
        <i class="fa fa-copyright"></i> Soilless Data Solutions
      </h3>
    </div>
  </div>
</template>

<style lang="less">
@import "assets/definitions.less";
.footer {
  background: linear-gradient(135deg, #bb86fc 35%, #00dac6);

  .footer-wave {
    height: 100px;
    width: 100%;
    display: block;
    transform: scaleY(-1);

    path {
      fill: .colors() [BG];
    }
  }

  padding-bottom: 3em;
}

.center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.socialmedia {
  padding-top: 1em;
  > a {
    margin: 0.2em;
  }
}

.fa {
  font-size: 25px !important;
  width: 1.5em;
  height: 1.5em;
  line-height: 1.5em !important;
  text-align: center;
  text-decoration: none;
  border-radius: 100%;

  /* Add a hover effect if you want */
  &:hover {
    opacity: 0.7;
  }
}
/* Set a specific color for each brand */
.fa-facebook {
  background: #3b5998;
  color: white;
}
.fa-twitter {
  background: #55acee;
  color: white;
}
.fa-google {
  background: #dd4b39;
  color: white;
}
.fa-instagram {
  background: #125688;
  color: white;
}
.fa-skype {
  background: #00aff0;
  color: white;
}
.fa-vine {
  background: #00b489;
  color: white;
}
.fa-reddit {
  background: #ff5700;
  color: white;
}
.fa-rss {
  background: #ff6600;
  color: white;
}
</style>
