<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/signup">Signup</router-link>|
      <router-link to="/login">Login</router-link> |
      <router-link to="/trips">Trips</router-link> |
      <input type="button" value="Logout" @click.prevent="logout()">
    </div>
    <router-view/>
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
export default {
  name: 'navbar',
  components: {
  },
  data: function () {
    return {
    }
  },
  methods: {
    
    logout: async function () {
      const response= await Api.logout();
      console.log(response);
      if(response.status!=200)
        alert("Non sono riuscito a fare logout");
      else{
        localStorage.setItem('token', null);
        localStorage.setItem('isAuthenticated',false);
        // localStorage.clear();
      }
    }
  },
  mounted: function () {

  }
}
</script>