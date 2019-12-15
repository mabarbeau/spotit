<template>
  <div>
    <h1>
      Spots Index
      {{ spots.current_page }}
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
      <BaseMap
        :markers="markers"
      />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import BasePagination from '@/components/BasePagination.vue'
import BaseMap from '@/components/BaseMap.vue'

export default Vue.extend({
  name: 'SpotsIndex',
  components: {
    BasePagination,
    BaseMap,
  },
  computed: {
    ...mapState('spots', [
      'spots',
    ]),
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
