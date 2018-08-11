<template>
<div class="comment">
  <pre>{{this.comment.text}}</pre>
  <small>user: {{this.comment.owner}}</small>
</div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['comment']
}
</script>

<style>

</style>