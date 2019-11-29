<template>
  <div>
    <ol
      :start="list.from"
    >
      <li
        v-for="(item, index) in list.data"
        :key="index"
      >
        <router-link
          v-if="childName"
          :to="{ name: childName, params: item}"
        >
          {{ item[text] }}
        </router-link>
        <span v-else>
          {{ item[text] }}
        </span>
      </li>
    </ol>
    <router-link
      v-if="list.prev_page_url"
      :to="{ name, query: { page: list.current_page - 1 }}"
    >
      &lt;
    </router-link>
    Page {{ list.current_page }} of
    <router-link
      v-if="list.last_page !== list.current_page"
      :to="{ name, query: { page: list.last_page }}"
    >
      {{ list.last_page }}
    </router-link>
    <span v-else>
      {{ list.last_page }}
    </span>
    <router-link
      v-if="list.next_page_url"
      :to="{ name, query: { page: list.current_page + 1 }}"
    >
      &gt;
    </router-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BasePagination',
  props: {
    name: {
      type: String,
      required: true,
    },
    list: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    childName: {
      type: String || null,
      default: null,
    },
  },
})
</script>

<style>
  a {
    color: blue!important
  }
</style>
