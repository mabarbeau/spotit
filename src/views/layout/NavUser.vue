<template>
  <v-navigation-drawer v-model="drawer" app clipped right>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img :alt="`Photo of ${me.name}`" :src="me.picture" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ me.name }}</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
    }
  },
  computed: {
    ...mapState('auth', ['me']),
  },
  watch: {
    value(value) {
      this.drawer = value
    },
    drawer(value) {
      this.$emit('input', value)
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
    },
  },
})
</script>
