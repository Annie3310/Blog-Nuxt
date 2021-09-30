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
      let meta = {
        title: res.result.title
      }
      return {
        article: res.result,
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
