<template>
  <component :is="tag">
    <li
      v-for="(item, index) in value"
      :key="index"
      v-bind="{ ...outerAttrs, ...(item.outer || {}) }"
    >
      <router-link
        v-if="item.to"
        :to="item.to"
        v-bind="{ ...innerAttrs, ...(item.inner || {}) }"
      >
        {{ item.label }}
      </router-link>
      <span v-else>
        {{ item.label }}
      </span>
    </li>
  </component>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      default: undefined,
    },
    outerAttrs: {
      type: Object,
      default() {
        return {}
      },
    },
    innerAttrs: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    tag() {
      return this.options.tag === 'ol' ? 'ol' : 'ul'
    },
  },
})
</script>
