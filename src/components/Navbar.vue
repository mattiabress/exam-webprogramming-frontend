<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#" :to="{ path: '/' }">Home</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto d-flex align-items-center" center>
          <b-nav-item-dropdown v-if="isAuthenticated" right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              User
            </template>
            <b-dropdown-item :to="{ path: '/signup' }">Profile</b-dropdown-item>
            <b-dropdown-item @click.prevent="logout()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>
<script>
import Api from '@/utilities/user/userApi'
export default {
  name: 'Navbar',
  props: {
    msg: String
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>