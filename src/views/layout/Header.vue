<template>
  <div>
    <v-navigation-drawer v-model="drawer" app class="z-50">
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
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <img alt="Spotit logo" src="@/assets/logo.png" class="h-8 px-2" />
      <v-toolbar-title>Spotit</v-toolbar-title>
      <v-spacer />
      <base-search />
      <v-spacer />
      <v-btn v-if="me" icon :to="{ name: 'notifications' }">
        <v-badge dot bottom overlap :value="unread" color="accent">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-btn v-if="me" icon :to="{ name: 'account' }">
        <img
          :class="$style.avatar"
          alt="Avatar"
          :src="me.picture"
          class="h-8 px-2"
        />
      </v-btn>
      <v-btn v-else icon :to="{ name: 'login' }">
        <v-icon color="white" :size="30">mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

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
    ...mapState('notifications', ['notifications', 'unread']),
  },
})
</script>

<style module>
.avatar {
  border-radius: 100%;
}
</style>
