<template>
  <div class="about">
    <div class="container">

      <h2>Viaggio a: {{ trip.name }}</h2>
      <form>
        <div class="row">
          <div class="col">
            <router-link :to="{ name: 'trips' }"><button type="button" class="btn btn-success">Indietro</button></router-link>
            
          </div>
          <div class="col">
            <input v-if="editmode" type="button" value="Modifica" @click.prevent="editTrip()">
          </div>
          <div class="col">
            <input type="button" value="Aggiungi" @click.prevent="addTrip()">
          </div>

          <!-- <div class="col">
            <input type="button" value="path" @click.prevent="setPath()">
          </div>
          <div class="col">
            <input type="button" value="load" @click.prevent="loadGeoJSON()">
          </div> -->

        </div>
        <div class="row">
          <div class="col">
            <label for="name">Name</label><input id="name" type="text" v-model="trip.name">
          </div>
          <div class="col">
            <label for="tripDate">tripDate</label><input id="tripDate" type="date" v-model="trip.tripDate">
          </div>
          <div class="col">
            <label for="vehicle">vehicle</label><input id="vehicle" type="text" v-model="trip.vehicle">
          </div>
        </div>
      </form>
       <br>
      <l-map ref="myMap" @ready="setUpTheMap()" style="height: 500px" :zoom="zoom" :center="center"
        :drawControl="drawControl">
        <l-draw></l-draw>
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="markerLatLng"></l-marker>
        <l-feature-group ref="features"></l-feature-group>
        <l-geo-json :geojson="geojson"></l-geo-json>
      </l-map>

      <br>
      <br>
        <label for="id">id</label>
        <br>
        {{trip.id}}
        <br>
        <label for="name">Name</label>
        <br>
        {{trip.name}}
        <br>
        <label for="tripDate">tripDate</label>
        <br>
        {{trip.tripDate}}
        <br>
        <label for="vehicle">vehicle</label>
        <br>
        {{trip.vehicle}}
        <br>
        <label for="path">path</label>
        <br>
        {{ trip.path }}
        <br>
        <label for="mainStages">mainStages</label>
        <br>
        {{trip.mainStages}}
        <br>
        <label for="user">user</label>
        <br>
        {{trip.user}}
        <br>
        <br>
    </div>
  </div>

</template>
<script>
// @ is an alias to /src
import { LMap, LTileLayer, LFeatureGroup, LMarker, LGeoJson } from 'vue2-leaflet';
import TripApi from '@/utilities/trip/tripApi'
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
      editmode: false,
      drawControl: true,
      geojson: null,
      trip: {
        id: 1,
        name: "nome",
        tripDate: null,
        vehicle: null,
        path: {},
        mainStages: null,
      }
    };
  },
  methods: {
    loadTrip: async function (tripId) {
      const response = await TripApi.getTripByID(tripId);
      if(response.status==200)
        this.trip = response.data;
    },
    addTrip: async function () {
      //set trip path
      this.trip.path=this.geojson;
      const response = await TripApi.createTrip(this.trip);
      this.trip = response.data;
    },
    editTrip: async function () {
      //set trip path
      this.trip.path=this.geojson;
      const response = await TripApi.updateTrip(this.trip.id, this.trip);
      this.trip = response.data;
    },


    //map methods
    setUpTheMap() {
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
      map.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;
        drawnItems.addLayer(layer);
      });

      //after the drawing is edited, it stores in the localStorage
      map.on('draw:editstop', function () {
        localStorage.setItem('geoJson', JSON.stringify(drawnItems.toGeoJSON()));
      })
      //after the drawing is finished, it stores in the localStorage
      map.on('draw:drawstop', function () {
        localStorage.setItem('geoJson', JSON.stringify(drawnItems.toGeoJSON()));
      })

    },
    loadGeoJSON(geoJson) {
      //const response = await fetch("https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson")

      //this.geojson = await response.json();
      this.geojson = geoJson
    },
    setPath() {
      this.trip.path = localStorage.geoJson
      this.loadGeoJSON(JSON.parse(this.trip.path));
    },

  },

  created: async function () {
    //const ID = Number(this.$route.params.id);
    if ('tripID' in this.$route.params && this.$route.params.tripID != null) { //TODO: fix it
      this.editmode = true;
      await this.loadTrip(this.$route.params.tripID); //TODO: sistemare
      this.trip.id = this.$route.params.tripID
    }

  }
}
</script>