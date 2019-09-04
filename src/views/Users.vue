<template>
  <div>
    <h1 />
    <ul
      v-for="(user, index) in users.data"
      :key="index"
    >
      <li>{{ user.name }}</li>
    </ul>
    <router-link
      v-if="users.prev_page_url"
      :to="{ name: 'users', query: { page: users.current_page - 1 }}"
    >
      &lt;
    </router-link>
    Page {{ users.current_page }} of
    <router-link
      v-if="users.last_page !== users.current_page"
      :to="{ name: 'users', query: { page: users.last_page }}"
    >
      {{ users.last_page }}
    </router-link>
    <span v-else>
      {{ users.last_page }}
    </span>
    <router-link
      v-if="users.next_page_url"
      :to="{ name: 'users', query: { page: users.current_page + 1 }}"
    >
      &gt;
    </router-link>
  </div>
</template>
<script lang="ts">
import { mapState } from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  name: 'Users',
  computed: mapState(['users']),
  watch: {
    $route(to, from) {
      this.load();
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$store.dispatch('loadUsers');
    },
  },
});
</script>
