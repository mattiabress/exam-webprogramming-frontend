<template>
  <div class="about">
    <div class="container">
      
      <h2>Viaggio</h2>
      <form>
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
      
        <input type="button" value="Indietro" @click.prevent="backOnBooks()">
        <input v-if="editmode" type="button" value="Modifica" @click.prevent="editTrip()">
        <input type="button" value="Aggiungi" @click.prevent="addTrip()">
        <input type="button" value="path" @click.prevent="setPath()">
        <input type="button" value="load" @click.prevent="loadGeoJSON()">
      </form>


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
        {{ trip.path }}
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
        <input type="button" value="path" @click.prevent="setPath()">
        <input type="button" value="load" @click.prevent="loadGeoJSON()">
      </form>
    </div>
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
        path: {},
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

  mounted: function () {
    if ('tripID' in this.$route.params && this.$route.params.tripID != null) { //TODO: fix it
      this.editmode = true;
      //this.loadTrip(this.$route.params.tripID); //TODO: sistemare
      this.trip.id = this.$route.params.tripID
    }

  }
}
</script>