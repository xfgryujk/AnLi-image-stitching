<template>
  <div>
    <draggable v-model="items">
      <b-card class="mb-3" v-for="(item, index) in items" :key="item.image.src" draggable="true">
        <b-row class="mb-3">
          <b-col>
            #{{ index + 1 }}
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="4" class="mb-3 mb-md-0">
            <b-img :src="item.image.src" fluid />
          </b-col>
          <b-col cols="12" md="8">
            <b-form-checkbox v-model="item.isSubtitleFrame">{{ $t('imageList.subtitleFrame') }}</b-form-checkbox>
            <b-button variant="primary" @click="moveUpItem(index)" :disabled="index <= 0">{{ $t('imageList.moveUp') }}</b-button>
            <b-button variant="primary" @click="moveDownItem(index)" :disabled="index >= items.length - 1">{{ $t('imageList.moveDown') }}</b-button>
            <b-button variant="danger" @click="removeItem(index)">{{ $t('imageList.remove') }}</b-button>
          </b-col>
        </b-row>
      </b-card>
    </draggable>

    <b-card class="mb-3">
      <div class="add-file mb-3" @dragover="onDragOver" @drop.prevent="acceptFiles($event.dataTransfer.files)">
        <p class="text-secondary text-center align-middle">
          <b-link @click="$refs.fileInput.click()">{{ $t('imageList.selectImages') }}</b-link>
          {{ $t('imageList.addImages') }}
        </p>
        <input type="file" ref="fileInput" @change="acceptFiles($event.target.files)" accept="image/jpg,image/jpeg,image/png" style="display: none;" multiple="multiple">
      </div>
      <b-button variant="danger" @click="clearItem()">{{ $t('imageList.clear') }}</b-button>
      <b-button variant="primary" @click="inverseIsSubtitle()">{{ $t('imageList.inverse') }}</b-button>
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
    moveUpItem(index) {
      this.items.splice(index - 1, 2, this.items[index], this.items[index - 1])
    },
    moveDownItem(index) {
      this.items.splice(index, 2, this.items[index + 1], this.items[index])
    },
    removeItem(index) {
      URL.revokeObjectURL(this.items[index].image.src)
      this.items.splice(index, 1)
    },
    clearItem() {
      for (let item of this.items) {
        URL.revokeObjectURL(item.image.src)
      }
      this.items = []
    },
    inverseIsSubtitle() {
      for (let item of this.items) {
        item.isSubtitleFrame = !item.isSubtitleFrame
      }
    }
  }
}
</script>

<style scoped>
.add-file {
  height: 5rem;
  border: 2px dashed #ccc;
  background-color: #fafbfc;
  overflow: hidden;
}

.add-file p {
  line-height: calc(5rem - 4px);
}
</style>

