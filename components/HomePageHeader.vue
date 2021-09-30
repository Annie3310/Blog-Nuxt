<template>
  <div class="home-header">
    <img class="avatar" :src="$store.state.homeInformation.avatar" alt="avatar"/>
    <br>
    <a-space size="large">
      <a-popover v-for="item in $store.state.homeInformation.contactCard" :key="item.address">
        <template slot="content"><p>{{ item.popover }}</p></template>
        <a :href="item.address" target="_blank">
          <span v-html="item.icon"></span>
        </a>
      </a-popover>
    </a-space>
    <br>
    <h1 style="margin-bottom: 30px"><strong>{{ $store.state.homeInformation.slogan }}</strong></h1>
    <br>

    <NavigationBar></NavigationBar>
    <a @click="toBottom">
      <div class="controller">
        <a-icon type="down" id="home-header-to-down"/>
      </div>
    </a>

    <div id="home-header-bottom"></div>
  </div>
</template>

<script>
/**
 * 向下指引 @see https://blog.csdn.net/weixin_42333548/article/details/103580281
 */
import NavigationBar from "/components/NavigationBar";
import smoothscroll from 'smoothscroll-polyfill';

export default {
  name: "HomePageHeader",
  components: {NavigationBar},
  mounted() {
    smoothscroll.polyfill()
  },
  methods: {
    toBottom() {
      this.$el.querySelector('#home-header-bottom').scrollIntoView({
        // 平滑过渡
        behavior: "smooth",
        // 上边框与视窗顶部平齐。默认值
        block: "start"
      })
    },
  }
}
</script>

<style scoped>
.home-header {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}

.avatar {
  height: 200px;
  width: 200px;
  border-radius: 50%;
}

.contact-icon {
  width: 20px;
}

#home-header-to-down {
  z-index: 100;
  margin-top: 6ch;
  -webkit-animation: bounce-down 1.6s linear infinite;
  animation: bounce-down 1.6s linear infinite;
  font-size: 20px;
  color: #595959;
}

@-webkit-keyframes bounce-down {
  25% {
    -webkit-transform: translateY(-4px);
  }
  50%, 100% {
    -webkit-transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(4px);
  }
}

@keyframes bounce-down {
  25% {
    transform: translateY(-4px);
  }
  50%, 100% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(4px);
  }
}

@media (max-width: 425px) {
  #home-header-to-down {
    margin-top: 3ch;
  }
}

</style>
