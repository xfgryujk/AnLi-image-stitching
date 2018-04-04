<template>
  <ul>
  </ul>
</template>

<script>
export default {
  name: 'image-list',
  data() {
    return {
      images: [] // Array of Image
    }
  },
  watch: {
    images(val) {
      this.$emit('imagesUpdate', val)
    }
  }
}
</script>
