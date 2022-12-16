<script setup lang="ts">
import {ref} from 'vue'
import { register } from '../stores/session'
const useremail = ref('');
const password = ref('');
const firstName = ref('')
const lastName = ref('')
const age = ref('')


function userRegister(){
  register(firstName.value, lastName.value, age.value, useremail.value,password.value)
}

</script>
<template>
  <div class="columns is-mobile is-centered">
   
    <div class="column top-gap is-11-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd">
      
      <div class="box">
        <h1 class="title text-center">SignIn to get Fit <p style="font-size:48px">
&#128512; </p></h1>
<div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input v-model="firstName" class="input" name="firstName" type="text" placeholder="Enter your firstname" />
          </div>
        </div>
        <div class="field">
          <label class="label"> Lastname</label>
          <div class="control">
            <input v-model="lastName" class="input" name="lastName" type="text" placeholder="Enter your lastname" />
          </div>
        </div>
        <div class="field">
          <label class="label">Age</label>
          <div class="control">
            <input v-model="age" class="input" name="age" type="text" placeholder="Enter your age" />
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input v-model="useremail" class="input" name="email" type="email" placeholder="Enter your email" />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input v-model="password" class="input" name="password" type="password" placeholder="Enter password" />
          </div>
        </div>
        <button class="button is-primary" v-on:click="userRegister()">Sign in</button>
      </div>
    </div>
  </div>

</template>
<style>
.top-gap {
  margin-top: 2rem;
}
.text-center{
    text-align: center;
}
</style>
