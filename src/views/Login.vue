<template>
  <div class="login ">
    <b-container fluid class="background-image-trip min-vh-100">
      <b-container>
        <b-row></b-row>
        <b-row class="mt-5 mb-5">
          <b-col>
            <h1 style="color: #0963c4;font-size: 2.9rem;">
              <b>Il tuo diario dei viaggi </b><br />
              <span style="color: rgb(3 153 117);font-size: 2.4rem;">Ti accompagna in tutti i viaggi</span>
            </h1>
            <p class="mb-4" style="color: rgb(1 86 65);font-size:1.1rem;">
              “Un viaggio non inizia nel momento in cui partiamo né finisce nel momento in cui raggiungiamo la meta. I
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
                      <button type="submit" class="btn btn-primary btn-block mb-4" @click.prevent="login()">
                        login
                      </button>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col>
                      Go to <router-link to="/signup">Signup</router-link>
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
}

.bg-glass {
  background-color: hsla(0, 0%, 100%, 0.9) !important;
  backdrop-filter: saturate(200%) blur(25px);
}
</style>
<script>
// @ is an alias to /src
import UserApi from '@/utilities/user/userApi'
export default {
  name: 'Login',
  components: {
  },
  data: function () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    checkInputs: function () {
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


    login: async function () {
      const credentials = {
        username: this.username,
        password: this.password
      }
      if (this.checkInputs()) {
        try {
          const response = await UserApi.login(credentials);
          console.log(response)
          if (response.status == 200) {
            localStorage.setItem('userinfo', JSON.stringify(response.data.userinfo));
            localStorage.setItem('token', response.data.Authorization);
            localStorage.setItem('isAuthenticated', true);
            //TODO: go to trips page
            //router.replace({ path: '/trips' })
            this.$router.push({ path: '/trips' })
          }
        } catch (error) {
          const e = error.toJSON()
          if (e.status == 401) {
            alert("credenziali sbagliate")
          } else if (e.status == 404) {
            alert("Utente non trovato")
          } else
            alert("Problema nel login")
        }



      }

    }
  },
  mounted: function () {

  }
}
</script>