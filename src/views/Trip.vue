<template>
  <div class="about">
    <div class="container">
      <h2>Viaggio a: {{ trip.name }}</h2>
      <form>
        <div class="row">
          <div class="col">
            <router-link :to="{ name: 'trips' }"
              ><button type="button" class="btn btn-success">
                Indietro
              </button></router-link
            >
          </div>
          <div class="col"></div>
          <div class="col">
            <input
              v-if="editmode"
              type="button"
              value="Modifica"
              @click.prevent="editTrip()"
            />
            <!-- TODO: might better with if else -->
            <input
              v-if="!editmode"
              type="button"
              value="Aggiungi"
              @click.prevent="addTrip()"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="name">Name</label
            ><input id="name" type="text" v-model="trip.name" />
          </div>
          <div class="col">
            <label for="tripDate">tripDate</label
            ><input id="tripDate" type="date" v-model="trip.tripDate" />
          </div>
          <div class="col">
            <label for="vehicle">vehicle</label
            ><input id="vehicle" type="text" v-model="trip.vehicle" />
          </div>
        </div>
      </form>
      <br />
      <l-map
        ref="myMap"
        @ready="setUpTheMap(trip.path)"
        style="height: 500px"
        :zoom="zoom"
        :center="center"
        :drawControl="drawControl"
        v-if="mapReady"
      >
        <l-draw></l-draw>
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <!-- <l-marker :lat-lng="markerLatLng"></l-marker> -->
        <l-feature-group ref="features"></l-feature-group>
        <l-geo-json :geojson="geojson"></l-geo-json>
      </l-map>
      {{trip.path}}
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import {
  LMap,
  LTileLayer,
  LFeatureGroup,
  /*LMarker,*/ LGeoJson,
} from "vue2-leaflet";
import TripApi from "@/utilities/trip/tripApi";
import L from "leaflet";
import LDraw from "leaflet-draw";

//TODO: rempove LGeoJson
export default {
  name: "Trip",
  components: {
    LMap,
    LTileLayer,
    //LMarker,
    LFeatureGroup,
    LDraw,
    LGeoJson,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [45.6495, 13.7768],
      editmode: false,
      drawControl: true,
      geojson: {},
      drawnItems: null,
      trip: {
        id: null,
        name: null,
        tripDate: null,
        vehicle: null,
        path: null,
      },
      mapReady:false
    };
  },
  methods: {
    loadTrip: async function (tripId) {
      const response = await TripApi.getTripByID(tripId);
      if (response.status == 200) this.trip = response.data;
    },
    addTrip: async function () {
      //set trip path
      this.trip.path = this.drawnItems.toGeoJSON();
      const response = await TripApi.createTrip(this.trip);
      this.trip = response.data;
    },
    editTrip: async function () {
      //set trip path
      this.trip.path = this.drawnItems.toGeoJSON();
      const response = await TripApi.updateTrip(this.trip.id, this.trip);
      this.trip = response.data;
    },

    //map methods
    setUpTheMap(geopath) {
      let map = this.$refs.myMap.mapObject;
      // FeatureGroup is to store editable layers
      var drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
      this.drawnItems = drawnItems;
      var drawControl = new L.Control.Draw({
        draw: {
          polygon: false,
          circle: false,
          rectangle: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: drawnItems,
        },
      });

      map.addControl(drawControl);
      L.control
        .layers(
          {},
          { drawlayer: drawnItems },
          { position: "topleft", collapsed: false }
        )
        .addTo(map);

      map.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;
        drawnItems.addLayer(layer);
      });

      function onEachFeature(feature, layer) {
        drawnItems.addLayer(layer);
      }
      console.log(geopath);
      if (geopath != null) {
        console.log(geopath);
        L.geoJson(geopath, {
          onEachFeature: onEachFeature,
        });
      }
      //after the drawing is edited
      map.on("draw:editstop");
      //after the drawing is finished
      map.on("draw:drawstop");
    
    },

  },

  async beforeMount() { //created: async function ()
    if ("tripID" in this.$route.params && this.$route.params.tripID != null) {
      //TODO: fix it
      this.editmode = true;
      await this.loadTrip(Number(this.$route.params.tripID)); //TODO: sistemare
      this.trip.id = Number(this.$route.params.tripID);
      console.log(this.trip.path)
      this.mapIsReady = true;
      this.mapReady=true;
    } else {
      this.editmode = false;
    }
  },
  
};
</script>