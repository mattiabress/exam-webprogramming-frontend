<template>
  <div class="about">
    <!--
    <l-map style="height: 300px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>-->
    <h2>I miei viaggi</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nome</th>
          <th scope="col">Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trip in trips" :key="trip.id">
          <!--<th scope="row"><a href="#" @click.prevent="loadTrip(trip.id)">{{ trip.id }}</a></th>-->
          <th scope="row"><router-link :to="{ name: 'trip', params: { tripID: trip.id }}">{{ trip.id }}</router-link></th>
          <td>{{ trip.name }}</td>
          <td>{{ trip.autore }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>
<script>
// @ is an alias to /src
//import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  name: 'Trips',
  components: {
    /*
    LMap,
    LTileLayer,
    LMarker, */
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159],
      trips: [
        { id: 1, name: "adda", tripDate: "19/2/22" },
        { id: 2, name: "adddsaa", tripDate: "20/2/22" },
        { id: 3, name: "a131dda", tripDate: "21/2/22" },
      ]

    };
  },
  methods: {
    loadTrip: function () {

    }
  }
}
</script>