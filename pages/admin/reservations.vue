<template>
  <v-row no-gutters class="pa-4" justify="center">
    <v-col v-if="isAdmin" cols="12">
      <v-row>
        <v-col cols="12" xxl="3" xl="3" lg="3" md="6" sm="12">
          <v-card width="100%">
            <v-row no-gutters class="pa-8">
              <v-col cols="12"> Earnings(Monthly) </v-col>
              <v-col cols="12" class="text-h6 font-weight-bold">
                PHP {{ monthlyEarnings }}
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" xxl="3" xl="3" lg="3" md="6" sm="12">
          <v-card width="100%">
            <v-row no-gutters class="pa-8">
              <v-col cols="12"> Earnings(Daily) </v-col>
              <v-col cols="12" class="text-h6 font-weight-bold">
                PHP {{ dailyEarnings }}
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" xxl="3" xl="3" lg="3" md="6" sm="12">
          <v-card width="100%">
            <v-row no-gutters class="pa-8">
              <v-col cols="12"> Earnings(Uniform) </v-col>
              <v-col cols="12" class="text-h6 font-weight-bold">
                PHP {{ uniformEarnings.toFixed(2) }}
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" xxl="3" xl="3" lg="3" md="6" sm="12">
          <v-card width="100%">
            <v-row no-gutters class="pa-8">
              <v-col cols="12"> Earnings(Book) </v-col>
              <v-col cols="12" class="text-h6 font-weight-bold">
                PHP {{ bookEarnings.toFixed(2) }}
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
                <td>{{ formatDate(reservationItem.date) }}</td>
                <td>{{ reservationItem.student }}</td>
                <td>{{ reservationItem.studentName }}</td>
                <td>
                  <v-chip 
                    class="mt-1"
                    style="font-size: .60rem; font-weight: bold; padding: 150x; display: flex; justify-content: center; align-items: center;" 
                    v-for="item in JSON.parse(JSON.parse(reservationItem.items))" :key="item.id" 
                    @click="handleChipClick(reservationItem, item, reservationItem.id)"
                    
                  > 
                      <v-icon class="mr-2">mdi-cart</v-icon>
                      <!-- [P {{ item.price }}.00] {{ item.name }} -->
                      [Quantity: {{ item.stock }}] [₱{{ item.totalPrice }}.00] {{ item.name }}
                  </v-chip>
                </td>
                <td>{{ formatNumberIntoString(reservationItem.total) }}</td>
                <td>{{ reservationItem.status }}</td>
                <td>
                  <v-row justify="center">
                    <!-- Approve Button -->
                    <v-btn
                      v-if="isAdmin"
                      variant="text"
                      density="compact"
                      icon
                      size="small"
                      class="mx-1"
                      :disabled="reservationItem.status === 'Completed'"
                      @click="setReservationStatus(reservationItem, 'Approved', reservationItem.student, 'Your reservation is approved', index)"
                    >
                      <v-icon>mdi-checkbox-marked-circle</v-icon>
                      <v-tooltip activator="parent" location="bottom">Approved</v-tooltip>
                    </v-btn>

                    <!-- Complete Button -->
                    <v-btn
                      v-if="isAdmin"
                      variant="text"
                      density="compact"
                      icon
                      size="small"
                      class="mx-1"
                      :disabled="reservationItem.status === 'Completed'"
                      @click="setReservationStatus(reservationItem, 'Completed', reservationItem.student, 'Your reservation is completed', index)"
                    >
                      <v-icon>mdi-check-circle</v-icon>
                      <v-tooltip activator="parent" location="bottom">Complete</v-tooltip>
                    </v-btn>

                    <!-- Delete Button -->
                    <v-btn
                      variant="text"
                      density="compact"
                      icon
                      size="small"
                      class="mx-1"
                      :disabled="reservationItem.status === 'Completed'"
                      @click="deleteReservation(reservationItem, reservationItem.student, 'Sorry, your reservation was declined and deleted.', index)"
                    >
                      <v-icon size="small">mdi-trash-can-outline</v-icon>
                      <v-tooltip activator="parent" location="bottom">Delete</v-tooltip>
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

