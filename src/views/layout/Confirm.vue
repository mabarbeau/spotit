<template>
  <v-dialog v-model="isMessage" persistent width="500">
    <v-card>
      <v-card-title
        v-if="message && 'title' in message"
        class="headline"
        primary-title
      >
        {{ message.title }}
      </v-card-title>
      <v-card-text v-if="message && 'text' in message" class="text--primary">
        <div>
          {{ message.text }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn class="no" color="primary" text @click="canceled">
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="yes" color="primary" text @click="confirmed">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    isMessage: {
      get(): boolean {
        return this.message !== undefined
      },
      set(value): void {
        if (value === false) this.canceled()
      },
    },
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
