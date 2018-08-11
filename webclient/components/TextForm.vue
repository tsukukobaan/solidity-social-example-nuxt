<template>
<div className="card">
  <div className="card-body">
    <form>
      <div className="form-group">
        <div class="input-meessage">こんなツイートがあったよ！リンクを入れてね！</div>
        <input class="tweet-url-input" type="text" name="tweet-url" className="form-control" rows="2" v-model="message" />
      </div>
      <b-button variant="primary" type="button" v-on:click="onClick()">永久保存w</b-button>
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
    }
  }
}
</script>

<style scoped>
.from-group {
  width: 100%;
}
.form-group label{
  display: block;
}
.tweet-url-input {
  width: 100%;
  margin: 10px auto;
}
</style>
