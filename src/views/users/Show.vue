<template>
  <div>
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
  computed: mapState('users', [
    'user',
  ]),
  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.$store.dispatch('users/loadUser', vm.id).then(() => {
        if (Object.keys(vm.user).length === 0) {
          vm.$router.push({
            name: '404',
          })
        }
      })
    })
  },
})
</script>
