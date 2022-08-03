<template>
  <div class="about">

    <l-map ref="myMap" @ready="doSomethingOnReady()" style="height: 300px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
      <l-feature-group ref="features"></l-feature-group>
      <l-control position="bottomleft" ></l-control>
    </l-map>

    <br>
    <br>
    <form>
      <label for="id">id</label>
      <br>
      <input id="id" type="text" v-model="trip.id">
      <br>
      <label for="name">Name</label>
      <br>
      <input id="name" type="text" v-model="trip.name">
      <br>
      <label for="tripDate">tripDate</label>
      <br>
      <input id="tripDate" type="date" v-model="trip.tripDate">
      <br>
      <label for="vehicle">vehicle</label>
      <br>
      <input id="vehicle" type="text" v-model="trip.vehicle">
      <br>
      <label for="path">path</label>
      <br>
      <input id="path" type="text" v-model="trip.path">
      <br>
      <label for="mainStages">mainStages</label>
      <br>
      <input id="mainStages" type="text" v-model="trip.mainStages">
      <br>
      <label for="user">user</label>
      <br>
      <input id="user" type="text" v-model="trip.user">
      <br>
      <br>
      <input type="button" value="Indietro" @click.prevent="backOnBooks()">
      <input v-if="editmode" type="button" value="Modifica" @click.prevent="editTrip()">
      <input type="button" value="Aggiungi" @click.prevent="addTrip()">
    </form>
  </div>

</template>
<script>
// @ is an alias to /src
import { LMap, LTileLayer,LFeatureGroup, LMarker } from 'vue2-leaflet';
import Api from '@/utilities/trip/tripApi'

export default {
  name: 'Trip',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LFeatureGroup,
    
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [45.6495, 13.7768],
      markerLatLng: [45.6495, 13.7768],
      editmode: false,
      trip: {
        id: 1,
        name: "nome",
        tripDate: null,
        vehicle: null,
        path: null,
        mainStages: null,
        user: null
      }
    };
  },
  methods: {
    loadTrip: async function (tripId) {
      const response = await Api.getTripByID(tripId);
      this.trip = response.data;
    },
    addTrip: async function () {
      const response = await Api.createTrip(this.trip);
      this.trip = response.data;
    },
    editTrip: async function () {
      const response = await Api.updateTrip(this.trip.id, this.trip);
      this.trip = response.data;
    },
    doSomethingOnReady() {
      this.map = this.$refs.myMap.mapObject
      // FeatureGroup is to store editable layers
      var drawnItems = new LMap.FeatureGroup();
      this.map.addLayer(drawnItems);
      var drawControl = new LMap.Control.Draw({
        edit: {
          featureGroup: drawnItems
        }
      });
      this.map.addControl(drawControl);
    },
  },

  mounted: function () {
    if (this.$route.params.tripID != null) {
      this.editmode = true;
      this.loadTrip(this.$route.params.tripID);
      this.trip.id = this.$route.params.tripID
    }

  }
}
</script>