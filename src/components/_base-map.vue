<template>
  <div class="BaseMap">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else class="BaseMap" />
  </div>
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
    address: {
      type: String,
      default: 'Austria',
    },
    markers: {
      type: Array,
      default() {
        return []
      },
      validator: (array) =>
        array.every((item) => instanceOfLatLngLiteral(item)),
    },
  },
  data(): {
    error: string | undefined
    map: google.maps.Map | undefined
  } {
    return {
      error: undefined,
      map: undefined,
    }
  },
  watch: {
    address(value: string) {
      this.geocode(value)
    },
  },
  async created() {
    try {
      await gmapsInit()
      this.map = new google.maps.Map(this.$el)
      this.geocode(this.address)
    } catch (error) {
      this.error = error.toString()
    }
  },
  methods: {
    geocode(address: string) {
      if (!address) return
      const geocoder: google.maps.Geocoder = new google.maps.Geocoder()
      geocoder.geocode({ address }, (results: Array<any>, status: any) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status)
        }
        if (this.map) {
          this.map.setCenter(results[0].geometry.location)
          this.map.fitBounds(results[0].geometry.viewport)
        }
      })
    },
    fitBounds(markers: google.maps.LatLngLiteral[]) {
      const bounds = new google.maps.LatLngBounds()
      if (this.map && markers) {
        markers.forEach((marker) => {
          bounds.extend(marker)
          new google.maps.Marker({
            position: marker,
            map: this.map,
          })
        })
        this.map.fitBounds(bounds)
        this.map.panToBounds(bounds)
      }
    },
  },
})
</script>

<style>
.BaseMap {
  width: 100%;
  height: 100%;
}
</style>
