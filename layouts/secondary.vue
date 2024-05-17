<template>
  <v-app>
    <v-app-bar flat density="comfortable" style="border-width: thin">
      <v-row no-gutters class="px-4">
        <v-col cols="12">
          <v-row no-gutters>
            <v-col cols="6">
              <v-row class="fill-height" no-gutters align-content="center">
                <span
                  class="font-weight-bold"
                  style="cursor: pointer"
                  @click="useRouter().push({ name: 'dashboard' })"
                >
                  UIC online bookstore reservation system
                </span>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row no-gutters justify="end">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  location="bottom"
                  offset="10"
                >
                  <template #activator="{ props }">
                    <v-btn icon v-bind="props">
                      <v-avatar color="grey"> </v-avatar>
                    </v-btn>
                  </template>

                  <v-card min-width="300">
                    <v-list>
                      <v-list-item title="Name" subtitle="Details">
                      </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn variant="text" :to="{ name: 'logout' }">
                        logout
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer
      permanent
      floating
      class="default-bg"
      elevation="0"
      location="left"
      width="200"
    >
      <v-row no-gutters>
        <v-col cols="12">
          <v-list density="compact">
            <template v-for="route in routes" :key="route.text">
              <v-list-item
                class="text-subtitle-2"
                color="forest-green"
                active-class="font-weight-black"
                :to="{ name: route.name }"
                >{{ route.text }}</v-list-item
              >
            </template>
          </v-list>
        </v-col>
      </v-row>
    </v-navigation-drawer>

    <v-main>
      <v-row no-gutters class="px-4 py-8"> <slot /> </v-row>
    </v-main>
  </v-app>
</template>

<script setup>
const menu = ref(false);

const routes = ref([]);
</script>
