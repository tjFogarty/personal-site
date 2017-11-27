<template>
  <ul v-if="posts.length">
    <li v-for="post in posts" :key="post.id">
      <a :href="post.url">{{ post.title }}</a>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  
  data () {
    return {
      posts: []
    }
  },
  
  mounted () {
    axios.get('/posts.json')
      .then(response => response.data)    
      .then(({ data }) => {
        this.posts = data
      })
  }
}
</script>
