<template>
  <div>
    <image-list @imagesUpdate="images => this.images = images"></image-list>
    <image-canvas :images="images"></image-canvas>
  </div>
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
      images: [] // Array of Image
    }
  }
}
</script>
