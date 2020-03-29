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
    <v-app-bar app clipped-right color="primary">
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
      <div v-if="me">
        <v-btn icon @click.stop="drawerRight = !drawerRight">
          <img
            :class="$style.avatar"
            alt="Avatar"
            :src="me.picture"
            class="h-8 px-2"
          />
        </v-btn>
      </div>
      <div v-else>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon color="white" :size="30">mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <nav-guest />
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <nav-user v-if="me" v-model="drawerRight" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  components: {
    'nav-guest': () =>
      import(/* webpackChunkName: "NavGuest" */ './NavGuest.vue'),
    'nav-user': () => import(/* webpackChunkName: "NavUser" */ './NavUser.vue'),
  },
  data() {
    return {
      drawer: null,
      drawerRight: null,
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
