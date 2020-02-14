<template>
  <div
    :class="$style.notification"
    class="bg-white border border-gray-300 border-radius-sm shadow-md p-2"
  >
    <div class="flex space-between relative">
      <p>
        {{ message }}
      </p>
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
    ...mapState('notification', ['message']),
  },
  methods: {
    ...mapActions('notification', ['confirmed']),
  },
})
</script>
<style module>
.notification {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>
