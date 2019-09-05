<template>
  <div class="bg-gray-200 absolute h-full w-full flex justify-center">
    <div class="w-full max-w-xs self-center pb-10">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Account',
});
</script>
