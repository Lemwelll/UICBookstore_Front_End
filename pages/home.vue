<template>
  <v-row no-gutters class="fill-height" align-content="center">
    <v-col cols="12" xxl="6" xl="6" lg="6" class="pa-16">
      <v-row no-gutters class="fill-height" align-content="center">
        <v-col
          cols="12"
          class="text-center text-h4 font-weight-black text-secondary"
        >
          UIC Bookstore Online
        </v-col>
        <v-col
          cols="12"
          class="text-center text-h4 font-weight-black text-secondary"
        >
          Reservation System
        </v-col>
        <v-col
          cols="12"
          class="text-center text-h4 font-weight-black text-secondary"
        >
          (Fr. Selga Campus)
        </v-col>

        <v-col cols="12" class="mt-6">
          This UIC Bookstore Online Reservation System was made by the 2nd Year
          Student of Bachelor of Science in Information Technology. We encourage
          you to use this platform in order to have a applicable and usable
          website to encourage students to have this kind of platform online.
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" xxl="6" xl="6" lg="6" class="pa-16">
      <v-img src="home.svg"></v-img>
    </v-col>

    <v-col cols="12" class="px-16">
      <v-row justify="end" class="pr-4">
        <v-btn
          variant="outlined"
          color="primary"
          rounded="xl"
          class="text-uppercase"
          append-icon="mdi-arrow-right"
          :to="{ name: 'store' }"
        >
          Go to Store
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup></script>
