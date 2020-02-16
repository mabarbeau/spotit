<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
    <h2>User</h2>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import store from '@/state/store'

export default Vue.extend({
  name: 'Users',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: mapState('users', ['user']),
  beforeRouteEnter(to: any, from: any, next: any) {
    store.dispatch('users/loadUser', to.params.id).then(() => {
      next((vm: any) => {
        if (Object.keys(vm.user).length === 0) {
          vm.$router.push({ name: 'page not found' })
        }
      })
    })
  },
})
</script>
