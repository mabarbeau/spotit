<template>
  <div class="pt-4 min-h-full">
    <v-container>
      <h1 class="headline pb-2">
        Notification
      </h1>
      <div v-if="isLoading === true">
        Loading
      </div>
      <div v-else-if="notifications && notifications.data.length">
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
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    ...mapState('notifications', ['notifications']),
  },
  created() {
    this.$store.dispatch('notifications/getNotifications').then(() => {
      this.isLoading = false
    })
  },
  methods: {
    markRead(id: string) {
      this.$store.dispatch('notifications/read', id)
    },
  },
})
</script>
