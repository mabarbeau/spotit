<template>
  <div class="bg-gray-200 absolute h-full w-full flex justify-center">
    <div class="w-full max-w-xs self-center pb-10">
      <div class="bg-white shadow-md rounded">
        <div class="border-b flex text-center">
          <router-link class="py-2 px-3 w-1/2" :to="{name: 'login'}">
            Login
          </router-link>
          <router-link class="py-2 px-3 w-1/2" :to="{name: 'register'}">
            Register
          </router-link>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Account',
});
</script>
