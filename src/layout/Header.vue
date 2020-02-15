<template>
  <div id="nav" class="bg-gray-800 px-5 py-3 flex justify-between">
    <router-link class="" :to="{ name: 'home' }">
      <img alt="Spotit logo" src="@/assets/logo.png" class="h-8" />
    </router-link>
    <nav class="inline-flex items-center">
      <ul>
        <li
          v-for="(item, index) in navigation"
          :key="index"
          class="pl-5 text-gray-100 hover:text-gray-300"
        >
          <router-link v-if="item.to" :to="item.to" class="inline-block">
            {{ item.label }}
          </router-link>
          <span v-else>
            {{ item.label }}
          </span>
        </li>
      </ul>
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
