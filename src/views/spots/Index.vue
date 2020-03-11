<template>
  <div v-if="spots">
    <h1>
      Spots Index
      {{ spots.currentPage }}
    </h1>
    <section>
      <base-pagination
        :list="spots"
        :name="$route.name"
        :child-name="`${$route.name} show`"
        text="title"
      />
    </section>
    <section>
      <base-map :address="search" :markers="markers" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data(): {
    [key: string]: any
    search: null | string
  } {
    return {
      search: null,
    }
  },
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
    '$route.query.search': {
      immediate: true,
      handler(newVal: string, oldVal: string) {
        if (newVal != oldVal) {
          this.search = newVal
        }
      },
    },
  },
  created() {
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
