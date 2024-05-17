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
                <v-col cols="12" class="text-h5"> Change your password </v-col>
                <v-col cols="12" class="my-2">
                  <v-text-field
                    v-model="form.password"
                    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[requiredInput, minPasswordLength]"
                    :type="show ? 'text' : 'password'"
                    name="input-10-2"
                    label="Password"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append-inner="show = !show"
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
const { requiredInput, minPasswordLength } = useUtils();
const valid = ref(false);
const show = ref(false);
const form = ref({
  id: useRoute().params.id,
  password: "",
});

function recoverPassword(form) {
  try {
    $fetch(`/api/users/forgot-password`, {
      method: "PUT",
      body: form,
    });
    useRouter().push({ name: "forgot-password-success" });
  } catch (error) {}
}

definePageMeta({
  layout: "plain",
});
</script>
