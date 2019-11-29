<template>
  <div>
    <h1> {{ spot.title }} </h1>
    <router-link
      :to="{name: 'spots'}"
    >
      Back
    </router-link>
    <BaseMap :markers="markers" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
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
    ...mapState(['spot']),
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
  watch: {
    $route() {
      this.load()
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$store.dispatch('loadSpot', this.slug)
    },
  },
})
</script>
