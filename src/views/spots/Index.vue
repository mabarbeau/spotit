<template>
  <div class="w-full h-full relative">
    <v-card width="256" class="absolute z-10 h-full rounded-none">
      <v-navigation-drawer permanent>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Spots Index
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list v-if="spots && spots.data" dense nav>
          <v-list-item v-for="spot in spots.data" :key="spot.slug" link>
            <router-link
              :to="{ name: 'spots show', params: { slug: spot.slug } }"
            >
              <v-list-item-content>
                <v-list-item-title>{{ spot.title }}</v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <base-map :address="search" :markers="markers" />
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
