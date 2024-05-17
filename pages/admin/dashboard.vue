<template>
  <v-row
    no-gutters
    class="pa-4 fill-height"
    justify="center"
    align-content="center"
  >
    <v-col cols="12" xxl="6" xl="6" lg="6">
      <v-card class="pa-3">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3>Stocks Management List</h3>
          <v-btn variant="outlined" color="primary" @click="isModalActive = true">
            <v-icon>mdi-plus</v-icon> New Stock
          </v-btn>
        </div>
        <!-- <v-table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in items" :key="i">
              <td>{{ item.category }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.size }}</td>
              <td>₱ {{ item.price }}.00</td>
              <td>{{ item.bookquantityAvailability || uniformQuantityAvailability }}</td>
              <td>
                <v-btn icon flat small class="text-orange" size="small" @click="editItem(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon flat small class="text-red" size="small" @click="deleteItem(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
            <tr v-if="!items.length">
              <td colspan="6" class="text-center">No data</td>
            </tr>
          </tbody>
        </v-table> -->
        <v-text-field label="Search stocks" size="lg" prepend-inner-icon="mdi-magnify" v-model="search"></v-text-field>
        <v-data-table :items="items" :headers="headers" :search="search" :items-per-page="50">
          <template v-slot:item.actions="{ value, item }">
            <v-btn icon flat small class="text-orange" size="small" @click="editItem(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon flat small class="text-red" size="small" @click="deleteItem(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>



        <v-dialog max-width="500" v-model="isModalActive">
          <v-card :title="modalTitle">
              <div class="py-5 px-5 pt-0">
                <v-divider class="my-5"></v-divider>
                <v-select label="Product Type" :disabled="editMode" v-model="productType" :items="['uniform', 'book']" />
                <div v-if="productType === 'uniform'">
                  <v-text-field label="mngstore" v-model="mngstore" class="my-3" />
                  <v-text-field label="type" v-model="type" class="my-3" />
                  <v-select label="size" v-model="size" :items="['S', 'M', 'L', 'XL', 'XXL', 'XXXL']" class="my-3" />
                  <v-text-field label="uniformQuantityAvailability" type="number" v-model.number="uniformQuantityAvailability" class="my-3" />
                  <v-text-field label="uniformPriceDetails" type="number" v-model.number="uniformPriceDetails" class="my-3" />
                </div>
                <div v-if="productType === 'book'">
                  <v-text-field label="mngbkstore" v-model="mngbkstore" class="my-3" />
                  <v-text-field label="mngstore" v-model="mngstore" class="my-3" />
                  <v-text-field label="bookTitle" v-model="bookTitle" class="my-3" />
                  <v-text-field label="bookquantityAvailability" type="number" v-model.number="bookquantityAvailability" class="my-3" />
                  <v-text-field label="bookpriceDetails" type="number" v-model.number="bookpriceDetails" class="my-3" />
                </div>
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  :text="editMode ? `UPDATE` : `SAVE`"
                  color="green"
                  @click="save()"
                ></v-btn>
                <v-btn
                  text="Close Dialog"
                  @click="isModalActive = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
      </v-dialog>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import axios from 'axios';

const { isAdmin } = useLocalAuth();

definePageMeta({
  layout: "admin-default",
});

const userInfo = ref({});

const search = ref('');

const isModalActive = ref(false);

const productType = ref('uniform');
const editMode = ref(false);
const editID = ref(0);
const modalTitle = ref('Add New Stocks');

const mngstore = ref('');
const type = ref('');
const size = ref('S');
const uniformQuantityAvailability = ref(1);
const uniformPriceDetails = ref(50);

const mngbkstore = ref('');
const bookTitle = ref('');
const bookquantityAvailability = ref(1);
const bookpriceDetails = ref(50);

const items = ref([]);

const headers = [
  { title: 'Category', key: 'category' },
  { title: 'Name', key: 'name' },
  { title: 'Price', key: 'price' },
  { title: 'Size', key: 'size' },
  { title: 'Quantity', key: 'stock' },
  { title: 'Actions', key: 'actions', sortable: false },
]

onMounted(() => {
  userInfo.value = localStorage.getItem('studentLogin') ? JSON.parse(localStorage.getItem('studentLogin')) : {};

  console.log(userInfo.value);

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
})


function save() {

  if (!editMode.value) {

    if (productType.value === 'uniform') {
  
      const formData = new FormData();
  
      formData.append('mngstore', mngstore.value);
      formData.append('type', type.value);
      formData.append('size', size.value);
      formData.append('uniformQuantityAvailability', uniformQuantityAvailability.value);
      formData.append('uniformPriceDetails', uniformPriceDetails.value);
  
      axios.post('http://localhost:8000/api/uniform/', formData).then(data => {
  
        if (data.data.uniformID) {
          alert('Uniform added successfully!');
          window.location.reload();
        }
        else {
          alert('Something went wrong!');
          console.error('Error adding uniform: ',data.data);
        }
      }).catch(err => {
          alert('Something went wrong!');
          console.error('Error adding uniform: ',err);
      })
  
    }
  
    if (productType.value === 'book') {
      const formData = new FormData();
  
      formData.append('mngstore', mngstore.value);
      formData.append('mngbkstore', mngbkstore.value);
      formData.append('mngstore', 'mngstore');
      formData.append('bookTitle', bookTitle.value);
      formData.append('bookquantityAvailability', bookquantityAvailability.value);
      formData.append('bookpriceDetails', bookpriceDetails.value);
  
      axios.post('http://localhost:8000/api/book/', formData).then(data => {
  
        if (data.data.bookID) {
          alert('Book added successfully!');
          window.location.reload();
        }
        else {
          alert('Something went wrong!');
          console.error('Error adding uniform: ',data.data);
        }
      }).catch(err => {
          alert('Something went wrong!');
          console.error('Error adding uniform: ',err);
      })
    }
  }
  else {

    if (productType.value === 'uniform') {
  
      const formData = new FormData();

      formData.append('mngstore', mngstore.value);
      formData.append('type', type.value);
      formData.append('size', size.value);
      formData.append('uniformQuantityAvailability', uniformQuantityAvailability.value);
      formData.append('uniformPriceDetails', uniformPriceDetails.value);

      axios.put('http://localhost:8000/api/uniform/'+editID.value, formData).then(data => {

        if (data.data.message) {
          alert('Uniform edited successfully!');
          window.location.reload();
        }
        else {
          alert('Something went wrong!');
          console.error('Error adding uniform: ',data.data);
        }
      }).catch(err => {
          alert('Something went wrong!');
          console.error('Error adding uniform: ',err);
      })

    }

    if (productType.value === 'book') {
      const formData = new FormData();
  
      formData.append('mngbkstore', mngbkstore.value);
      formData.append('mngstore', mngbkstore.value);
      formData.append('bookTitle', bookTitle.value);
      formData.append('bookquantityAvailability', bookquantityAvailability.value);
      formData.append('bookpriceDetails', bookpriceDetails.value);
  
      axios.put('http://localhost:8000/api/book/'+editID.value, formData).then(data => {
  
        if (data.data.message) {
          alert('book edited successfully!');
          window.location.reload();
        }
        else {
          alert('Something went wrong!');
          console.error('Error adding uniform: ',data.data);
        }
      }).catch(err => {
          alert('Something went wrong!');
          console.error('Error adding uniform: ',err);
      })
    }

  }



}

function editItem(item) {

  editMode.value = true;
  editID.value = item.id;

  console.log(item);

  if (item.category == 'uniform') {
    productType.value = 'uniform';
    modalTitle.value = `Edit Uniform #${item.id}`
    mngstore.value = item.mngstore;
    type.value = item.name;
    size.value = item.size;
    uniformQuantityAvailability.value = item.stock;
    uniformPriceDetails.value = item.price;
  }

  if (item.category == 'book') {
    productType.value = 'book';
    modalTitle.value = `Edit Book #${item.id}`
    mngbkstore.value = item.mngstore;
    bookTitle.value = item.name;
    bookquantityAvailability.value = item.stock;
    bookpriceDetails.value = item.price;
  }


  isModalActive.value = true;

}

// watch isModalActive
watch(isModalActive, () => {
  if (!isModalActive.value) {
    editMode.value = false;
    editID.value = 0;
    modalTitle.value = `Add New Stocks`
    productType.value = 'uniform';
    mngstore.value = '';
    type.value = '';
    size.value = 'S';
    uniformQuantityAvailability.value = 1;
    uniformPriceDetails.value = 50;
    mngbkstore.value = '';
    bookTitle.value = '';
    bookquantityAvailability.value = 1;
    bookpriceDetails.value = 50;
  }
});

function deleteItem(item) {

  if (!confirm('ARe you sure you want to delete this item?')) return;

  if (item.category == 'uniform') {
    axios.delete('http://localhost:8000/api/uniform/'+item.id).then(data => {
  
      if (data.data.message) {
        alert('uniform deleted successfully!');
        window.location.reload();
      }
      else {
        alert('Something went wrong!');
        console.error('Error adding uniform: ',data.data);
      }
    }).catch(err => {
        alert('Something went wrong!');
        console.error('Error adding uniform: ',err);
    })
  }
  else {
    if (item.category == 'book') {
    axios.delete('http://localhost:8000/api/book/'+item.id).then(data => {
  
      if (data.data.message) {
        alert('Book deleted successfully!');
        window.location.reload();
      }
      else {
        alert('Something went wrong!');
        console.error('Error adding uniform: ',data.data);
      }
    }).catch(err => {
        alert('Something went wrong!');
        console.error('Error adding uniform: ',err);
    })
  }
  }

}

function logout() {
  localStorage.removeItem('studentLogin');
  alert('Successfuly logged out!');
  location.href = '/login';
}
</script>
