<script setup>
import { RouterLink, RouterView } from "vue-router";
import session, {logout} from "./stores/session";


</script>
<template>
  <nav class="navbar is-white has-shadow is-spaced" role="navigation" aria-label="main navigation" >
    <div class="navbar-brand">
      <a class="navbar-item">

        <h><RouterLink class="navbar-item" to="/">Fab & FIt & Fun</RouterLink></h>
      </a>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarMenu" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/home"><strong>Home</strong></RouterLink>
        <RouterLink class="navbar-item" to="/about"><strong>About</strong></RouterLink>
        <RouterLink class="navbar-item" to="/fitness"><strong>Fitness</strong></RouterLink>
        <RouterLink class="navbar-item" to="/users" v-if="!session.isAdmin"><strong>Friends Activity</strong></RouterLink>
        <RouterLink class="navbar-item" to="/manage" v-if="session.isAdmin"><strong>Manage Users</strong></RouterLink>

      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons" v-if="!session.user">
            <RouterLink class="button is-primary" to="/signup"><strong>Sign up</strong></RouterLink>
            <RouterLink class="button is-light" to="/signin">Sign in</RouterLink>
          </div>
          <div v-else>
              Welcome {{session.user.firstName}}  {{session.user.lastName}}<br>
                <button class="button is-primary" @click="logout()">
                    Log out
                </button>
    </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.logo-img{
  width: 500px;
  margin-left: auto;
  margin-right: auto

}
</style>
