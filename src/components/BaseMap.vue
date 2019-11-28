<template>
  <div class="BaseMap" />
</template>

<script lang="ts">
import Vue from 'vue'
import gmapsInit from '@/utils/gmaps'

export default Vue.extend({
  name: 'BaseMap',
  async mounted() {
    try {
      const google: any = await gmapsInit()
      const geocoder: google.maps.Geocoder = new google.maps.Geocoder()
      const map: google.maps.Map = new google.maps.Map(this.$el)

      geocoder.geocode({ address: 'Austria' }, (results: Array<any>, status: any) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status)
        }

        map.setCenter(results[0].geometry.location)
        map.fitBounds(results[0].geometry.viewport)
      })
    } catch (error) {
      console.error(error)
    }
  },
})
</script>

<style>
.BaseMap {
  width: 100vw;
  height: 100vh;
}
</style>
