<template>
  <v-app>
    <v-app-bar class="px-2" elevation="1">
      <span
        class="font-weight-bold"
        style="cursor: pointer"
        @click="useRouter().push({ name: 'home' })"
      >
        UIC Bookstore Reservation System
      </span>
      <v-spacer></v-spacer>
      <v-btn icon class="mx-1">
        <v-icon color="primary">mdi-bell-outline</v-icon>
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

    <v-footer app height="88" color="primary" style="border-width: thin">
      <v-row no-gutters class="fill-height" align-content="center">
        <v-col cols="6" class="text-h6 font-weight-bold">
          Total Payment: {{ formatNumberIntoString(total) }}
        </v-col>

        <v-col cols="6">
          <v-row no-gutters justify="end">
            <v-btn
              small
              variant="outlined"
              rounded="xl"
              :disabled="!items.length"
              @click="proceedToReservation(reservation)"
            >
              Click to Confirm Reservation
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup>
import axios from 'axios';

const { items, total } = useCart();
const { formatNumberIntoString } = useUtils();

const { addReservationItem, reservation } = useReservation();

function saveCart() {

  const formData = new FormData()

  const userInfo = JSON.parse(localStorage.getItem('studentLogin'));

  if (!userInfo.studentID) {
    alert('Please login first');
  }

  const data = {
    createDate: new Date(),
    expiryDate: new Date(),
    numofItems: items.value.length,
    totalAmount: items.value.reduce(
      (acc, item) => acc + item.totalPrice, 0
    ),
    studentID: userInfo.studentID,
    items: JSON.stringify(items.value)
  }


  console.log('DATAAA', data)

 
  Object.keys(data).forEach(key => {
    console.log(key, data[key]);
    formData.append(key, data[key]);
  });

  axios({
    method: 'post',
    url: "http://localhost:8000/api/reservationdetails/",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then(data => {
    console.log('Cart added: ', data.data)
    alert('Cart successfuly added!');
  }).catch(err => {
    alert('Opps, something went wrong');
    console.error('Cart add error', err)
  })

}

function proceedToReservation(item) {
  addReservationItem(item);
  saveCart();
  items.value = [];
}
</script>
