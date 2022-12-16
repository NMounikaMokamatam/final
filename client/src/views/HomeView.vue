<script setup>
import { ref, onMounted } from "vue";
import session, { fetchUserExcercises, addNewExcersise } from "../stores/session"

const userId = session.user._id
const description = ref("")
let myExcercises = ref([])
const excerciseName = ref("")

onMounted(async () => {
  myExcercises.value = await fetchUserExcercises(userId).then((data) => data)
})
const addExcersise = () => {
  addNewExcersise(userId, excerciseName.value, description.value);
}

</script>
<template>
  <main class="columns is-centered is-vcentered is-mobile">
    <div class="columns is-mobile is-centered container">
      <div class="column top-gap is-11-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd">


        <div class="box">
          <h1 class="title text-center">New Workout Exercise</h1>
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" placeholder="Enter exercise name" v-model="excerciseName" />
            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input v-model="description" class="textarea" name="description"
                placeholder="Enter exercise decription" />
            </div>
          </div>
          <button type="submit" class="button is-primary" v-on:click="addExcersise()">Save</button>
        </div>
      </div>
    </div>
    <div class="container is-max-desktop">
      <div class="notification is-light">
        <h1 style="font-size: 2em;">ExcersiseList:</h1>
        <div class="notification is-dark" v-for="e in myExcercises">
          <button class="delete" @click=""></button>
          {{ e.excercise }}
          <p>{{ e.description }}</p>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
main {
  background-image: url(../assets/2.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: 100% 100%;
  min-height: 120vh;
  color: white;
}

.primary {
  color: #e40215;
}

.primary-background {
  background-color: #e40215;
}

.secondary {
  color: #f5f5f5;
}

.top-gap {
  margin-top: 2rem;
}

.text-center {
  text-align: center;
}

.notification {
  background-color: whitesmoke;
  border-radius: 10px;
  position: relative;
}

.navbar.is-spaced {
  padding: 10 px 0px;
}

.column {
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0.75px;
}

.box {
  margin-top: left;
}
</style>

