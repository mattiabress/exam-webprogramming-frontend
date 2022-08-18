<template>
  <div class="trips">
    <div class="container">
      <b-row class="mt-5">
        <b-col> <h2>I miei viaggi</h2> </b-col>
       
      </b-row>
      <b-row>
        <b-col>Cerca Per data: </b-col>
        <b-col>
          <b-form-datepicker :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            v-model="searchStartDate" class="mb-2" @input="getAllTripsByDate()"></b-form-datepicker>
        </b-col>
        <b-col>
          <b-form-datepicker :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            v-model="searchEndDate" class="mb-2" @input="getAllTripsByDate()"></b-form-datepicker>
        </b-col>
        <b-col><button type="button" class="btn btn-success" @click="loadTrip()">
            <b-icon-arrow-repeat></b-icon-arrow-repeat>
          </button></b-col>
        <b-col>
          <router-link :to="{ name: 'trip' }"><button type="button" class="btn btn-success">Inserisci</button>
          </router-link>
        </b-col>
      </b-row>


      <b-table hover :items="trips" :fields="fields" :busy="isBusy" class="mt-3" label-sort-asc="" label-sort-desc=""
        label-sort-clear="">
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(id)="data">
          <router-link :to="{ name: 'trip', params: { tripID: data.value } }">#{{ data.value }}</router-link>
        </template>
        <!-- A custom formatted column -->
        <template #cell(tripDate)="data">
          {{ data.value | moment("DD/MM/YYYY") }}
        </template>

        <!-- A virtual composite column -->
        <template #cell(elimina)="data">
          <button type="button" class="btn btn-danger" v-on:click="deleteTrip(data.item.id)">
            <b-icon-trash></b-icon-trash>
          </button>
        </template>

      </b-table>
      <!-- <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome viaggio</th>
            <th scope="col">Data viaggio</th>
            <th scope="col">Mezzo</th>
            <th scope="col">Elimina</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trip in trips" :key="trip.id">
            <th scope="row">
              <router-link :to="{ name: 'trip', params: { tripID: trip.id } }">#{{ trip.id }}</router-link>
             
            </th>
            <td>{{ trip.name }}</td>
            <td>{{ trip.tripDate | moment("DD/MM/YYYY") }}</td>
            <td>{{ trip.vehicle }}</td>
            <td>
              <button type="button" class="btn btn-danger" v-on:click="deleteTrip(trip.id)">
                <b-icon-trash></b-icon-trash>
              </button>
            </td>
          </tr>
        </tbody>
      </table> -->
    </div>
  </div>

</template>

<style scoped>
/* color:#5cb874 */
</style>


<script>
// @ is an alias to /src
import TripApi from '@/utilities/trip/tripApi'
//color:#5cb874
export default {
  name: 'Trips',
  components: {
  },
  data() {
    return {
      isLoaded: false,
      fields: [
        // A virtual column that doesn't exist in items
        {
          key: 'id',
          label: 'ID',
        },
        {
          key: 'name',
          label: 'Nome viaggio',
          sortable: true
        },
        {
          key: 'tripDate',
          label: 'Data viaggio',
          sortable: true
        },
        {
          key: 'vehicle',
          label: 'Mezzo',
          sortable: true,
        },
        {
          key: 'elimina',
          label: 'Elimina',
        },
      ],
      trips: null,
      searchStartDate: null,
      searchEndDate: null
    };
  },
  methods: {
    loadTrip: async function () {
      this.isLoaded = false
      const response = await TripApi.getAllTrips();
      console.log(response)
      if (response.status == 200) {
        this.trips = response.data;
        this.isLoaded = true;
      }

    },
    deleteTrip: async function (tripId) {
      if (confirm("Vuoi veramente cancellare il viaggio?")) {
        const response = await TripApi.deleteTrip(tripId);
        if (response.status == 200) {
          alert("Viaggio cancellato");
          await this.loadTrip();
        } else {
          alert("Non posso cancellare il viaggio");
        }
      }
    },
    getAllTripsByDate: async function () {
      if (this.searchEndDate < this.searchStartDate)
        return alert("Data di fine non può essere maggiore di inzio");
      this.isLoaded = false
      const response = await TripApi.getAllTripsByDate(this.searchStartDate, this.searchEndDate);
      if (response.status == 200) {
        this.trips = response.data;
        this.isLoaded = true;
      }
    },
  },
  mounted: async function () {

    await this.loadTrip();
  }
}
</script>