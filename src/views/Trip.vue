<template>
  <div class="about">

    <l-map ref="myMap" @ready="doSomethingOnReady()" style="height: 500px" :zoom="zoom" :center="center"
      :drawControl="drawControl">
      <l-draw></l-draw>
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
      <l-feature-group ref="features"></l-feature-group>
      <l-geo-json :geojson="geojson"></l-geo-json>
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
import { LMap, LTileLayer, LFeatureGroup, LMarker, LGeoJson } from 'vue2-leaflet';
import Api from '@/utilities/trip/tripApi'
import L from 'leaflet';
import LDraw from 'leaflet-draw';

//TODO: rempove LGeoJson
export default {
  name: 'Trip',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LFeatureGroup,
    LDraw,
    LGeoJson
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [45.6495, 13.7768],
      markerLatLng: [45.6495, 13.7768],
      editmode: false,
      drawControl: true,
      geojson: null,
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
      let map = this.$refs.myMap.mapObject

      // FeatureGroup is to store editable layers
      var drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
      var drawControl = new L.Control.Draw({
        draw: {
          polygon: false,
          circle: false,
          rectangle: false,
          circlemarker: false
        },
        edit: {
          featureGroup: drawnItems
        }
      });

      map.addControl(drawControl);




      L.control.layers({}, { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);


      /*
      map.on('draw:edited', function (e) {
        var layers = e.layers;
        layers.eachLayer(function (layer) {
          //do whatever you want; most likely save back to db
          console.log(layer)
        });
      });*/
      map.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;
        //var data = L.FeatureGroup().toGeoJSON();
        console.log(drawnItems.toGeoJSON())
        drawnItems.addLayer(layer);
      });

    },
    async loadGeoJSON() {
      const response = await fetch('https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson');
      this.geojson = await response.json();

    }
  },

  mounted: function () {
    if (this.$route.params.tripID != null) {
      this.editmode = true;
      //this.loadTrip(this.$route.params.tripID); //TODO: sistemare
      this.trip.id = this.$route.params.tripID
    }
    this.loadGeoJSON()

  }
}
</script>