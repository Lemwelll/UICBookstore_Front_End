<template>
  <v-row no-gutters class="pa-4">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" xxl="4" xl="4" lg="4">
          <v-text-field label="Search" rounded="xl" hide-details v-model="search">
          </v-text-field>
        </v-col>

        <v-col cols="12" xxl="2" xl="2" lg="2">
          <v-select
            v-model="filterCategory"
            :items="categories"
            label="Filter By Category"
            rounded="xl"
            hide-details
          >
          </v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" class="mt-4">
      <v-row no-gutters>
        <v-col v-if="!searchCompute.length" cols="12" class="text-center">
          No Data.
        </v-col>

        <v-col v-else cols="12">
          <v-row>
            <template
              v-for="inventoryItem in searchCompute"
              :key="inventoryItem.name"
            >
              <v-col cols="12" xxl="3" xl="3" lg="3">
                <v-card width="100%">
                  <v-row no-gutters class="pa-4">
                    <v-col cols="12">
                      <v-img
                        v-if="inventoryItem.image"
                        :src="inventoryItem.image"
                        height="250px"
                        width="100%"
                      ></v-img>

                      <v-sheet
                        v-else
                        color="grey-lighten-3"
                        width="100%"
                        height="250px"
                      ></v-sheet>
                    </v-col>
                    <v-col
                      cols="12"
                      class="text-subtitle-1 text-center font-weight-black mt-2"
                    >
                      {{ inventoryItem.name }}
                    </v-col>
                    <v-col cols="12" class="mt-2">
                      Price:
                      {{ formatNumberIntoString(inventoryItem.price) }}</v-col
                    >
                    <v-col cols="12" class="mt-2">
                      Stock:
                      {{ inventoryItem.stock }}</v-col
                    >

                    <v-col
                      v-if="inventoryItem.category === 'uniform'"
                      cols="12"
                      class="mt-2"
                    >
                      <v-select
                        v-model="inventoryItem.size"
                        :items="sizes"
                        density="compact"
                        label="Size"
                        hide-details
                      ></v-select>
                    </v-col>

                    <v-col cols="12" class="mt-4">
                      <v-row no-gutters justify="center">
                        <v-btn
                          size="small"
                          class="text-uppercase font-weight-black"
                          variant="tonal"
                          :disabled="
                            inventoryItem.category === 'uniform'
                              ? !(inventoryItem.stock && inventoryItem.size)
                              : false
                          "
                          @click="addToCart(inventoryItem)"
                        >
                          add to cart</v-btn
                        >
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
import axios from 'axios';

const { formatNumberIntoString } = useUtils();
const { sizes, filterItems, category, categories } = useInventory();
const { addToCart } = useCart();


const items = ref([]);
const filterCategory = ref("all");
const search = ref("");

onMounted( () => {


  axios.get("http://localhost:8000/api/uniform/").then(data => {
    items.value.push(...data.data)
  }).catch(err => {
    console.error(err)
  })

  axios.get("http://localhost:8000/api/book/").then(data => {
    items.value.push(...data.data)
  }).catch(err => {
    console.error(err)
  })

} )

const filtered = computed( () => {

  if (filterCategory.value === "all") {
    return items.value
  } else {
    return items.value.filter(item => item.category === filterCategory.value)
  }
} );

const searchCompute = computed( () => {

  return filtered.value.filter(item => {
    return item.name.toLowerCase().includes(search.value.toLowerCase())
  } )

} )
</script>
