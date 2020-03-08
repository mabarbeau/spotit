<template>
  <div>
    <ol :start="list.from">
      <li v-for="(item, index) in list.data" :key="index">
        <router-link v-if="childName" :to="{ name: childName, params: item }">
          {{ item[text] }}
        </router-link>
        <span v-else>
          {{ item[text] }}
        </span>
      </li>
    </ol>
    <router-link
      v-if="list.prevPageUrl"
      :to="{ name, query: { page: list.currentPage - 1 } }"
    >
      &lt;
    </router-link>
    Page {{ list.currentPage }} of
    <router-link
      v-if="list.lastPage !== list.currentPage"
      :to="{ name, query: { page: list.lastPage } }"
    >
      {{ list.lastPage }}
    </router-link>
    <span v-else>
      {{ list.lastPage }}
    </span>
    <router-link
      v-if="list.nextPageUrl"
      :to="{ name, query: { page: list.currentPage + 1 } }"
    >
      &gt;
    </router-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
