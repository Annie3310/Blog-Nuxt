<template>
  <div>
    <HomePage :labels-list="labelsList" :articles-list="articlesList"></HomePage>
  </div>
</template>

<script>
import HomePage from "../components/HomePage";

export default {
  name: "index",
  components: {
    HomePage,
  },
  async asyncData({$axios, store}) {
    let articles = await($axios.$get(store.state.api.getAllOpenedBlogs));
    let labels = await ($axios.$get(store.state.api.listLabels));
    articles.result.forEach(item => {
      let time = new Date(item.createdAt)
      item.createdAt = time.getFullYear() + ' 年 ' + (time.getMonth() + 1) + ' 月 ' + time.getDate() + ' 日 '
    })
    return {
      articlesList: articles.result,
      labelsList: labels.result
    }
  },
  data() {
    return {
      articlesList: [],
      labelsList: [],
    }
  },
  head() {
    return {
      title: this.$store.state.homeInformation.slogan
    }
  }
}
</script>
