export const state = () => ({
  api: {
    value: {
      // 主页请求 blog list 页码
      page: 0
    },

    getAllOpenedBlogs: 'https://wxyzcloud.xyz/api/blog/spa/list/blogs',
    // getAllOpenedBlogs: 'http://localhost:6002/spa/list/blogs',
    getBlog: 'https://wxyzcloud.xyz/api/blog/spa/get/blog/',

    listBlogsByLabel: 'https://wxyzcloud.xyz/api/blog/spa/list/blogs/label/',
    // listBlogsByLabel: 'http://localhost:6002/spa/list/blogs/label/',
    listLabels: 'https://wxyzcloud.xyz/api/blog/spa/list/labels',
  },
  // 主页信息
  homeInformation: {
    // 头像地址
    avatar: 'https://p.pstatp.com/origin/pgc-image/662bfdbe13ab40c0afd2d342da5a348f',
    // 联系方式
    /*
        popover: hover 浮动提示
        icon: 图标 html 代码，SVG 格式，如果使用 <img> 标签，需要加入 .contact-icon 属性
        address: 点击图标跳转地址
     */
    contactCard: [
      {
        // 浮动提示
        popover: 'wangjyi99@icloud.com',
        //
        icon: '<svg t="1632731141544" class="icon" viewBox="0 0 1024 1024"\n' +
          '                     xmlns="http://www.w3.org/2000/svg"\n' +
          '                     p-id="3529" width="25" height="25">\n' +
          '                    <path d="M810.666667 170.666667H213.333333a128 128 0 0 0-128 128v426.666666a128 128 0 0 0 128 128h597.333334a128 128 0 0 0 128-128V298.666667a128 128 0 0 0-128-128z m0 85.333333l-277.333334 190.72a42.666667 42.666667 0 0 1-42.666666 0L213.333333 256z"\n' +
          '                          p-id="3530"></path>\n' +
          '                </svg>',
        address: 'mailto:wangjyi99@icloud.com'
      },
      {
        popover: 'https://github.com/Annie3310',
        icon: '<svg t="1632731169403" class="icon" viewBox="0 0 1024 1024"\n' +
          '                     xmlns="http://www.w3.org/2000/svg"\n' +
          '                     p-id="4354" width="25" height="25">\n' +
          '                    <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"\n' +
          '                          p-id="4355"></path>\n' +
          '                </svg>',
        address: 'https://github.com/Annie3310'
      }
    ],
    slogan: '找点儿新东西',
    gitalk: {
      clientID: '30778e630b8bc1c3724a',
      clientSecret: '891863071f31a8cfa9d43cfd9e1633a9d2f7c072',
      repo: 'blog-comments',
      owner: 'Annie3310',
      admin: ['Annie3310'],
    }
  },
  loadingState: {
    // 主页 loading 图标显示状态
    home: true
  },
})

export const mutations = {
  pageIncrement(state) {
    state.api.value.page = state.api.value.page + 1;
  },
  pageReset(state) {
    state.api.value.page = 0;
  },
  switchHomeLoadingStateToTrue(state) {
    state.loadingState.home = true;
  },
  switchHomeLoadingStateToFalse(state) {
    console.log('  switchHomeLoadingStateToFalse(state)')
    state.loadingState.home = false;
  },
  test(state) {
    console.log('test', state)
  }
}

