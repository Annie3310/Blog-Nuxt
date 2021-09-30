<template>
  <div>
    <HomePage :labels-list="labelsList" :articles-list="articlesList"></HomePage>
  </div>
</template>

<script>
import HomePage from "../../../components/HomePage";

export default {
  name: "_id",
  components: {
    HomePage
  },
  data() {
    return {
      articlesList: [],
      labelsList: [],
      label: []
    }
  },
  async asyncData({$axios, params, store}) {
    let articles = await($axios.$get(store.state.api.listBlogsByLabel + params.id));
    let labels = await ($axios.$get(store.state.api.listLabels));
    let label = await ($axios.$get(store.state.api.getLabel + params.id))
    articles.result.forEach(item => {
      let time = new Date(item.createdAt)
      item.createdAt = time.getFullYear() + ' 年 ' + (time.getMonth() + 1) + ' 月 ' + time.getDate() + ' 日 '
    })
    return {
      articlesList: articles.result,
      labelsList: labels.result,
      label: label.result
    }
  },
  created() {
    console.log(this.label)
  },
  head() {
    return {
      title: this.label.name
    }
  }
}
</script>
