<template>
  <div>
    {{ word }}
  </div>
</template>

<script>
import axios from 'axios'
import test from "assets/api/test";

export default {
  name: "index.vue",
  data() {
    return {
      word: []
    }
  },
  async asyncData({$axios}) {
    let word = await ($axios.$get("https://wxyzcloud.xyz/api/blog/spa/list/blogs"))
    console.log('asyncData',word)
    // let word = test.getAllOpenedBlogs(0)
    return {
      word: word.result
    }
  },
  // created() {
  //   let allOpenedBlogs = test.getAllOpenedBlogs(0);
  //   console.log(allOpenedBlogs)
  // }
}
</script>

<style scoped>

</style>
