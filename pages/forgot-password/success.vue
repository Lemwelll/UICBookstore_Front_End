<template>
  <v-row no-gutters class="fill-height" align-content="center">
    <v-col cols="12" class="text-center">
      Successfully updated your password. You can now
      <nuxt-link :to="{ name: 'login' }"> login </nuxt-link>.
    </v-col>
  </v-row>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});
</script>
