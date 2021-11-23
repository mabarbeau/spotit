<template>
  <div>
    <h1>
      {{ error.toString() }}
    </h1>
    <div v-if="error.response && error.response.data">
      <p v-if="error.response.data.message">
        {{ error.response.data.message }}
      </p>
      <p v-if="error.response.data.exception">
        {{ error.response.data.exception }}
      </p>
      <div v-if="error.response.data.trace">
        <ul>
          <li v-for="(trace, index) in error.response.data.trace" :key="index">
            <ul>
              <li>
                {{ trace.file }}
              </li>
              <li>
                {{ trace.line }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('errors', ['error']),
  },
})
</script>
