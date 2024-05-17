<template>
  <v-app>
    <v-app-bar density="comfortable" class="px-6" elevation="1">
      <span
        class="font-weight-bold"
        style="cursor: pointer"
        @click="useRouter().push({ name: 'dashboard' })"
      >
        Forgot Password
      </span>
      <v-spacer></v-spacer>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="bottom"
        offset="10"
      >
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="info">
              <v-img src="/profile-avatar.jpeg" alt="UIC"></v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-card min-width="300">
          <v-list>
            <v-list-item
              prepend-avatar="/profile-avatar.jpeg"
              title="David Baldonado"
              subtitle="Founder of Scoped World"
            >
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="logout()"> Logout </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main class="default-bg">
      <v-row no-gutters class="pa-4">
        <slot />
      </v-row>
    </v-main>
  </v-app>
</template>

<script setup>
const menu = ref(false);

const { logout } = useLocalAuth();
</script>

<style>
.v-navigation-drawer {
  border: none !important;
}
</style>
