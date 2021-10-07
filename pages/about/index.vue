<template>
  <div>
    <ArticlePage :article="article"></ArticlePage>
  </div>
</template>

<script>
import ArticlePage from '/components/ArticlePage';

export default {
  name: "index",
  components: {
    ArticlePage
  },
  data() {
    return {
      article: {},
      metaData: {
        title: ''
      }
    }
  },
  asyncData({$axios, store}) {
    return $axios.$get(store.state.api.getBlog + '11').then(res => {
      let article = res.result;
      let time = new Date(res.result.createdAt)
      article.createdAt = time.getFullYear() + ' 年 ' + (time.getMonth() + 1) + ' 月 ' + time.getDate() + ' 日 '
      let meta = {
        title: res.result.title
      }
      return {
        article: article,
        metaData: meta
      }
    })
  },
  head() {
    return {
      title: this.metaData.title,
      meta: [
        {hid: 'about', name: 'description', content: 'About me'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
