<template>
  <div>
    <h1> Users </h1>
    <base-pagination
      :name="$route.name"
      :list="users"
      text="name"
    />
  </div>
</template>
<script lang="ts">
import { mapState } from 'vuex'
import Vue from 'vue'
import BasePagination from '@/components/BasePagination.vue'

export default Vue.extend({
  name: 'Users',
  components: {
    BasePagination,
  },
  computed: mapState('users', [
    'users',
  ]),
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
      this.$store.dispatch('users/loadUsers')
    },
  },
})
</script>
