<template>
  <div class="article-page">
    <a-row>
      <a-col :xs="1" :sm="2" :md="4" :lg="4" :xl="4"></a-col>
      <a-col :xs="22" :sm="20" :md="16" :lg="16" :xl="16">
        <header>
        </header>
        <main>
          <!--          文章主体-->
          <article>
            <div class="article-page-container">

              <div id="article-wrap">
                <div>
                  <NavigationBar style="display: inline-block;margin-top: 30px;margin-bottom: 2ch"></NavigationBar>
                </div>
                <div class="">

                  <h1 style="" id="article-page-title">{{ article.title }}</h1>
                  <p id="article-page-date">{{ article.createdAt }}</p>
                  <div v-html="article.body" class="article-page-body prose" id="article-page-body"></div>
                  <!--                文章编号是否为空-->
                  <a-empty :description="false" v-if="isArticleEmpty"/>

                </div>
              </div>

              <div class="toc-outer">
                <!--          目录-->
                <ul>
                  <aside class="aside article-page-toc" id="article-page-toc" v-html="article.toc"
                         @click="scroll($event)"></aside>
                </ul>
              </div>


            </div>
          </article>
        </main>
        <a-divider>评论</a-divider>
        <footer>
          <div id="gitalk-container" v-if="commentVisible"></div>
          <a-back-top>
            <div class="back-top-inner">
              <a-icon type="up"/>
            </div>
          </a-back-top>
        </footer>
      </a-col>
      <a-col :xs="1" :sm="2" :md="4" :lg="4" :xl="4"></a-col>

    </a-row>
  </div>
</template>

<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import NavigationBar from "/components/NavigationBarWithBackButton";
import HomePageHeader from "/components/HomePageHeader";

export default {
  name: "ArticlePage",
  props: {
    article: {}
  },
  components: {
    HomePageHeader,
    NavigationBar,
    Gitalk
  },
  data() {
    return {
      gitalk: new Gitalk({
        clientID: this.$store.state.homeInformation.gitalk.clientID,
        clientSecret: this.$store.state.homeInformation.gitalk.clientSecret,
        repo: this.$store.state.homeInformation.gitalk.repo,
        owner: this.$store.state.homeInformation.gitalk.owner,
        admin: this.$store.state.homeInformation.gitalk.admin,
        // Ensure uniqueness and length less than 50
        id: this.$store.state.homeInformation.gitalk.id + this.$route.path,
        // Facebook-like distraction free mode
        distractionFreeMode: false
      }),
      isArticleEmpty: false,
      commentVisible: true,
    }
  },
  mounted() {
    this.gitalk.render('gitalk-container');
  },

  methods: {
    back() {
      //返回上一层
      this.$router.go(-1);
    },
    scroll(event) {
      let hash = event.target.parentElement.getAttribute('anchor');
      if (hash == null) {
        return
      }
      this.$el.querySelector(hash).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    },
  }
}
</script>

<style scoped>

.prose {
  max-width: 100%;
}

.prose >>> li {
  list-style-type: none;
}

.prose >>> pre {
  white-space: pre-wrap;
}

article {
  display: flex;
  justify-content: center;
  width: 100%;
}


main {
  display: flex;
  justify-content: center;
}

.article-page-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 5%;
}

.toc-outer {
  width: 20%;
}

.article-page-toc {
  width: auto;
  border-left: 5px solid #414e78;
  border-radius: 5px;
  align-self: flex-start;
  padding-left: 5px;
  margin-left: 2%;
  position: fixed;
}

.markdown-body >>> pre {
  white-space: pre-wrap;
}

.article-page-toc >>> .toc-title {
  font-size: medium;
  margin-bottom: 5px;
  color: black;
}

.article-page-toc >>> a {
  display: block;
  /*margin-bottom: 5%;*/
  color: black;
  list-style-type: none;
}

.article-page-toc >>> a:hover {
  background-color: rgba(65, 78, 120, 0.2);
  border-radius: 2px;
}

.article-page-toc >>> .toc-h1 {

}


.article-page-toc >>> .toc-h1 > li {
  font-weight: bold;
  font-size: large;
  /*margin-bottom: 5%;*/
}

.article-page-toc >>> .toc-h2 > li {
  list-style-type: disc;
  font-weight: bold;
  font-size: medium;
  margin-left: 20px;
  /*margin-bottom: 5%;*/
}

.article-page-toc >>> .toc-h3 > li {
  list-style-type: circle;
  margin-left: 35px;
  /*margin-bottom: 2%;*/
}

.article-page-toc >>> .toc-h4 > li {
  list-style-type: square;
  font-size: small;
  margin-left: 50px;
  /*margin-bottom: 2%;*/
}

.article-page-toc >>> .toc-h5 > li {
  font-size: small;
  margin-left: 65px;
  /*margin-bottom: 2%;*/
}

.article-page-toc >>> .toc-h6 > li {
  font-size: small;
  margin-left: 80px;
}

.article-page-toc >>> .toc-h2 {
  margin-bottom: 2%;

}

.article-page-toc >>> .toc-h3 {
  margin-bottom: 2%;

}

.article-page-toc >>> .toc-h4 {
  margin-bottom: 2%;

}

.article-page-toc >>> .toc-h5 {
  margin-bottom: 2%;

}

.article-page-toc >>> .toc-h6 {
  margin-bottom: 2%;

}

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

/*.markdown-body pre {*/
/*  max-width: 80vw*/
/*}*/

@media (max-width: 768px) {
  .aside {
    display: none;
  }

  .article-page-toc >>> * {
    font-size: small;
  }

  .toc-outer {
    display: none;
  }

}

#article-page-date {
  font-size: medium;
}

#article-page-title {
  border: 0px;
  margin-bottom: 0;
  font-size: 2.5rem;
}

#article-page-title img {
  width: 100%;
}


#article-wrap {
  width: 100%;
  padding: 0 20px 20px 20px ;
  border-radius: 10px;
  background-color: white;
  box-shadow: -8px -8px 16px -10px rgba(62, 80, 120, .15), 8px 8px 16px -10px rgba(62, 80, 120, .15);
}

.article-page {
  background-color: white;
}

body {
  background-color: #f4f5f5;
}

img {
  width: 100%;
}
</style>
<style>
img {
  width: 100%;
}
</style>
