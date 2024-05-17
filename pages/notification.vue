<template>
  <v-row no-gutters class="pa-4" justify="center">
    <v-col cols="12" class="mt-4">
      <v-card flat style="border-width: thin">
        <v-table density="compact" fixed-header style="max-height: 67vh">
          <thead>
            <tr>
              <th class="text-left">Notification ID</th>
              <th class="text-left">Notification Message</th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(notificationItem, index) in notificationList"
              :key="notificationItem.id"
            >
              <tr>
                <td>{{ notificationItem.id }}</td>
                <td>{{ notificationItem.message }}</td>
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

const notificationList = ref([]);

onMounted(() => {
    const getStudentLogin = JSON.parse(localStorage.getItem('studentLogin'));

    axios.get(`http://localhost:8000/api/notification?studentID=${getStudentLogin.studentID}`).then(data => {
        notificationList.value = data.data
    }).catch(err => {
        console.error(err)
    })
})

</script>
