<template>
  <div class="BaseMap" />
</template>

<script>
import gmapsInit from '@/utils/gmaps'

export default {
  name: 'BaseMap',
  async mounted() {
    try {
      const google = await gmapsInit()
      const geocoder = new google.maps.Geocoder()
      const map = new google.maps.Map(this.$el)

      geocoder.geocode({ address: 'Austria' }, (results, status) => {
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
}
</script>

<style>
.BaseMap {
  width: 100vw;
  height: 100vh;
}
</style>
