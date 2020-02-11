<template>
  <div class="about">
    <h1>This is an about page</h1>
    Result: {{ result }}
    <button @click="alert('Roger, capt\'n')">
      Alert
    </button>
    <button @click="confirm('You sure about that?')">
      Confirm
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  data() {
    return {
      result: '',
    }
  },
  methods: {
    async alert(message: string) {
      await this.$store.dispatch('notification/alert', message).then(() => {
        this.result = 'success'
      })
    },
    async confirm(message: string) {
      await this.$store
        .dispatch('notification/confirm', message)
        .then(() => {
          this.result = 'success'
        })
        .catch(() => {
          this.result = 'canceled'
        })
    },
  },
})
</script>
