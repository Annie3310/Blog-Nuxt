<template>
  <div class="navigation-bar">
    <a-space size="large">
      <nuxt-link to="/" class="navigation-menu">首页</nuxt-link>
      <span>/</span>
      <nuxt-link to="/about"  class="navigation-menu">关于</nuxt-link>
    </a-space>

  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  methods: {
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
