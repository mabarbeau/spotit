<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item
          v-for="(item, index) in navigation"
          :key="index"
          :to="item.to"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <img alt="Spotit logo" src="@/assets/logo.png" class="h-8 px-2" />
      <v-toolbar-title style="width: 300px">Spotit</v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn v-if="me" icon :to="{ name: 'account' }">
        <img alt="Avatar" :src="me.picture" class="h-8 px-2" />
      </v-btn>
      <v-btn v-else icon :to="{ name: 'account' }">
        <v-icon color="white" :size="30">mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      drawer: null,
      navigation: [
        {
          label: 'Home',
          icon: 'mdi-home',
          to: {
            name: 'home',
          },
        },
        {
          label: 'About',
          icon: 'mdi-home',
          to: {
            name: 'about',
          },
        },
        {
          label: 'Spots',
          icon: 'mdi-home',
          to: {
            name: 'spots',
          },
        },
        {
          label: 'Users',
          icon: 'mdi-home',
          to: {
            name: 'users',
          },
        },
      ],
    }
  },
  computed: {
    ...mapState('auth', ['me']),
  },
})
</script>
