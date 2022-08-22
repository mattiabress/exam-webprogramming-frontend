<template>
  <div class="login">

    <!-- Section: Design Block -->
    <section class="background-radial-gradient overflow-hidden vh-100">
      <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div class="row gx-lg-5 align-items-center mb-5">
          <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
            <h1 class="my-5 display-5 fw-bold ls-tight" style="color: #0963c4;font-size: 3rem;">
              <b>Il tuo diario dei viaggi </b><br />
              <span style="color: rgb(3 153 117);font-size: 2.5rem;">Ti accompagna in tutti i viaggi</span>
            </h1>
            <p class="mb-4" style="color: rgb(1 86 65);font-size:1.4rem;">
              “Un viaggio non inizia nel momento in cui partiamo né finisce nel momento in cui raggiungiamo la meta. I
              realtà comincia molto prima e non finisce mai, dato che il nastro dei ricordi continua a scorrerci dentro
              anche dopo che ci siamo fermati. È il virus del viaggio, malattia sostanzialmente incurabile”<br> Ryszard
              Kapuscinski
            </p>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

            <div class="card bg-glass">
              <div class="card-body px-4 py-5 px-md-5">
                <form>
                  <!-- 2 column grid layout with text inputs for the first and last names -->
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input type="text" id="firstname" class="form-control" v-model="firstname" />
                        <label class="form-label" for="firstname">First name</label>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input type="text" id="lastname" class="form-control" v-model="lastname" />
                        <label class="form-label" for="lastname">Last name</label>
                      </div>
                    </div>
                  </div>

                  <!-- Email input -->
                  <div class="form-outline mb-4">
                    <input type="email" id="email" class="form-control" v-model="email" />
                    <label class="form-label" for="email">Email address</label>
                  </div>
                  <div class="form-outline mb-4">
                    <input type="text" id="username" class="form-control" v-model="username" />
                    <label class="form-label" for="username">Username</label>
                  </div>

                  <!-- Password input -->
                  <div class="form-outline mb-4">
                    <input type="password" id="form3Example4" class="form-control" v-model="password" />
                    <label class="form-label" for="form3Example4">Password</label>
                  </div>

                  <!-- Submit button -->
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary btn-block mb-4" @click.prevent="signup()">
                      Sign up
                    </button>
                  </div>
                  Go to <router-link to="/login">Login</router-link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section: Design Block -->
  </div>

</template>


<style scoped>
.background-radial-gradient {
  /*background-color: #BFD834;*/
  background-image: url('~@/assets/backgroundimagetrips.jpg') ;
  background-size:100% auto;
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
  box-shadow: 0 0 0 0.2rem #BFD834; /* TODO: sistemare qui colore */
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