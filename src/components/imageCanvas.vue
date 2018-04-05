<template>
  <canvas ref="canvas" :width="width" :height="height">Your browser does not support canvas!</canvas>
</template>

<script>
export default {
  name: 'image-canvas',
  props: ['imageItems'],
  data() {
    return {
        width: 300,
        height: 150
    }
  },
  watch: {
    imageItems(val) {
      let ctx = this.$refs.canvas.getContext('2d')
      for (let item of val) {
          ctx.drawImage(item.image, 0, 0) // test
      }
    }
  },
}
</script>
