<template>
  <div class="navigation-bar">
    <a-space :size="spaceSize">
      <a class="navigation-menu" style="border: 0" @click="back">< 返回</a>
      <span>/</span>
      <nuxt-link to="/" class="navigation-menu">首页</nuxt-link>
      <span>/</span>
      <nuxt-link to="/about" class="navigation-menu">关于</nuxt-link>
    </a-space>
  </div>
</template>

<script>
export default {
  name: "NavigationBarWithBackButton",
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  watch: {
    screenWidth: {
      handler: function (val) {
        if (val <= 768) {
          this.spaceSize = 8
        } else {
          this.spaceSize = 16
        }
      }
    }
  },
  mounted() {
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
    }
  },
  data() {
    return {
      screenWidth: undefined,
      spaceSize: 16
    }
  }
}
</script>

<style scoped>
.navigation-menu {
  border: 0;
  color: black;
  font-size: 16px;
  border-bottom: 1px solid black;
}

.navigation-bar {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
