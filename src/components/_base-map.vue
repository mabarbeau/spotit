<template>
  <div class="BaseMap" />
</template>

<script lang="ts">
import Vue from 'vue'
import gmapsInit from '@/utils/gmaps'

function instanceOfLatLngLiteral(
  object: any
): object is google.maps.LatLngLiteral {
  return 'lat' in object && 'lng' in object
}

export default Vue.extend({
  props: {
    markers: {
      type: Array,
      validator: (array) =>
        array.every((item) => instanceOfLatLngLiteral(item)),
      required: true,
    },
  },
  data(): {
    map: google.maps.Map | undefined
  } {
    return {
      map: undefined,
    }
  },
  async mounted() {
    try {
      const google: any = await gmapsInit()
      this.map = new google.maps.Map(this.$el)
      const bounds = new google.maps.LatLngBounds()
      if (this.map && this.markers) {
        this.markers.forEach((marker) => {
          bounds.extend(marker)
          new google.maps.Marker({
            position: marker,
            map: this.map,
          })
        })

        this.map.fitBounds(bounds)
        this.map.panToBounds(bounds)
      }
    } catch (error) {
      console.error(error)
    }
  },
})
</script>

<style>
.BaseMap {
  width: 100%;
  height: 505px;
}
</style>
