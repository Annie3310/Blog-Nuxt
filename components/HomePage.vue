<template>
  <div class="home">
    <header>
      <HomePageHeader></HomePageHeader>
    </header>

    <main id="blogs-list-main">
      <ArticlesList :articles-list="articlesList" :labels-list="labelsList"></ArticlesList>
    </main>

    <footer>
      <a-back-top>
        <div class="back-top-inner">
          <a-icon type="up"/>
        </div>
      </a-back-top>
    </footer>
  </div>
</template>

<script>
import NavigationBar from "/components/NavigationBar";
import HomePageHeader from "/components/HomePageHeader";
import ArticlesList from "/components/ArticlesList";

export default {
  name: "index",
  props: {
    articlesList: [],
    labelsList: []
  },
  components: {ArticlesList, HomePageHeader, NavigationBar},
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 50%;
  background-color: #3e5078;
  color: #fff;
  text-align: center;
  font-size: 20px;
}
</style>
