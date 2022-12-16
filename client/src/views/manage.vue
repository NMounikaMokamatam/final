<script setup >
import session, { fetchUsers, deleteUserById } from "../stores/session";
import { ref, onMounted } from 'vue'

let generalUsers = ref([])

onMounted(async () => {
  const returnedUsers = await fetchUsers().then(users => users)
  generalUsers.value = returnedUsers.filter(user => user.email != session.user?.email);
})
const deleteUser = (user) => {
  deleteUserById(user._id);
  generalUsers.value = generalUsers.value.filter(user => user.email != user.email);

}

</script>
<template>

  <div class="manage main">
    <h1 class="mgt-medium title">Manage Users</h1>
    <div class="card">
      <div class="card-content">
        <div class="content">
          <table class="table is-narrow" v-if="generalUsers.length > 0">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Second Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="user in generalUsers">
              <tr key={{user.id}}>
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.email }}</td>
                <td id="delete"><span class="icon-text">
                    <span class="icon">
                      <i class="fas fa-trash" v-on:click="deleteUser(user)"></i>
                    </span>
                  </span></td>
              </tr>
            </tbody>

          </table>
          <p v-else id="delete">There are no users</p>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
.manage {
  padding: 40px;
  height: 50%;
}

.main {
  background-image: url(../assets/2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;

}

.table {
  padding: 150px;

}

.card {
  width: 50%;
  height: 400px;
}

#delete {
  color: red;
  cursor: pointer;

}
</style>
