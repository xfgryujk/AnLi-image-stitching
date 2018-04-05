<template>
  <div>
    <draggable v-model="items">
      <b-card v-for="(item, index) in items" :key="item.image.src" draggable="true">
        <b-row>
          <b-col sm="4">
            <b-img :src="item.image.src" fluid />
          </b-col>
          <b-col sm="8">
            <b-form-checkbox v-model="item.isSubtitleFrame">Subtitle frame</b-form-checkbox>
            <b-button variant="danger" @click="items.splice(index, 1)">Remove</b-button>
          </b-col>
        </b-row>
      </b-card>
    </draggable>

    <b-card>
      <div class="add-file" @dragover="onDragOver" @drop.prevent="acceptFiles($event.dataTransfer.files)">
        <p>
          Add images by dropping them here or
          <b-link @click="$refs.fileInput.click()">selecting them</b-link>
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
      if (this.loadingImages.length == 0)
        this.$emit('update:items', val)
    }
  },
  methods: {
    onDragOver(event) {
      for (let type of event.dataTransfer.types) {
        if (type != 'Files')
          return
      }
      event.preventDefault()
    },
    acceptFiles(files) {
      for (let file of files) {
        let image = new Image
        this.loadingImages.push(image)
        let that = this
        image.onload = image.onerror = function() {
          that.loadingImages.splice(that.loadingImages.indexOf(this), 1)
          // Make sure all images is loaded
          if (that.loadingImages.length == 0)
            that.$emit('update:items', that.items)
        }
        image.src = URL.createObjectURL(file)

        this.items.push({
          image: image,
          isSubtitleFrame: false
        })
      }
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

