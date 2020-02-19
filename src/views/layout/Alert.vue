<template>
  <transition name="slide-fade">
    <div
      v-show="messages"
      :class="$style.alert"
      class="bg-gray-200 border border-gray-400 border-radius-sm shadow-md p-2"
    >
      <div class="flex items-center">
        <p>
          {{ messages[messages.length - 1] }}
        </p>
        <button class="yes ml-5" @click="confirmed">
          Ok
        </button>
      </div>
      <div v-if="total > 1">
        {{ total + 1 - messages.length }} of {{ total }}
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('alert', ['messages', 'total']),
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
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