definePageMeta({
  layout: "admin-default",
});

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

isAdmin.value = JSON.parse(localStorage.getItem('adminLogin')).adminID ? true : false;

axios.get("http://localhost:8000/api/reservationdetails/").then(data => {
  reservationList.value = data.data
}).catch(err => {
  console.error(err)
})

})

function setReservationStatus(reservationItem, status, studentID, message, index) {
  const formData = new FormData();
  formData.append('status', status);
  formData.append('studentID', studentID);
  formData.append('message', message);

  axios.put('http://localhost:8000/api/reservationdetails/status/' + reservationItem.id, formData).then(result => {
    
    const reservation = reservationItem;
    reservation['status'] = status;
    reservation['studentID'] = studentID;
    reservation['message'] = message;

    reservationItems.value[index] = reservation;
    alert('Reservation status updated!');
  }).catch(err => {
    console.error(err);
    alert('Oops, something went wrong')
  })
}

function deleteReservation(reservationItem, studentID, message, index) {
  const formData = new FormData();
  formData.append('studentID', studentID);
  formData.append('message', message);

  axios({
    method: 'delete',
    url: `http://localhost:8000/api/reservationdetailsadmin/${reservationItem.id}`,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
    .then(result => {
      removeReservationItem(reservationItem);

      const reservation = reservationItem;
      reservation['studentID'] = studentID;
      reservation['message'] = message;

      reservationItems.value[index] = reservation;
      alert('Reservation deleted!');
    })
    .catch(error => {
      console.error(error);
      alert('Oops, something went wrong');
    });
}






const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};


function handleChipClick(reservationItem, item, reservationId) {
  const listItem = reservationList.value.find(item => item.id === reservationId);
  let items = JSON.parse(JSON.parse(listItem.items));

  const index = items.findIndex(i => i.id === item.id);
  
  if (index !== -1) {
    items.splice(index, 1);

    // Update the reservationList
    const idx = reservationList.value.findIndex(item => item.id === reservationId);
    reservationList.value.splice(idx, 1, listItem);

    const newTotal = listItem.total - item.totalPrice;
    const formData = new FormData();

    formData.append('items', JSON.stringify(items)); 
    formData.append('totalAmount', newTotal);

    axios.put('http://localhost:8000/api/reservationdetails/items/' + listItem.id, formData).then(result => {
      const reservation = listItem;
      reservation['items'] = JSON.stringify(items);
      reservation['totalAmount'] = newTotal; // Update items in reservation object

      reservationItems.value[index] = reservation;
      alert('Resrvation item deleted successfully!');
      window.location.reload(); // Refresh the page after alert
    }).catch(err => {
      console.error(err);
      alert('Oops, something went wrong')
    })
  }
}


const getEarningsByPeriod = (period) => {
  const today = new Date();
  const filteredList = reservationList.value.filter((reservation) => {
    const reservationDate = new Date(reservation.date);
    return period === 'monthly' ?
      reservationDate.getMonth() === today.getMonth() :
      reservationDate.getDate() === today.getDate();
  });

  return filteredList.reduce((total, reservation) => total + reservation.total, 0);
};

const monthlyEarnings = computed(() => {
  const earnings = getEarningsByPeriod('monthly');
  return earnings.toFixed(2);
});

const dailyEarnings = computed(() => {
  const earnings = getEarningsByPeriod('daily');
  return earnings.toFixed(2);
});

const uniformEarnings = computed(() => {
  return reservationList.value
    .flatMap(reservation => JSON.parse(JSON.parse(reservation.items)))
    .filter(item => item.category === "uniform")
    .reduce((acc, item) => acc + item.totalPrice, 0);
});

const bookEarnings = computed(() => {
  return reservationList.value
    .flatMap(reservation => JSON.parse(JSON.parse(reservation.items)))
    .filter(item => item.category === "book")
    .reduce((acc, item) => acc + item.totalPrice, 0);
});

function removeReservationItem(item) {
  const index = reservationList.value.findIndex((i) => i.id === item.id);
  reservationList.value.splice(index, 1);
}


const sortedReservationItems = computed(() =>
  reservationItems.value.sort((a, b) => b.id - a.id),
);


</script>
