<template>

  <div id="app">
    <Navbar v-if="this.$route.name != 'login' && this.$route.name != 'signup'"></Navbar>
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

div {
  color: #00AEAD;
  font-family: cursive; 
}

.btn-success {
  color: #fff;
  background-color: #019875 !important;
  border-color: #019875 !important;
}
/* over del pulsante */
.dropdown-item.active, .dropdown-item:active {
    background-color: #E9ECEF !important;
}


.table {
  color: #006060;
}

.table th,
.table td {
  font-style: normal;
  font-family: Verdana !important;
}
/* Titolo navbar */
.ml-3, .mx-3 {
    font-size: 35px;
}
.navbar .navbar-brand {
  padding-top: 2px ;
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
      if (response.status != 200)
        alert("Non sono riuscito a fare logout");
      else {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userinfo');
        this.$router.push({ path: '/login' })
      }
    }
  },
  mounted: function () {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === "true";
  }
}
</script>