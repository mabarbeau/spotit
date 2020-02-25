<template>
  <div v-show="messages.length" :class="$style.wrapper">
    <v-alert
      :class="$style.alert"
      :type="message ? message.type : undefined"
      :icon="false"
      dark
      elevation="3"
    >
      <div :class="$style.header">
        {{ total + 1 - messages.length }} of {{ total }}
      </div>
      <v-row align="center">
        <v-col class="grow">
          {{ message ? message.text : '' }}
        </v-col>
        <v-col class="shrink">
          <button class="yes ml-5" @click="confirmed">
            Ok
          </button>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('alert', ['messages', 'total']),
    message(): App.Alert | undefined {
      if (this.messages === undefined || !this.messages.length) return undefined
      return [...this.messages].pop()
    },
  },
  methods: {
    ...mapActions('alert', ['confirmed']),
  },
})
</script>
<style module>
.wrapper {
  position: absolute;
  bottom: 0;
  left: 20px;
  min-width: 365px;
  max-width: 80%;
  opacity: 1;
  transform: translateX(0);
  transition: color 1s, border 1s;
}
.alert {
  padding-top: 27px !important;
  padding-bottom: 0px !important;
}
.header {
  padding: 4px 14px 2px 14px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  font-size: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.15);
}
</style>
