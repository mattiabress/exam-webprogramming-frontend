<template>
  <div class="login">
    <b-container fluid class="background-image-trip min-vh-100">
      <b-container>
        <b-row></b-row>
        <b-row class="mt-5 mb-5">
          <b-col cols="12" md="6">
            <h1 style="color: #0963c4;font-size: 2.9rem;">
              <b>Il tuo diario dei viaggi </b><br />
              <span style="color: rgb(3 153 117);font-size: 2.4rem;">Ti accompagna in tutti i viaggi</span>
            </h1>
            <p class="mb-4" style="color: rgb(1 86 65);font-size:1.1rem;">
              “Un viaggio non inizia nel momento in cui partiamo né finisce nel momento in cui raggiungiamo la meta. In
              realtà comincia molto prima e non finisce mai, dato che il nastro dei ricordi continua a scorrerci dentro
              anche dopo che ci siamo fermati. È il virus del viaggio, malattia sostanzialmente incurabile”<br> Ryszard
              Kapuscinski
            </p>
          </b-col>
          <b-col>
            <div class="card bg-glass">
              <div class="card-body px-4 py-5 px-md-5">
                <b-form>

                  <b-form-row>
                    <b-col>
                      <input type="text" id="firstname" class="form-control" v-model="firstname" />
                      <label class="form-label" for="firstname">First name</label>
                    </b-col>
                    <b-col>
                      <input type="text" id="lastname" class="form-control" v-model="lastname" />
                      <label class="form-label" for="lastname">Last name</label>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col>
                      <input type="email" id="email" class="form-control" v-model="email" />
                      <label class="form-label" for="email">Email address</label>
                    </b-col>
                  </b-form-row>


                  <b-form-row>
                    <b-col>
                      <input type="text" id="username" class="form-control" v-model="username" />
                      <label class="form-label" for="username">Username</label>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col>
                      <input type="password" id="form3Example4" class="form-control" v-model="password" />
                      <label class="form-label" for="form3Example4">Password</label>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col>
                      <button type="submit" class="btn btn-primary btn-block mb-4" @click.prevent="signup()">
                        Sign up
                      </button>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col>
                      Go to <router-link to="/login">Login</router-link>
                    </b-col>
                  </b-form-row>

                </b-form>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row></b-row>
      </b-container>
    </b-container>

  </div>

</template>


<style scoped>
.background-image-trip {
  background-image: url('~@/assets/backgroundimagetrips.jpg'), linear-gradient(#ccf1fa, #2571df, #ccf1fa);
  background-size: 100% auto;
  background-size: cover;
  background-color: #c1edfb;
  min-height: -webkit-fill-available;
  align-items: center;
  background-attachment: fixed;
  background-position: center;
}

.btn-primary {
  color: #fff;
  background-color: #019875;
  border-color: #019875;
}

.btn-primary:hover {
  color: #fff;
  background-color: #0198758f;
  border-color: #019875;
}

a {
  color: #00DCDC;
  text-decoration: none;
  background-color: transparent;
}

.btn-primary:not(:disabled):not(.disabled):active,
.btn-primary:not(:disabled):not(.disabled).active,
.show>.btn-primary.dropdown-toggle {
  color: #fff;
  background-color: #0198758f;
  border-color: #019875;
}

.btn-primary:focus,
.btn-primary.focus {
  color: #fff;
  background-color: #0198758f;
  border-color: #019875;
  box-shadow: 0 0 0 0.2rem #BFD834;
  /* TODO: sistemare qui colore */
}

.bg-glass {
  background-color: hsla(0, 0%, 100%, 0.9) !important;
  backdrop-filter: saturate(200%) blur(25px);
}
</style>
<script>
// @ is an alias to /src
import UserApi from '@/utilities/user/userApi';

export default {
  name: 'Signup',
  components: {
  },
  data: function () {
    return {
      firstname: null,
      lastname: null,
      email: null,
      username: null,
      password: null
    }
  },
  methods: {
    isValidEmail(email) {
      let pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
      if (pattern.test(email)) {
        return true;
      } else {
        return false;
      }
    },
    checkInputs: function () {
      if (this.firstname === undefined || this.firstname === null || this.firstname === "") {
        alert("Inserisci firstname");
        return false;
      }
      if (this.lastname === undefined || this.lastname === null || this.lastname === "") {
        alert("Inserisci lastname");
        return false;
      }
      if (this.email === undefined || this.email === null || this.email === "" || !this.isValidEmail(this.email)) {
        alert("Controlla l' email inserita");
        return false;
      }
      if (this.username === undefined || this.username === null || this.username === "") {
        alert("Inserisci username");
        return false;
      }
      if (this.password === undefined || this.password === null || this.password === "") {
        alert("Inserisci password");
        return false;
      }
      return true;
    },
    signup: async function () {
      const credentials = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        username: this.username,
        password: this.password
      }
      if (this.checkInputs()) {
        try {
          const response = await UserApi.register(credentials);
          console.log(response)
          if (response.status == 200) {
            localStorage.setItem('userinfo', JSON.stringify(response.data.userinfo));
            localStorage.setItem('token', response.data.Authorization);
            localStorage.setItem('isAuthenticated', true);
            this.$router.push({ path: '/trips' })
          }
        } catch (error) {
          const e = error.toJSON()
          if (e.status == 401) {
            alert("credenziali sbagliate")
          } else if (e.status == 404) {
            alert("Utente non trovato")
          } else if (e.status == 409) {
            alert("Username già presente")
          } else
            alert("Problema nel signup")
        }



      }
    }
  },
  mounted: function () {

  }
}
</script>