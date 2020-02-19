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
      await this.$store.dispatch('alert/alert', message).then((result) => {
        this.result = result
      })
    },
    async confirm(message: string) {
      await this.$store.dispatch('confirm/confirm', message).then((result) => {
        this.result = result
      })
    },
  },
})
</script>
