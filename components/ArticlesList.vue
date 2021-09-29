<template>
  <div class="articles-list-page">
    <main>
      <a-col :xs="2" :sm="4" :md="4" :lg="4" :xl="6"></a-col>
      <a-col :xs="20" :sm="16" :md="16" :lg="16" :xl="12">
        <div class="home-block">
          <a-collapse :bordered="false">
            <a-collapse-panel key="1" header="标签" id="article-list-tag-outer">
              <a-popover
                  v-for="label in this.labelsList"
                  :key="label.id"
              >
                <template slot="content">
                  {{ label.description }}
                </template>
                <a>
                  <a-tag
                      :color="label.color"
                      :style="{'color': label.fontColor,'margin-bottom': '2ch'}"
                      :key="label.id"
                      @click="toBlogList(label.id, label.name)"
                  >
                    {{ label.name }}
                  </a-tag>
                </a>
              </a-popover>
            </a-collapse-panel>
          </a-collapse>
          <div style="text-align: center">
            <div class="article-list-card" v-for="item in articleList">
              <div class="article-meta">
                <a>
                  <h2 class="article-title" style="text-align: center" @click="toArticle(item.number)"><b>{{
                      item.title
                    }}</b></h2>
                  <p class="article-create-time" style="text-align: center;color: black"
                     @click="toArticle(item.number)">
                    {{ item.createdAt }}</p>
                  <div class="labels">
                    <a>
                      <a-tag
                          :color="label.color"
                          :style="{color: label.fontColor}"
                          v-for="label in item.labels"
                          :key="item.name"
                          @click="toBlogList(label.id,label.name)">
                        {{ label.name }}
                      </a-tag>
                    </a>
                  </div>

                  <p class="article-content"></p>
                </a>
              </div>
            </div>
            <a-button id="article-list-page-load-more-button" @click="loadMore">加载更多</a-button>
          </div>
        </div>
      </a-col>
      <a-col :xs="2" :sm="4" :md="4" :lg="4" :xl="6"></a-col>
    </main>
  </div>
</template>

<script>
import api from "assets/api/getBlogs";
import 'gitalk/dist/gitalk.css'

export default {
  name: "ArticlesList",
  props: ['labelId'],
  data() {
    return {
      articleList: [],
      labelsList: []
    }
  },
  watch: {
    '$route'(to, from) {
      this.$router.go(0);
    }
  },
  created() {
    console.warn('a')
    let _this = this
    let blogsList;
    if (this.labelId === undefined) {
      blogsList = api.getAllOpenedBlogs(0);
    } else {
      blogsList = api.listBlogsByLabel(this.labelId, 0)
    }

    blogsList.then(res => {
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
      this.$store.commit('switchHomeLoadingStateToFalse')
    })

    let promise = api.listLabels();
    promise.then(res => {
      let result = res.data.result;
      result.forEach(item => {
        _this.labelsList.push(item)
      })
    })
  },
  methods: {
    toArticle(id) {
      this.$router.push('/article/' + id);
    },
    toBlogList: function (id, title) {
      console.log(id,title)
      this.$router.push({name: 'index', params: {labelId: id, title: title}});
    },
    loadMore() {
      this.$store.commit('pageIncrement')
      this.$store.commit('switchHomeLoadingStateToTrue');
      let promise;
      if (this.labelId === undefined) {
        promise = api.getAllOpenedBlogs(this.$store.state.api.value.page);
      } else {
        promise = api.listBlogsByLabel(this.labelId, this.$store.state.api.value.page);
      }
      promise.then(res => {
        let _this = this;
        let result = res.data.result;
        console.log(result)
        if (result == null || result.length === 0) {
          this.$message.error('没有更多了');
          this.$store.commit('switchHomeLoadingStateToFalse');
          this.$store.commit('pageReset');
          return;
        }
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
          this.$store.commit('switchHomeLoadingStateToFalse')
        })
      })
    },
  }
}
</script>

<style scoped>

::-webkit-scrollbar {

  display: none; /* Chrome Safari */

}

.article-list-card {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20px;
  /*height: 120%;*/
}

.article-meta {
  /* 动画 */
  transition: all 0.2s ease 0s;

  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -8px -8px 16px -10px rgba(62, 80, 120, .10), 8px 8px 16px -10px rgba(62, 80, 120, .10);
  border-radius: 10px;

}

.article-meta:hover {
  /*动画*/
  transform: scale(1.1);
  transition: all 0.2s ease 0s;

}

.labels {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}

#article-list-page-load-more-button {
  margin-bottom: 20px;
}

#articles-list-tag-list {
  padding: 3ch;
  white-space: nowrap;
  overflow-x: scroll;
}

#article-list-tag-outer {
  background-color: #fff;
  /*border: 1px solid black;*/
  border-radius: 10px;
  box-shadow: -8px -8px 16px -10px rgba(62, 80, 120, .10), 8px 8px 16px -10px rgba(62, 80, 120, .10);
  margin-bottom: 3ch;
}
</style>
