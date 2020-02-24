<template>
  <v-dialog v-model="isMessage" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Privacy Policy
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-btn id="no" color="primary" text @click="canceled">
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn id="yes" color="primary" text @click="confirmed">
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
      set(): void {
        if (this.message === false) this.canceled()
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
