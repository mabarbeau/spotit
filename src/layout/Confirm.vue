<template>
  <div :class="$style.background">
    <div
      class="m-5 bg-white border border-gray-300 border-radius-sm shadow-md p-2 max-w-md"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore laborum, obcaecati qui facilis ab hic quod dolores eum. Velit autem aut nihil non facere quae iusto, nostrum quisquam laudantium quia.
        {{ message }}
      </p>
      <div class="w-full flex justify-between mt-5">
        <button class="no" @click="canceled">
          Cancel
        </button>
        <button class="yes" @click="confirmed">
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('confirm', ['message']),
  },
  methods: {
    ...mapActions('confirm', ['confirmed', 'canceled']),
  },
})
</script>
<style module>
.background {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>
