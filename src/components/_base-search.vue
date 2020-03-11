<template>
  <v-autocomplete
    v-model="select"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    cache-items
    flat
    solo-inverted
    hide-details
    prepend-inner-icon="mdi-magnify"
    label="Search"
    class="hidden-sm-and-down"
    hide-no-data
    @input="submit"
  >
    <template v-slot:append-item>
      <img
        :src="googleLogo"
        alt="Powered by Google"
        class="mt-2 mr-3 ml-auto"
      />
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import Vue from 'vue'
import gmapsInit from '@/utils/gmaps'

export default Vue.extend({
  data(): {
    [key: string]: any
    search: null | string
  } {
    return {
      service: undefined,
      loading: false,
      items: [],
      search: null,
      select: null,
    }
  },
  computed: {
    googleLogo() {
      return this.$vuetify.theme.dark
        ? '/img/3rd_party/powered_by_google_on_non_white.png'
        : '/img/3rd_party/powered_by_google_on_white.png'
    },
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)
    },
    '$route.query.search'(newVal: string, oldVal: string) {
      if (newVal && newVal != oldVal) {
        this.search = newVal
      }
    },
  },
  async created() {
    try {
      const google: any = await gmapsInit()
      this.service = new google.maps.places.AutocompleteService()
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    querySelections(input: string) {
      this.loading = true
      this.getPlacePredictions({
        input,
        types: ['(cities)'],
      })
    },
    getPlacePredictions(request: google.maps.places.AutocompletionRequest) {
      if (this.service) {
        this.service.getPlacePredictions(request, this.displaySuggestions)
      }
    },
    displaySuggestions(predictions: any, status: any) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status)
        return
      }
      this.items = predictions.map((item: any) => item.description)
      this.loading = false
    },
    submit(search: string) {
      const route = this.$router.resolve({
        name: 'spots',
        query: { search },
      }).route
      if (this.$router.currentRoute !== route) this.$router.push(route)
    },
  },
})
</script>
