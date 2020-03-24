<template>
  <v-autocomplete
    v-model="select"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    cache-items
    flat
    solo
    hide-details
    :prepend-inner-icon="!locationAccessSupported ? 'mdi-magnify' : undefined"
    background-color="rgba(255, 255, 255, 0.15)"
    label="Search"
    class="hidden-sm-and-down"
    hide-no-data
    @input="submit"
  >
    <template v-if="locationAccessSupported" v-slot:prepend-inner>
      <v-btn class="p-0" text xs-small @click="useMyLocation">
        <v-icon>{{
          locationAccessGranted ? 'mdi-crosshairs-gps' : 'mdi-crosshairs'
        }}</v-icon>
      </v-btn>
    </template>
    <template v-if="$route.name !== 'spots'" v-slot:prepend-item>
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
      locationAccessSupported: !!navigator.geolocation,
      locationAccessGranted: false,
      locationAccessBlocked: false,
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
    useMyLocation() {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          this.locationAccessGranted = true
          this.setCityFromLatLng({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          })
        },
        (error) => {
          if (error.code === 1) this.locationAccessBlocked = true
          else {
            this.$store.dispatch('alert/create', {
              type: 'warning',
              text: error.message,
            })
          }
        }
      )
    },
    setCityFromLatLng(location: google.maps.LatLngLiteral) {
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location }, ([{ address_components }], status) => {
        if (status === 'OK') {
          if (address_components) {
            this.submit(
              `${address_components[3].short_name}, ${address_components[5].short_name}, ${address_components[6].short_name}`
            )
          } else {
            window.alert('No results found')
          }
        } else {
          window.alert('Geocoder failed due to: ' + status)
        }
      })
    },
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
