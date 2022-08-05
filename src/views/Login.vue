<template>
  <div class="login">

    <!-- Section: Design Block -->
    <section class="background-radial-gradient overflow-hidden">
      <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div class="row gx-lg-5 align-items-center mb-5">
          <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
            <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
               Il tuo diario dei viaggi <br />
              <span style="color: hsl(218, 81%, 75%)">Ti accompagna in tutti i viaggi</span>
            </h1>
            <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
              “Un viaggio non inizia nel momento in cui partiamo né finisce nel momento in cui raggiungiamo la meta. I realtà comincia molto prima e non finisce mai, dato che il nastro dei ricordi continua a scorrerci dentro anche dopo che ci siamo fermati. È il virus del viaggio, malattia sostanzialmente incurabile” Ryszard Kapuscinski
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
}

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
</style>
<script>
// @ is an alias to /src

export default {
  name: 'Login',
  components: {
  },
  data: function () {
    return {
      a: 1,
      login_url: "http://localhost:8080/ProgrammazioneWebMattiaBressanEsame/api/user/login",
      username: null,
      password: null
    }
  },
  methods: {
    
    login: function () {
      const data_signup = {
        username: this.username,
        password: this.password
      }
      this.axios.post(this.login_url, data_signup).then((response) => {
        console.log(response.data)
      })
    }
  },
  mounted: function () {

  }
}
</script>