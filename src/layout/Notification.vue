<template>
  <div>
    {{ message }}
    <div class="flex space-between">
      <button v-if="cancelable" class="no" @click="canceled">
        Cancel
      </button>
      <button class="yes" @click="confirmed">
        Ok
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('notification', ['message', 'cancelable']),
  },
  methods: {
    ...mapActions('notification', ['confirmed', 'canceled']),
  },
})
</script>
