import Vue from 'vue'
import Vuex from 'vuex'
import { getIndexed } from './indexer_client'
import Contract from './contract'

Vue.use(Vuex)

export const state = () => ({
  contract: null,
  posts: [],
  user: null,
  ready: false,
  interval: null
})

export const mutations = {
  setContract (state, payload) {
    state.contract = payload
  },
  setPosts (state, payload) {
    state.posts = payload
  },
  setUser (state, payload) {
    state.user = payload
  },
  setReady (state, payload) {
    state.ready = payload
  },
  setIntervalObj (state, payload) {
    state.interval = payload
  }
}

export const actions = {
  async initContract ({commit}) {
    const contract = await new Contract()
    commit('setContract', contract)
    return contract
  },
  async initialize ({state, commit, dispatch}, contract) {
    console.log('intialize start')
    console.log(state)
    await contract.start()
    commit('setUser', contract.getUser())
    commit('setIntervalObj',
      setInterval(() => {
        dispatch('updatePostsAndComments')
      }, 1000)
    )
  },
  async updatePostsAndComments({commit}) {
    let posts = []
    try {
      posts = await getIndexed('posts')
    } catch(err) {
      console.error('Cannot retrieve posts, maybe no post exists yet')
    }

    let comments = []
    try {
      comments = await getIndexed('comments')
    } catch(err) {
      console.warn('No comments')
    }

    posts = posts.map(post => {
      comments.forEach(comment => {
        if (post.postId == comment.postId) {
          post.comments = post.comments || []
          post.comments = post.comments.sort((a, b) => +a.commentId < +b.commentId)
          post.comments.push(comment)
        }
      })
      return post
    })

    posts = posts.sort((a, b) => +a.postId < +b.postId)
    commit('setPosts', posts)
  },
  async newPost({state}, text) {
    const tx = await state.contract.newPost(text)
    console.log('New Post Sent', tx, text)
  },
  async sendComment({state}, payload) {
    console.log('sendComment')
    const tx = await state.contract.newComment(payload.postId, payload.comment)
    console.log('New Comment Sent', tx, text)
  },
  async getPosts({state},payload){
    console.log('Get Posts')
    const tx = await state.contract.getPosts(payload.postId,payload.comment)
  }
}
