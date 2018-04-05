<template>
  <b-container class="content">
    <h1>Images</h1>
    <image-list :items.sync="imageItems"></image-list>

    <h1>Result</h1>
    <b-card>
      <label for="width-input">Image width:</label>
      <b-form-input type="number" id="width-input" v-model="imageWidth"></b-form-input>
      <label for="subtitle-top">Subtitle top posision (%):</label>
      <b-form-input type="number" id="subtitle-top" v-model="subtitleTop"></b-form-input>
      <label for="subtitle-bottom">Subtitle bottom posision (%):</label>
      <b-form-input type="number" id="subtitle-bottom" v-model="subtitleBottom"></b-form-input>

      <center class="result-image">
        <image-canvas :imageItems="imageItems" :width="imageWidth" :subtitleTop="subtitleTopFloat" :subtitleBottom="subtitleBottomFloat"></image-canvas>
      </center>
    </b-card>
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
      imageItems: [],
      imageWidth: 640,
      subtitleTop: 90,
      subtitleBottom: 100
    }
  },
  computed: {
    subtitleTopFloat() {
      let result = this.subtitleTop / 100
      return (0 <= result && result <= 1) ? result : 0.9
    },
    subtitleBottomFloat() {
      let result = this.subtitleBottom / 100
      return (0 <= result && result <= 1) ? result : 1
    }
  }
}
</script>

<style scoped>
.content {
  margin-top: 10px;
  margin-bottom: 20px;
}

.content h1 {
  padding-top: 15px;
  padding-bottom: 15px;
}

.result-image {
  margin-top: 15px;
}
</style>
