<template>
  <div>
    <h1>
      Show Spots {{ slug }}
    </h1>
    <BaseMap />
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
})
</script>
