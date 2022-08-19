<template>
  <div class="login">

    <!-- Section: Design Block -->
    <section class="background-radial-gradient overflow-hidden vh-100">
      <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div class="row gx-lg-5 align-items-center mb-5">
          <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
            <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
              Il tuo diario dei viaggi <br />
              <span style="color: #00AEAD">Ti accompagna in tutti i viaggi</span>
            </h1>
            <p class="mb-4" style="color: #BFD834">
              “Un viaggio non inizia nel momento in cui partiamo né finisce nel momento in cui raggiungiamo la meta. I
              realtà comincia molto prima e non finisce mai, dato che il nastro dei ricordi continua a scorrerci dentro
              anche dopo che ci siamo fermati. È il virus del viaggio, malattia sostanzialmente incurabile” Ryszard
              Kapuscinski
            </p>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

            <div class="card bg-glass">
              <div class="card-body px-4 py-5 px-md-5">
                <form>

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
                    <button type="submit" class="btn btn-primary btn-block mb-4" @click.prevent="login()">
                      login
                    </button>
                  </div>
                  Go to <router-link to="/signup">Signup</router-link>
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
/*
.background-radial-gradient {
  background-color: hsl(218, 41%, 15%);
  background-image: radial-gradient(650px circle at 0% 0%,
      hsl(218, 41%, 35%) 15%,
      hsl(218, 41%, 30%) 35%,
      hsl(218, 41%, 20%) 75%,
      hsl(218, 41%, 19%) 80%,
      transparent 100%),
    radial-gradient(1250px circle at 100% 100%,
      hsl(218, 41%, 45%) 15%,
      hsl(218, 41%, 30%) 35%,
      hsl(218, 41%, 20%) 75%,
      hsl(218, 41%, 19%) 80%,
      transparent 100%);


#radius-shape-1 {
  height: 220px;
  width: 220px;
  top: -60px;
  left: -130px;
  background: radial-gradient(#44006b, #ad1fff);
  overflow: hidden;
}

#radius-shape-2 {
  border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
  bottom: -60px;
  right: -110px;
  width: 300px;
  height: 300px;
  background: radial-gradient(#44006b, #ad1fff);
  overflow: hidden;
}

.bg-glass {
  background-color: hsla(0, 0%, 100%, 0.9) !important;
  backdrop-filter: saturate(200%) blur(25px);
}
}*/

.background-radial-gradient {
  background-color: #BFD834;
  background-image: radial-gradient(500px circle at 0% 0%,
      #00BDBD 15%,
      #01A391 35%,
      #017F66 75%,
      #017F66 80%,
      transparent 100%),
    radial-gradient(1350px circle at 100% 100%,
      #00BDBD 15%,
      #01A391 35%,
      #017F66 75%,
      #017F66 80%,
      transparent 100%);
}

#radius-shape-1 {
  height: 220px;
  width: 220px;
  top: -60px;
  left: -130px;
  background: radial-gradient(#00AEAD, #00EBEB);
  overflow: hidden;
}

#radius-shape-2 {
  border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
  bottom: -60px;
  right: -110px;
  width: 300px;
  height: 300px;
  background: radial-gradient(#BFD834, #1AFFFF);
  overflow: hidden;
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