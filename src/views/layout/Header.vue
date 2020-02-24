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
      <img alt="Spotit logo" src="@/assets/logo.png" class="h-8" />
      <v-toolbar-title>Spotit</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
          label: 'Account',
          icon: 'mdi-home',
          to: {
            name: 'account',
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
})
</script>
