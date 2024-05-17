<template>
  <v-app>
    <v-app-bar class="px-2" elevation="1">
      <v-btn icon class="mr-2">
        <v-icon color="primary">mdi-account</v-icon>
      </v-btn>
      Account
      <v-text-field
        label="search"
        hide-details
        class="ml-4"
        rounded="xl"
      ></v-text-field>
      <v-btn icon class="mx-2">
        <v-icon color="primary">mdi-bell-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup></script>
