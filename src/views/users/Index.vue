<template>
  <div>
    <h1> Users </h1>
    <base-pagination
      :name="$route.name"
      :child-name="`${$route.name} show`"
      :list="users"
      text="name"
    />
  </div>
</template>
<script lang="ts">
import { mapState } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  name: 'Users',
  computed: mapState('users', ['users']),
  watch: {
    async $route() {
      await this.load()
    },
  },
  async mounted() {
    await this.load()
  },
  methods: {
    async load() {
      await this.$store.dispatch('users/loadUsers')
    },
  },
})
</script>
