<template>
  <b-img center :src="imageSrc" fluid />
</template>

<script>
import _ from 'lodash'

export default {
  name: 'image-canvas',
  props: ['imageItems', 'width', 'subtitleTop', 'subtitleBottom'],
  data() {
    return {
      imageSrc: '',
      canvas: document.createElement('canvas')
    }
  },
  computed: {
    height() {
      let height = 0
      for (let item of this.imageItems) {
        height += this.getImageHeightToDraw(item)
      }
      return height
    }
  },
  watch: {
    imageItems(val) {
      this.draw()
    },
    height(val) {
      this.draw()
    }
  },
  methods: {
    getImageHeightToDraw(item) {
      let [width, height] = [item.image.width, item.image.height]
      if (item.isSubtitleFrame) {
        height = this.subtitleTop < this.subtitleBottom ? (this.subtitleBottom - this.subtitleTop) * item.image.height : 0;
      }
      return height * this.width / width || 0
    },
    draw: _.debounce(function() {
      [this.canvas.width, this.canvas.height] = [this.width, this.height]
      if (this.canvas.height == 0) {
        this.imageSrc = ''
        this.$emit('update:imageSrc', this.imageSrc)
        return
      }

      let ctx = this.canvas.getContext('2d')
      let y = 0
      for (let item of this.imageItems) {
        let dh = this.getImageHeightToDraw(item)
        if (dh == 0) {
          continue
        }
        
        if (item.isSubtitleFrame) {
          let sy = this.subtitleTop * item.image.height
          let sh = (this.subtitleBottom - this.subtitleTop) * item.image.height
          ctx.drawImage(item.image, 0, sy, item.image.width, sh,
                        0, y, this.width, dh)
        } else {
          ctx.drawImage(item.image, 0, y, this.width, dh)
        }
        y += dh
      }

      this.imageSrc = this.canvas.toDataURL()
      this.$emit('update:imageSrc', this.imageSrc)
    }, 500)
  }
}
</script>
