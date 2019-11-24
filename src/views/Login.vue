<template>
  <div class="bg-gray-200 absolute h-full w-full flex justify-center">
    <div class=" w-full max-w-xs self-center pb-10">
      <div id="my-signin2" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

function onSuccess(googleUser: any) {
  console.log(`Logged in as: ${googleUser.getAuthResponse().id_token}`)
}
function onFailure(error: any) {
  console.log(error)
}

export default Vue.extend({
  name: 'Login',
  mounted() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: onSuccess,
      onfailure: onFailure,
    })
  },
})
</script>
