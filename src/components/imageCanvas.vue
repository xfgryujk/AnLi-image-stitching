<template>
  <canvas ref="canvas" :width="width" :height="height">Your browser does not support canvas!</canvas>
</template>

<script>
export default {
  name: 'image-canvas',
  props: ['images'],
  data() {
    return {
        width: 300,
        height: 150
    }
  },
  watch: {
    images(val) {
      let ctx = this.$refs.canvas.getContext('2d')
      for (let img of val) {
          ctx.drawImage(img, 0, 0) // test
      }
    }
  }
}
</script>
