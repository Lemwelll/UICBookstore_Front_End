<template>
  <v-row
    no-gutters
    class="pa-4 fill-height"
    justify="center"
    align-content="center"
  >
    <v-col cols="12" xxl="6" xl="6" lg="6">
      <v-card>
        <v-row no-gutters class="pa-4">
          <v-col cols="4">
            <v-icon size="200">mdi-account-circle-outline</v-icon>
          </v-col>

          <v-col cols="8">
            <v-row no-gutters class="fill-height" align-content="center">
              <v-col cols="12">
                Full Name: <span class="font-weight-black">{{ userInfo.firstName }} {{ userInfo.lastName }}</span>
              </v-col>

              <v-col cols="12">
                Student ID: <span class="font-weight-black">{{ userInfo.studentID }}</span>
              </v-col>

              <v-col cols="12">
                Email: <span class="font-weight-black">{{ userInfo.uicEmail }}</span>
              </v-col>
              <v-col cols="12">
                <v-btn class="mt-5" outlined @click="logout()">Logout</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const { isAdmin } = useLocalAuth();


const userInfo = ref({});

onMounted(() => {
  userInfo.value = localStorage.getItem('studentLogin') ? JSON.parse(localStorage.getItem('studentLogin')) : {};

  console.log(userInfo.value);
})

function logout() {
  localStorage.removeItem('studentLogin');
  alert('Successfuly logged out!');
  location.href = '/login';
}
</script>
