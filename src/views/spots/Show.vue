<template>
  <div v-if="spot">
    <h1> {{ spot.title }} </h1>
    <a href="javascript:history.go(-1)">
      Back
    </a>
    <base-map :markers="markers" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'SpotsShow',
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('spots', ['spot']),
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
      this.$store.dispatch('spots/loadSpot', this.slug)
    },
  },
})
</script>
