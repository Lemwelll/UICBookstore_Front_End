<template>
  <v-row no-gutters>
    <v-col cols="12" lg="3">
      <v-img src="/image-1.svg" height="100vh" cover></v-img>
    </v-col>

    <v-col cols="12" lg="9" class="fill-height">
      <v-row no-gutters>
        <v-col cols="12" lg="6">
          <v-col cols="12" lg="9">
            <v-form v-model="valid" @submit.prevent="recoverPassword(form)">
              <v-row no-gutters class="pa-8">
                <v-col cols="12" class="text-h4 mb-8"> Reset Password </v-col>
                <v-col cols="12" class="text-h5"> Recover your account </v-col>
                <v-col cols="12" class="text-subtitle-1 font-weight-bold mb-4">
                  Have an account?
                  <nuxt-link :to="{ name: 'login' }">Log in now</nuxt-link>
                </v-col>
                <v-col cols="12" class="my-2">
                  <v-text-field
                    v-model="form.email"
                    label="Email Address"
                    :rules="[requiredInput, validEmail]"
                    hint="The email address you used to sign up"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" class="mt-2">
                  <v-btn
                    size="small"
                    rounded="lg"
                    class="font-weight-bold"
                    elevation="2"
                    :disabled="!valid"
                    type="submit"
                  >
                    next
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import useUtils from "~/composables/useUtils";
const { requiredInput, validEmail } = useUtils();
const valid = ref(false);
const form = ref({
  given_name: "",
  surname: "",
  email: "",
  password: "",
});

function recoverPassword(form) {
  try {
    $fetch(`/api/users/forgot-password`, {
      method: "POST",
      body: form,
    });
    useRoute().push({ name: "home" });
  } catch (error) {}
}

definePageMeta({
  layout: "plain",
});
</script>
