<template>
  <div>
    <ArticlePage :article="article"></ArticlePage>
  </div>
</template>
<script>
import ArticlePage from "../../components/ArticlePage";

export default {
  name: 'article',
  components: {
    ArticlePage
  },
  data() {
    return {
      article: {}
    }
  },
  head() {
    return {
      title: this.article.title
    }
  },
  asyncData({ $axios, params, store}) {
    return $axios.$get(store.state.api.getBlog + params.id).then(res => {
      let article = res.result
      let time = new Date(res.result.createdAt)
      article.createdAt = time.getFullYear() + ' 年 ' + (time.getMonth() + 1) + ' 月 ' + time.getDate() + ' 日 '
      return {
        article: article
      }
    })

  }
}
</script>
