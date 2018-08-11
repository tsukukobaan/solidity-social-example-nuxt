<template>
<div class="post">
  <div>{{post.text}}</div>
  <small>記録アドレス{{post.owner}}</small>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Post',
  props: ['post'],
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
