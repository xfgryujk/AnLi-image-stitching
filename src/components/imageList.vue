<template>
  <div>
    <draggable v-model="items">
      <b-card v-for="(item, index) in items" :key="item.image.src" draggable="true">
        <b-row>
          <b-col sm="4">
            <b-img :src="item.image.src" fluid />
          </b-col>
          <b-col sm="8">
            <b-form-checkbox v-model="item.isSubtitleFrame">{{ $t('imageList.subtitleFrame') }}</b-form-checkbox>
            <b-button variant="danger" @click="removeItem(index)">{{ $t('imageList.remove') }}</b-button>
          </b-col>
        </b-row>
      </b-card>
    </draggable>

    <b-card>
      <div class="add-file" @dragover="onDragOver" @drop.prevent="acceptFiles($event.dataTransfer.files)">
        <p>
          {{ $t('imageList.addImages') }}
          <b-link @click="$refs.fileInput.click()">{{ $t('imageList.selectImages') }}</b-link>
        </p>
        <input type="file" ref="fileInput" @change="acceptFiles($event.target.files)" accept="image/jpg,image/jpeg,image/png" style="display: none;" multiple="multiple">
      </div>
    </b-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'image-list',
  components: {
    draggable
  },
  data() {
    return {
      items: [], // Array of {image, isSubtitleFrame}
      loadingImages: [] // Array of Image
    }
  },
  watch: {
    items(val) {
      // Make sure all images is loaded
      if (this.loadingImages.length == 0) {
        this.$emit('update:items', val.slice())
      }
    }
  },
  methods: {
    onDragOver(event) {
      for (let i = 0; i < event.dataTransfer.types.length; i++) {
        if (event.dataTransfer.types[i] != 'Files') {
          return
        }
      }
      event.preventDefault()
    },
    acceptFiles(files) {
      for (let i = 0; i < files.length; i++) {
        let image = new Image
        this.loadingImages.push(image)
        let that = this
        image.onload = image.onerror = function() {
          that.loadingImages.splice(that.loadingImages.indexOf(this), 1)
          // Make sure all images is loaded
          if (that.loadingImages.length == 0) {
            that.$emit('update:items', that.items.slice())
          }
        }
        image.src = URL.createObjectURL(files[i])

        this.items.push({
          image: image,
          isSubtitleFrame: false
        })
      }
    },
    removeItem(index) {
      URL.revokeObjectURL(this.items[index].image.src)
      this.items.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.card {
  margin-top: 10px;
  margin-bottom: 10px;
}

.add-file {
  height: 65px;
  border: 2px dashed #ccc;
  background-color: #fafbfc;
}

.add-file p {
  font-size: 14px;
  color: #586069;
  text-align: center;
  line-height: 65px;
}
</style>

