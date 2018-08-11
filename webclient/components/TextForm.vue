<template>
<div className="card">
  <div className="card-body">
    <form>
      <div className="form-group">
        <label >What's On Your Mind ? </label>
        <textarea className="form-control" rows="2" v-model="message"></textarea>
      </div>
      <b-button variant="primary" type="button" v-on:click="onClick()">New Post</b-button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'TextForm',
  data () {
    return {
      message: ""
    }
  },
  methods: {
    onClick () {
      console.log(this.message)
      return this.$store.dispatch('scrapeTwitter', this.message)
      // return this.$store.dispatch('newPost', this.message)
    }
  }
}
</script>

<style>

</style>
