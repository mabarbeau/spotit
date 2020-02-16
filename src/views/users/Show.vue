<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
    <h2>User</h2>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'Users',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: mapState('users', ['user']),
  watch: {
    $route() {
      this.load()
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$store.dispatch('users/loadUser', this.id)
    },
  },
})
</script>
