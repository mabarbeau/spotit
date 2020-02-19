<template>
  <transition name="slide-fade">
    <div
      :class="$style.alert"
      class="bg-gray-200 border border-gray-400 border-radius-sm shadow-md p-2"
    >
      <div class="flex items-center">
        <p>
          {{ message }}
        </p>
        <button class="yes ml-5" @click="confirmed">
          Ok
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('alert', ['message']),
  },
  methods: {
    ...mapActions('alert', ['confirmed']),
  },
})
</script>
<style module>
.alert {
  position: absolute;
  bottom: 20px;
  left: 20px;
  max-width: 365px;
  opacity: 1;
  transform: translateX(0);
}
</style>
<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
