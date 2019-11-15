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
        class="pl-5 text-gray-100 hover:text-gray-300"
        :to="{name: 'about'}"
      >
        About
      </router-link>
      <router-link
        class="pl-5 text-gray-100 hover:text-gray-300"
        :to="{name: 'account'}"
      >
        Account
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppHeader',
})
</script>
