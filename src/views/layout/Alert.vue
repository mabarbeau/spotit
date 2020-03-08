<template>
  <transition name="slide-fade">
    <v-card
      v-show="show"
      :class="$style.wrapper"
      class="mx-auto"
      :color="message ? message.type : ''"
      elevation="4"
    >
      <v-card-text class="py-3">
        <v-row align="center">
          <v-col class="grow py-0">
            <div v-if="total > 1" class="py-0 overline mb-1">
              {{ total + 1 - messages.length }} of {{ total }}
            </div>
            <p class="mb-0">
              {{ message ? message.text : '' }}
            </p>
          </v-col>
          <v-col class="shrink py-0">
            <v-btn icon small @click="dismiss">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('alert', ['show', 'messages', 'total']),
    message(): App.Alert | undefined {
      if (this.messages === undefined || !this.messages.length) return undefined
      return [...this.messages].pop()
    },
  },
  methods: {
    ...mapActions('alert', ['dismiss']),
  },
})
</script>
<style module>
.wrapper {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 365px;
}
</style>
