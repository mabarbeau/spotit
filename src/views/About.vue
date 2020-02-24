<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="alert('Roger, capt\'n')">
      Alert
    </button>
    <button
      @click="
        alert(
          'Lorem ipsum dolor sit amen consenter adipisicing elite. Aliquant vera ibague'
        )
      "
    >
      Alert
    </button>
    <v-btn color="red lighten-2" dark @click="confirm('You sure about that?')">
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
      count: 0,
    }
  },
  methods: {
    async alert(message: string) {
      this.count = this.count + 1
      await this.$store.dispatch('alert/add', message)
    },
    async confirm(message: string) {
      await this.$store.dispatch('confirm/confirm', message).then((result) => {
        this.result = result
      })
    },
  },
})
</script>
