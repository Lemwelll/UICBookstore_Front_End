<template>
  <v-row no-gutters class="pa-4" justify="center">
    <v-col cols="12">
      <v-btn
        small
        variant="outlined"
        rounded="xl"
        :to="{ name: 'reservations' }"
      >
        view reservations
      </v-btn>
      <v-btn
        small
        variant="outlined"
        rounded="xl"
        :to="{ name: 'store' }"
        class="ml-2"
      >
        go back to store
      </v-btn>
    </v-col>
    <v-col cols="12" class="mt-4">
      <v-row no-gutters>
        <v-col v-if="!cartItems.length" cols="12" class="text-center">
          No Data.
        </v-col>

        <v-col v-else cols="12">
          <v-row>
            <template v-for="cartItem in cartItems" :key="cartItem.name">
              <v-col cols="12">
                <v-card width="100%">
                  <v-row no-gutters class="pa-4">
                    <v-col cols="1">
                      <v-sheet
                        color="grey-lighten-3"
                        width="100%"
                        height="100%"
                      ></v-sheet>
                    </v-col>

                    <v-col cols="5">
                      <v-row no-gutters class="px-4">
                        <v-col
                          cols="12"
                          class="text-subtitle-1 font-weight-black"
                        >
                          {{ cartItem.name }}
                        </v-col>
                        <v-col cols="12" class="mt-2">
                          Price:
                          {{ formatNumberIntoString(cartItem.price) }}</v-col
                        >
                        <v-col cols="12" class="mt-2">
                          Quantity:
                          <v-btn
                            icon
                            size="xs"
                            variant="outlined"
                            density="compact"
                            @click="increaseItemStock(cartItem)"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                          {{ cartItem.stock }}
                          <v-btn
                            icon
                            size="xs"
                            variant="outlined"
                            density="compact"
                            @click="reduceItemStock(cartItem)"
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                        </v-col>

                        <v-col cols="12" class="mt-2">
                          Size: {{ cartItem.size }}
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="6">
                      <v-row
                        no-gutters
                        class="fill-height"
                        justify="end"
                        align-content="center"
                      >
                        Total:
                        {{
                          formatNumberIntoString(
                            cartItem.stock * cartItem.price,
                          )
                        }}
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
  definePageMeta({
    layout: "cart",
  });
  const { items: cartItems, increaseItemStock, reduceItemStock } = useCart();
  const { formatNumberIntoString } = useUtils();

  console.log('cartItems', cartItems)
</script>
