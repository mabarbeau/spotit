<template>
  <div class="pt-4 min-h-full">
    <v-container>
      <h1 class="headline pb-2">
        Notifications
      </h1>
      <div v-if="!notifications">
        Loading
      </div>
      <div v-else-if="notifications.data.length">
        <v-alert
          v-for="notification in notifications.data"
          :key="notification.id"
          :icon="false"
          :type="!notification.read ? 'info' : undefined"
          :text="!notification.read"
          elevation="3"
        >
          <router-link
            v-if="notification.url"
            :to="notification.url"
            @click.native="markRead(notification.id)"
          >
            {{ notification.message }}
          </router-link>
        </v-alert>
      </div>
      <div v-else>
        <h2 class="subtitle-1">
          Nothing to display
        </h2>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('notifications', ['notifications']),
  },
  methods: {
    markRead(id: string) {
      this.$store.dispatch('notifications/read', id)
    },
  },
})
</script>
