<template>
  <div class="home">
    <header>
      <HomePageHeader></HomePageHeader>
    </header>

    <main id="blogs-list-main">
      <ArticlesList :label-id="labelId"></ArticlesList>
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
import api from "assets/api/getBlogs";
import NavigationBar from "/components/NavigationBar";
import HomePageHeader from "/components/HomePageHeader";
import ArticlesList from "/components/ArticlesList";

export default {
  name: "index",
  components: {ArticlesList, HomePageHeader, NavigationBar},
  data() {
    return {
      articleList: [],
      labelId: undefined,
      title: undefined,
    }
  },
  created() {
    this.labelId = this.$route.params.labelId;
    this.title = this.$route.params.title;
  },
  mounted() {
    if (this.title == undefined) {
      document.title = this.$store.state.homeInformation.slogan
    } else {
      document.title = this.title
    }
    let _this = this
    let allOpenedBlogs = api.getAllOpenedBlogs(0);
    allOpenedBlogs.then(res => {
      let result = res.data.result;
      result.forEach(item => {
        let article = {
          title: item.title,
          body: item.body,
          createdAt: item.createdAt,
          number: item.number,
          labels: []
        }
        item.labels.forEach((item) => {
          let label = {
            id: item.id,
            name: item.name,
            color: item.color,
            description: item.description,
            fontColor: item.fontColor
          }
          article.labels.push(label)
        })
        let time = new Date(article.createdAt)
        article.createdAt = time.getFullYear() + ' 年 ' + (time.getMonth() + 1) + ' 月 ' + time.getDate() + ' 日 '
        _this.articleList.push(article)
      })
      this.$store.commit('switchHomeLoadingStateToFalse');
      if (this.labelId != undefined) {
        this.$el.querySelector('#blogs-list-main').scrollIntoView({
          // 平滑过渡
          behavior: "smooth",
          // 上边框与视窗顶部平齐。默认值
          block: "start"
        })
      }
    })
  },
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
