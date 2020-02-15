<template>
  <div :class="[$style.confirm, $style.fullScreen]">
    <div
      class="m-5 bg-white border border-gray-300 border-radius-sm shadow-md p-2 max-w-md z-10"
    >
      <p>
        {{ message }}
      </p>
      <div class="w-full flex justify-between mt-5">
        <button class="no" @click="canceled">
          Cancel
        </button>
        <button class="yes" @click="confirmed">
          Ok
        </button>
      </div>
    </div>
    <div :class="[$style.background, $style.fullScreen]" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('confirm', ['message']),
  },
  mounted() {
    setTimeout(() => {
      window.addEventListener('keyup', this.keyup)
    }, 1000)
  },
  destroyed() {
    window.removeEventListener('keyup', this.keyup)
  },
  methods: {
    ...mapActions('confirm', ['confirmed', 'canceled']),
    keyup(event: KeyboardEvent) {
      if (event.code === 'Space' || event.code === 'Enter') {
        this.confirmed()
      }
      if (event.code === 'Escape') {
        this.canceled()
      }
    },
  },
})
</script>
<style module>
.fullScreen {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.confirm {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.background {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
