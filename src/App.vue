<template>
  <b-container class="content">
    <h1>Images</h1>
    <image-list :items.sync="imageItems"></image-list>
    <h1>Result</h1>
    <image-canvas :imageItems="imageItems"></image-canvas>
  </b-container>
</template>

<script>
import imageList from './components/imageList'
import imageCanvas from './components/imageCanvas'

export default {
  name: 'app',
  components: {
    imageList,
    imageCanvas
  },
  data() {
    return {
      imageItems: []
    }
  }
}
</script>

<style scoped>
.content h1 {
  padding-top: 25px;
  padding-bottom: 15px;
}
</style>

