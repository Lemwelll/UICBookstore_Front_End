<template>
  <v-row no-gutters>
    <v-col
      cols="12"
      xxl="6"
      xl="6"
      lg="6"
      md="6"
      class="fill-height d-md-block d-sm-none d-none"
    >
      <v-img src="/img.svg" height="100vh" cover></v-img>
    </v-col>

    <v-col cols="12" xxl="6" xl="6" lg="6" md="6">
      <v-row no-gutters class="pa-8 fill-height">
        <v-form v-model="valid" @submit.prevent="return">
          <v-col cols="12" class="text-h4 font-weight-black mb-8">
            UIC Bookstore Administrator Portal
          </v-col>
          <v-col cols="12" class="text-h5 mb-6"> Admin Portal Sign In </v-col>
          <v-col cols="12" xxl="8" xl="8" lg="8" justify-self="center">
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Username"
                  :rules="[(v) => !!v || 'Required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="my-2">
                <v-text-field
                  v-model="password"
                  :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[requiredInput]"
                  :type="show ? 'text' : 'password'"
                  name="input-10-2"
                  label="Password"
                  hint="At least 8 characters"
                  class="input-group--focused"
                  @click:append-inner="show = !show"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="text-subtitle-2 font-weight-bold mb-4">
                <v-row no-gutters justify="center">
                  <v-checkbox
                    density="compact"
                    class="text-subtitle-2"
                    label="Remember me"
                    hide-details
                  ></v-checkbox>
                </v-row>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-row no-gutters>
                  <v-col cols="12" xxl="6" xl="6" lg="6">
                    <v-btn
                      block
                      size="small"
                      rounded="lg"
                      class="font-weight-bold"
                      elevation="2"
                      :disabled="!valid"
                      @click="login()"
                    >
                      Sign In
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-form>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import useUtils from "~/composables/useUtils";
import axios from 'axios';
definePageMeta({
  layout: "plain",
});
const { requiredInput, validEmail, minPasswordLength } = useUtils();
const show = ref(false);
const valid = ref(false);
const email = ref("");
const password = ref("");

function login() {

console.log(email, password);

const formData = new FormData();

const data: any = {
  username: email.value,
  password: password.value
}

// convert data into formData
Object.keys(data).forEach(key => formData.append(key, data[key]));

axios.post('http://localhost:8000/api/admin/login', formData).then( (res: any) => {
  if (res.data.adminID) {
    localStorage.setItem('adminLogin', JSON.stringify(res.data));
    alert(`Admin Login success. Welcome ${res.data.username}`)
    location.href = '/admin/dashboard'
  } else {
    alert('Login Error. Please try again!')
  }
}).catch( (err: any) => {
  alert('Oops, something went wrong');
  console.error(err);
} )


}

</script>
