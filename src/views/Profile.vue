<template>
  <div class="profile">
    <div class="container">
      <b-form>
        <b-row class="mt-5">
          <b-col>
            <router-link :to="{ name: 'trips' }">
              <b-button variant="success">
                <b-icon-arrow-left></b-icon-arrow-left> Indietro
              </b-button>
            </router-link>
          </b-col>
          <b-col>
            <h2>Profilo</h2>
          </b-col>
          <b-col>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col>
            <b-form-group id="input-group-2" label="Nome:" label-for="input-2">
              <b-form-input id="input-2" v-model="form.firstname" placeholder="Inserisci nome" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="input-group-2" label="Cognome:" label-for="input-2">
              <b-form-input id="input-2" v-model="form.lastname" placeholder="Inserisci cognome" required>
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-form-group id="input-group-1" label="Username" label-for="input-1">
              <b-form-input id="input-1" v-model="form.username" type="email" placeholder="username" required readonly>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
              <b-form-input id="input-1" v-model="form.email" type="email" placeholder="Inserisci email" required>
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-form-group id="input-group-1" label="Old password" label-for="input-1">
              <b-form-input id="input-1" v-model="form.oldpassword" type="password" placeholder="Vecchia password"
                required>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="input-group-1" label="New password:" label-for="input-1"
              description="Inserire una password difficile">
              <b-form-input id="input-1" v-model="form.password" type="password" placeholder="Nuova password" required>
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-form-group id="input-group-1" label="Role" label-for="input-1">
              <b-form-input id="input-1" v-model="form.role" type="text" placeholder="role" required readonly>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>

          </b-col>
        </b-row>

      </b-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Profile',
  components: {
  },
  data() {
    return {
      form: {
        firstname: "firstname",
        lastname: "lastname",
        email: "email",
        username: "username",
        oldpassword: null,
        password: null,
        role: "admin"
      }
    }
  },
  methods: {
  },
  mounted: function () {
    const userinfo = JSON.parse(JSON.parse(localStorage.getItem("userinfo")));
    this.form.firstname = userinfo.firstname;
    this.form.lastname = userinfo.lastname;
    this.form.email = userinfo.email;
    this.form.username = userinfo.username;
    this.form.role = userinfo.role;
    console.log(userinfo.username)
  }
}
</script>