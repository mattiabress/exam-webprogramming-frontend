<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>This is an about page</h2>
  </div>

</template>
<script>
// @ is an alias to /src

export default {
  name: 'About',
  components: {
  },
  data: function () {
    return { a: 1 }
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  },
  mounted: function () {
    const api="http://localhost:8080/ProgrammazioneWebMattiaBressanEsame/api/user/login"
    this.axios.get(api).then((response) => {
      console.log(response.data)
      })
    }
}
</script>