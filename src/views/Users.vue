<template>
  <div>
    <h1> Users </h1>
    <base-List
      :name="$route.name"
      :list="users"
      text="name"
    />
  </div>
</template>
<script lang="ts">
import { mapState } from 'vuex'
import Vue from 'vue'
import BaseList from '@/components/BasePagination.vue'

export default Vue.extend({
  name: 'Users',
  components: {
    BaseList,
  },
  computed: mapState(['users']),
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
      this.$store.dispatch('loadUsers')
    },
  },
})
</script>
