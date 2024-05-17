<template>
  <v-row no-gutters class="pa-4" justify="center">
    <v-col v-if="isAdmin" cols="12">
      <v-row>
        <v-col cols="12" xxl="4" xl="4" lg="4">
          <v-card width="100%">
            <v-row no-gutters class="pa-8">
              <v-col cols="12"> Earnings(Monthly) </v-col>
              <v-col cols="12" class="text-h6 font-weight-bold">
                PHP 25,000.00
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" xxl="4" xl="4" lg="4">
          <v-card width="100%">
            <v-row no-gutters class="pa-8">
              <v-col cols="12"> Earnings(Daily) </v-col>
              <v-col cols="12" class="text-h6 font-weight-bold">
                PHP 5,000.00
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="mt-4">
      <v-card flat style="border-width: thin">
        <v-table density="compact" fixed-header style="max-height: 67vh">
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Date</th>
              <th class="text-left">Student ID</th>
              <th class="text-left">Student Name</th>
              <th class="text-left">Items</th>
              <th class="text-left">Total</th>
              <th class="text-left">Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(reservationItem, index) in reservationList"
              :key="reservationItem.id"
            >
              <tr>
                <td>{{ reservationItem.id }}</td>
                <td>{{ reservationItem.date }}</td>
                <td>{{ reservationItem.student }}</td>
                <td>{{ reservationItem.studentName }}</td>
                <td><v-chip class="ma-2 " v-for="item in JSON.parse(JSON.parse(reservationItem.items))" :key="item.id">
                  <v-icon class="mr-2">mdi-cart</v-icon>
                  <!-- [P {{ item.price }}.00] {{ item.name }} -->
                  [Quantity: {{ item.stock }}] [₱{{ item.totalPrice }}.00] {{ item.name }}
                </v-chip></td>
                <td>{{ formatNumberIntoString(reservationItem.total) }}</td>
                <td>{{ reservationItem.status }}</td>
                <td>
                  <v-row no-gutters align="center" justify="center">
                    <v-btn
                      v-if="isAdmin"
                      variant="text"
                      density="compact"
                      icon
                      size="small"
                      class="mx-1"
                      :disabled="reservationItem.status === 'Completed'"
                      @click="setReservationStatus(reservationItem, 'completed', index)"
                    >
                      <v-icon>mdi-check-circle</v-icon>
                      <v-tooltip activator="parent" location="bottom">
                        Complete
                      </v-tooltip>
                    </v-btn>

                    <v-btn
                      v-if="!isAdmin"
                      variant="text"
                      density="compact"
                      icon
                      size="small"
                      class="mx-1"
                      :disabled="reservationItem.status === 'Completed'"
                      @click="deleteReservation(reservationItem)"
                    >
                      <v-icon size="small"> mdi-trash-can-outline </v-icon>
                      <v-tooltip activator="parent" location="bottom">
                        Delete
                      </v-tooltip>
                    </v-btn>

                    <v-btn
                      v-if="isAdmin"
                      variant="text"
                      density="compact"
                      icon
                      size="small"
                      class="mx-1"
                      :disabled="reservationItem.status === 'Completed'"
                      @click="setReservationStatus(reservationItem, 'declined', index)"
                    >
                      <v-icon> mdi-close-circle </v-icon>
                      <v-tooltip activator="parent" location="bottom">
                        Decline
                      </v-tooltip>
                    </v-btn>
                  </v-row>
                </td>
              </tr>
            </template>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import axios from 'axios';

const {
  reservationItems,

  completeReservation,
  declineReservation,
} = useReservation();
const { formatNumberIntoString } = useUtils();
// const { isAdmin } = useLocalAuth();

const reservationList = ref([]);

const isAdmin = ref(false);

onMounted( () => {

const getStudentLogin = JSON.parse(localStorage.getItem('studentLogin'));

axios.post("http://localhost:8000/api/reservationdetails/"+getStudentLogin.studentID).then(data => {
  reservationList.value = data.data
}).catch(err => {
  console.error(err)
})

} )

function removeReservationItem(item) {
  const index = reservationList.value.findIndex((i) => i.id === item.id);
  reservationList.value.splice(index, 1);
}
function deleteReservation(reservationItem) {

  axios.delete(`http://localhost:8000/api/reservationdetails/${reservationItem.id}`).then(data => {
    removeReservationItem(reservationItem);
    alert('Reservation deleted!');
  }).catch(err => {
    console.error(err);
    alert('Oops, something went wrong =( ');
  })

}

function setReservationStatus(reservationItem, status, index) {

  const formData = new FormData();
  formData.append('status', status);

  axios.put('http://localhost:8000/api/reservationdetails/status/' + reservationItem.id, formData).then(result => {

    const reservation = reservationItem;
    reservation['status'] = status;

    reservationItems.value[index] = reservation;
    alert('Reservation status updated!');
  }).catch(err => {
    console.error(err);
    alert('Oops, something went wrong')
  })
}

const sortedReservationItems = computed(() =>
  reservationItems.value.sort((a, b) => b.id - a.id),
);


</script>
