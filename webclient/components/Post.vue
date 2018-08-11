<template>
<div class="post">
  <pre>{this.props.value.text}</pre>
  <small>user: {this.props.value.owner}</small>
  <div>
    <button type="button" className="btn btn-primary" v-on:click="newComment">New Comment</button>
  </div>
  <div>
    <ul className="list-group">
      <comment
        v-for="comment in comments"
        v-bind:data="comment"
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
  data () {
    return {
      comment: "What is the comment ?"
    }
  },
  computed: {
    comments () {
      return this.$store.state.posts[this.post.postId]
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
      if (this.comment && this.comment.length > 0 && this.comment === 'What is the comment ?') {
        this.$store.dispatch('sendComment', this.post.postId, comment)
      }
    }
  }
}
</script>

<style>

</style>
