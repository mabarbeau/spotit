<template>
  <div>
    <h1> Show Spots {{ slug }} </h1>
    <BaseMap :markers="markers" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseMap from '@/components/BaseMap.vue'

export default Vue.extend({
  name: 'SpotsShow',
  components: {
    BaseMap,
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  computed: {
    markers(): google.maps.LatLngLiteral[] {
      return [
        {
          lat: 75,
          lng: 50,
        },
        {
          lat: 50,
          lng: 50,
        },
        {
          lat: 60,
          lng: 60,
        },
      ]
    },
  },
})
</script>
