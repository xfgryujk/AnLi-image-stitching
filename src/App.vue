<template>
  <b-container class="py-3 px-md-3 px-lg-5">
    <h1>{{ $t('app.images') }}</h1>
    <image-list :items.sync="imageItems"></image-list>

    <h1>{{ $t('app.result') }}</h1>
    <b-card>
      <label for="width-input">{{ $t('app.imageWidth') }}</label>
      <b-form-input type="number" id="width-input" v-model="imageWidth"></b-form-input>
      <label for="subtitle-top">{{ $t('app.subtitleTop') }}</label>
      <b-form-input type="number" id="subtitle-top" v-model="subtitleTop"></b-form-input>
      <label for="subtitle-bottom">{{ $t('app.subtitleBottom') }}</label>
      <b-form-input class="mb-3" type="number" id="subtitle-bottom" v-model="subtitleBottom"></b-form-input>
      <b-button class="mb-3" variant="primary" @click="saveImage()" :disabled="!resultImageSrc">{{ $t('app.save') }}</b-button>

      <image-canvas :imageItems="imageItems" :width="imageWidth" :subtitleTop="subtitleTopFloat" :subtitleBottom="subtitleBottomFloat" :imageSrc.sync="resultImageSrc"></image-canvas>
    </b-card>
  </b-container>
</template>

<script>
import imageList from './components/imageList'
import imageCanvas from './components/imageCanvas'
import download from 'downloadjs'

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
      subtitleBottom: 100,
      resultImageSrc: ''
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
  },
  methods: {
    saveImage() {
      download(this.resultImageSrc, 'result.png')
    }
  }
}
</script>

<style scoped>
h1 {
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}
</style>
