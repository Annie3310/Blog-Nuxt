import axios from 'axios'
import {state} from "../../store";
// axios.defaults.headers['Accept'] = this.$store.state.api.headers.accept
// axios.defaults.headers['Authorization'] = this.$store.state.api.headers.token

const api = {
  getAllOpenedBlogs: function (page) {
    return axios.get(
      state().api.getAllOpenedBlogs + '?page=' + page
    )
  },
  getBlog: function (id) {
    return axios.get(
      state().api.getBlog + id
    )
  },
  listBlogsByLabel: function (id, page) {
    return axios.get(
      state().api.listBlogsByLabel + id + '?page=' + page
    )
  },
  listLabels: function () {
    return axios.get(
      state().api.listLabels
    )
  }
}

export default api

