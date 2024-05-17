<template>
  <v-app>
    <v-app-bar class="px-2" elevation="1">
      <span
        class="font-weight-bold"
        style="cursor: pointer"
        @click="useRouter().push('/admin/dashboard/')"
      >
        UIC Online Bookstore Admin Panel
      </span>
      <v-spacer></v-spacer>
      <v-btn icon class="mx-1" to="/admin/reservations">
        <v-icon color="primary">mdi-cart</v-icon>
      </v-btn>
      <v-btn icon class="mr-2" @click="logout()">
        <v-icon color="primary">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
const { items } = useCart();

function logout() {
  localStorage.removeItem('adminLogin');
  alert('Successfuly logged out!');
  location.href = '/admin';
}
</script>
