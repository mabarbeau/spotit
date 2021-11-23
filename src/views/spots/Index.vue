<template>
  <div>
    <h1>
      Spots Index
      {{ spots.currentPage }}
    </h1>
    <section>
      <base-pagination
        :list="spots"
        text="title"
        :name="$route.name"
        :child-name="`${$route.name} show`"
      />
    </section>
    <section>
      <base-map :markers="markers" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'SpotsIndex',
  computed: {
    ...mapState('spots', ['spots']),
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
      this.$store.dispatch('spots/loadSpots')
    },
  },
})
</script>
<style scoped>
section {
  width: 50%;
  float: right;
}
</style>
