<template>

  <div id="app">
    <Navbar v-if="this.$route.name != 'login' && this.$route.name !='signup' "></Navbar>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/signup">Signup</router-link>|
      <router-link to="/login">Login</router-link> |
      <router-link to="/trips">Trips</router-link> |
      <input type="button" value="Logout" @click.prevent="logout()">
    </div> -->
    <!-- <div>
      <b-navbar toggleable="lg" type="dark" variant="success">
        <b-navbar-brand href="#" :to="{ path: '/' }">Home</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown v-if="isAuthenticated" right>
             
              <template #button-content>
                User
              </template>
              <b-dropdown-item :to="{ path: '/signup' }">Profile</b-dropdown-item>
              <b-dropdown-item @click.prevent="logout()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div> -->

    <!-- <router-view /> -->

    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
// @ is an alias to /src
import Api from '@/utilities/user/userApi'
import Navbar from '@/components/Navbar';
export default {
  name: 'App',
  components: {
    Navbar,
  },
  data: function () {
    return {
      isAuthenticated: false,
    }
  },
  methods: {

    logout: async function () {
      const response = await Api.logout();
      console.log(response);
      if (response.status != 200)
        alert("Non sono riuscito a fare logout");
      else {
        localStorage.setItem('token', null);
        localStorage.setItem('isAuthenticated', false);
        this.isAuthenticated = false;
        // localStorage.clear();
        this.$router.push({ path: '/login' })
      }
    }
  },
  mounted: function () {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === "true";
  }
}
</script>