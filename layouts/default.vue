<template>
  <v-app>
    <v-app-bar class="px-2" elevation="1">
      <span
        class="font-weight-bold"
        style="cursor: pointer"
        @click="useRouter().push({ name: 'home' })"
      >
        UIC Online Bookstore Reservation System
      </span>
      <v-spacer></v-spacer>
      <v-btn icon class="mx-1" :to="{ name: 'notification' }">
        <v-badge :content="notifications.filter(notification => notification.read === 0).length" color="primary">
          <v-icon color="primary">mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon class="mx-1" :to="{ name: 'cart' }"> 
        <v-badge :content="items.length" color="primary">
          <v-icon color="primary">mdi-cart-outline</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon class="mr-2" :to="{ name: 'account' }">
        <v-icon color="primary">mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
const { items } = useCart();
const { notifications } = useNotification();
</script>
