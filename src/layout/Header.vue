<template>
  <div
    id="nav"
    class="bg-gray-800 px-5 py-3 flex justify-between"
  >
    <router-link
      class=""
      :to="{name: 'home'}"
    >
      <img
        alt="Spoit logo"
        src="@/assets/logo.png"
        class="h-8"
      >
    </router-link>
    <nav class="inline-flex items-center">
      <router-link
        v-for="(link, index) in navigation"
        :key="index"
        class="pl-5 text-gray-100 hover:text-gray-300"
        :to="link.to"
      >
        {{ link.label }}
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      navigation: [
        {
          label: 'About',
          to: {
            name: 'about',
          },
        },
        {
          label: 'Spots',
          to: {
            name: 'spots',
          },
        },
        {
          label: 'Account',
          to: {
            name: 'account',
          },
        },
        {
          label: 'Users',
          to: {
            name: 'users',
          },
        },
      ],
    }
  },
})
</script>
