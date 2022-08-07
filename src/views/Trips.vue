<template>
  <div class="about">
    <div class="container">
      <h2>I miei viaggi</h2>
      <router-link :to="{ name: 'trip' }"><button type="button" class="btn btn-success">Inserisci viaggio</button>
      </router-link><br><br>
      <input type="date" v-model="searchDate" @input="getAllTripsByDate()" /> {{searchDate}}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome viaggio</th>
            <th scope="col">Data viaggio</th>
            <th scope="col">Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trip in trips" :key="trip.id">
            <!--<th scope="row"><a href="#" @click.prevent="loadTrip(trip.id)">{{ trip.id }}</a></th>-->
            <th scope="row">
              <router-link :to="{ name: 'trip', params: { tripID: trip.id } }">{{ trip.id }}</router-link>
            </th>
            <td>{{ trip.name }}</td>
            <td>{{ trip.tripDate | moment("DD/MM/YYYY") }}</td>
            <td>
              <router-link :to="{ name: 'trip', params: { tripID: trip.id } }">
                <button type="button" class="btn btn-success">
                  <b-icon-pencil></b-icon-pencil>
                </button>
              </router-link>
              <button type="button" class="btn btn-danger" v-on:click="deleteTrip(trip.id)">
                <b-icon-trash></b-icon-trash>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
<script>
// @ is an alias to /src
import TripApi from '@/utilities/trip/tripApi'

export default {
  name: 'Trips',
  components: {
  },
  data() {
    return {
      trips: null,
      searchDate:null
    };
  },
  methods: {
    loadTrip: async function () {
      const response = await TripApi.getAllTrips();
      console.log(response)
      if(response.status == 200)
        this.trips = response.data;
    },
    deleteTrip: async function(tripId) {
      if (confirm("Do you really want to delete this Trip?")) {
        const response = await TripApi.deleteTrip(tripId);
        if (response.status == 200) {
          alert("The Trip is deleted");
        } else {
          alert("Can't delete the Trip");
        }
      }
    },
    getAllTripsByDate: async function(){
      const response = await TripApi.getAllTripsByDate(this.searchDate);
      this.trips = response.data;
    }
  },
  mounted: async function () {
    await this.loadTrip();
  }
}
</script>