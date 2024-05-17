<template>
  <v-row no-gutters class="fill-height" align-content="center">
    <v-col v-if="valid" cols="12" class="text-center">
      Thank you for verifying your email address. You can now log in.
    </v-col>

    <v-col v-else cols="12" class="text-center">
      Invalid verification link, it either the link has expired or was already
      used. Want to try again?
      <nuxt-link :to="{ name: 'sign-up' }">Sign Up</nuxt-link>
    </v-col>
  </v-row>
</template>

<script setup>
const valid = ref(false);

onMounted(() => {
  setTimeout(async () => {
    const route = useRoute();
    const { error } = await useLocalFetch(
      `/api/users/sign-up/${route.query.id}`,
      { method: "POST" },
    );
    if (error.value) valid.value = false;
    else valid.value = true;
  }, 2000);
});

definePageMeta({
  layout: "plain",
});
</script>
