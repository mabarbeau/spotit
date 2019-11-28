<template>
  <div class="BaseMap" />
</template>

<script lang="ts">
import Vue from 'vue'
import gmapsInit from '@/utils/gmaps'

function instanceOfLatLngLiteral(
  object: any
): object is google.maps.LatLngLiteral {
  return object !== undefined
}

export default Vue.extend({
  name: 'BaseMap',
  props: {
    markers: {
      type: Array,
      validator: (array) => array.every((item) => instanceOfLatLngLiteral(item)),
      required: true,
    },
  },
  data(): {
    map: google.maps.Map | undefined
    // eslint-disable-next-line indent
  } {
    return {
      map: undefined,
    }
  },
  computed: {
    computedMarkers(): google.maps.LatLngLiteral[] {
      return this.markers
    },
  },
  async mounted() {
    try {
      const google: any = await gmapsInit()
      this.map = new google.maps.Map(this.$el)
      const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds()
      if (this.map && this.computedMarkers) {
        this.computedMarkers.forEach((marker) => {
          bounds.extend(marker)
          // eslint-disable-next-line no-new
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
