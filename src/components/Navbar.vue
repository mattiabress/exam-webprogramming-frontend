<template>
  <div class="mynavbar">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand  :to="{ path: '/' }" class="" >
        <img src="@/assets/logo.png" class="d-inline-block align-center img-fluid logo-img" alt="airplane_trip">
        <em class="ml-3">Viaggio diario</em>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto d-flex align-items-center" center>
          <b-nav-item-dropdown v-if="isAuthenticated" class="align-center" right>
            <!-- Using 'button-content' slot -->
            <template #button-content class="align-center">
              <b-icon-person-circle class="mr-3" font-scale="1.5"></b-icon-person-circle>
              <em>{{userinfo.name}}</em>
              <b-icon icon="airplane" aria-hidden="true"></b-icon>
            </template>

            <b-dropdown-item :to="{ path: '/profile' }">
            <b-button variant="outline-info" class="mb-2">
                <b-icon icon="person-fill" aria-hidden="true"></b-icon> Profile
              </b-button>
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="logout()">
              <b-button variant="outline-info" class="mb-2">
                <b-icon icon="power" aria-hidden="true"></b-icon> Logout
              </b-button>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style scoped>
</style>
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
      userinfo:{
        name:"Mattia",
        lastname:"Bressan"
      }
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
   //this.userinfo = JSON.parse(localStorage.getItem('userinfo'));
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
b-navbar-brand :hover{
  display: inline-block;
}

.logo-img{
  height:55px
}
</style>