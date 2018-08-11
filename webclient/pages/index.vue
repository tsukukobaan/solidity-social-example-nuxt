<template>
  <div className="container">
    <h5>
      <label>よくわからんアドレス: {{this.$store.state.user}}</label>
    </h5>
    <div class="form-box">
      <text-form></text-form>
    </div>
    <h3>保存されたツイート(黒歴史)</h3>
    <div class="content-box">
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
  }
}
</script>

<style>
.container {
  width: 100%;
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

h5 {
  margin: 20px auto;
}

h5 label {
  width: 100%;
  text-align: center;
}

h3 {
  width: 80%;
  margin: 20px auto;
}

.form-box {
  width: 80%;
  margin: auto;
  border: 1px solid #CECECE;
  border-radius: 5px;
  padding: 10px;
}

.content-box {
  width: 80%;
  margin: 10px auto;
  border: 1px solid #CECECE;
  border-radius: 5px;
  padding: 10px;
}
</style>

