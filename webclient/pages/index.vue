<template>
  <div className="container">
    <h5>
      <label>Hello: {{this.$store.state.user}}</label>
    </h5>
    <div>
      <text-form></text-form>
    </div>
    <div>
      <ul className="list-group" style={MT10}>
        <post 
          v-for="post in posts"
          v-bind:post="post"
          v-bind:key="post.postId">
        </post>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TextForm from '~/components/TextForm.vue'
import Post from '~/components/Post.vue'

export default {
  components: {
    TextForm,
    Post
  },
  async created () {
    try {
      const contract = await this.$store.dispatch('initContract')
      this.$store.dispatch('initialize', contract)
    } catch (error) {
      console.log(error)
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalHandler)
  },
  computed: {
    ...mapState({
      user: state => {
        return state.user
      },
      posts: state => {
        return state.posts
      }
    })
  },
  methods: {
    async newPost(text) {
      const tx = await this.contract.newPost(text)
      console.log('New Post Sent', tx, text)
    },
    async sendComment(postId, text) {
      const tx = await this.contract.newComment(postId, text)
      console.log('New Comment Sent', tx, text)
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

