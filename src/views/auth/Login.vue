<template>
  
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="username"
      >
        Username
      </label>
      <input
        id="username"
        class="shadow appearance-none border rounded w-full py-2 px-3"
        type="text"
        placeholder="Username"
      >
    </div>
    <div class="mb-6">
      <label
        class="block text-sm font-bold mb-2"
        for="password"
      >
        Password
      </label>
      <input
        id="password"
        class="shadow appearance-none border rounded w-full py-2 px-3 mb-3"
        type="password"
        placeholder="******************"
      >
      <p class="text-red-500 text-xs italic">
        Please choose a password.
      </p>
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
      >
        Sign In
      </button>
      <a
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        href="#"
      >
        Forgot Password?
      </a>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',
});
</script>
