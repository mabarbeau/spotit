<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn
      color="success"
      @click="
        success(
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quidem, quas quo dolores quis temporibus! Corporis mollitia laboriosam blanditiis consequuntur, neque perspiciatis commodi debitis a quisquam placeat consequatur officia aperiam.'
        )
      "
    >
      Success
    </v-btn>
    <v-btn @click="info('info')">
      Info
    </v-btn>
    <v-btn color="orange" @click="warning('warning')">
      Warning
    </v-btn>
    <v-btn color="red" @click="error('error')">
      Error
    </v-btn>
    <v-btn
      @click="
        confirm({
          title: 'You sure about that?',
          text: 'This action can\'t be undone',
        })
      "
    >
      Confirm
    </v-btn>
    <span v-if="result !== undefined"> Result: {{ result }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  data() {
    return {
      result: undefined,
    }
  },
  methods: {
    async success(message: string) {
      await this.$store.dispatch('alert/success', message)
    },
    async info(message: string) {
      await this.$store.dispatch('alert/info', message)
    },
    async warning(message: string) {
      await this.$store.dispatch('alert/warning', message)
    },
    async error(message: string) {
      await this.$store.dispatch('alert/error', message)
    },
    async confirm(message: string) {
      await this.$store.dispatch('confirm/confirm', message).then((result) => {
        this.result = result
      })
    },
  },
})
</script>
