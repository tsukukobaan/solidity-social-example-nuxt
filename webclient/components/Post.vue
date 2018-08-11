<template>
<div class="post">
  <pre>{{post.text}}</pre>
  <small>user: {{post.owner}}</small>
  <div>
    <b-button type="button" className="btn btn-primary" v-on:click="newComment">New Comment</b-button>
  </div>
  <div>
    <ul className="list-group">
      <comment
        v-for="comment in comments"
        v-bind:comment="comment"
        v-bind:key="comment.text">
      </comment>
    </ul>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Comment from './Comments'
export default {
  name: 'Post',
  components: {
    Comment
  },
  props: ['post'],
  computed: {
    comments () {
      console.log('comments')
      console.log(this.post)
      return this.post.comments
    },
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
    async newComment() {
      const comment = prompt("What is the comment ?")
      console.log(comment)
      if (comment && comment.length > 0) {
        console.log('dispatch send')
        console.log(comment)
        const payload = {
          postId: this.post.postId,
          comment: comment
        }
        this.$store.dispatch('sendComment', payload)
      }
    }
  }
}
</script>

<style>

</style>
