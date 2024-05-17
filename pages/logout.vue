<template>
  <v-row no-gutters class="fill-height" align-content="center">
    <v-col cols="12" class="text-center">
      You have been logged out. Login again?
      <nuxt-link :to="{ name: 'login' }">Login</nuxt-link>
    </v-col>
  </v-row>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});
const { logout } = useLocalAuth();
onMounted(() => {
  logout();
});
</script>
