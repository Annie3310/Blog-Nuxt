import {state} from '/store/index'
import axios from '@nuxtjs/axios'
const test = {
  test() {
    console.warn(state().api.getBlog)
  },
  getAllOpenedBlogs: async function (page) {

    // return await (axios.get("https://wxyzcloud.xyz/api/blog/spa/list/blogs?page=" + page))
  },

}
export default test
