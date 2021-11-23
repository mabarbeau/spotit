<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <ul>
        <li v-for="(message, index) in messages" :key="index">
          {{ message }}
        </li>
      </ul>
    </v-container>
  </v-content>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
})
</script>
