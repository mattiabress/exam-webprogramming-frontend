<template>
  <div class="trip">
    <div class="container">
      <form>
        <b-row class="mt-5">
          <b-col>
            <router-link :to="{ name: 'trips' }">
              <b-button variant="success">
                <b-icon-arrow-left></b-icon-arrow-left> Indietro
              </b-button>
            </router-link>
          </b-col>
          <b-col>
            <h2>Viaggio a: {{ trip.name }}</h2>
          </b-col>
          <b-col>
            <b-button v-if="editmode" variant="success" @click.prevent="editTrip()">Modifica</b-button>
            <b-button v-if="!editmode" variant="success" @click.prevent="addTrip()">Aggiungi</b-button>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <label for="name">Nome:</label>
          </b-col>
          <b-col>
            <label for="tripDate">Data del viaggio:</label>
          </b-col>
          <b-col>
            <label for="vehicle">Veicolo:</label>
          </b-col>
        </b-row>
        <b-row class="mt-2 mb-4">
          <b-col>
            <b-form-input v-model="trip.name" id="name" placeholder="Nome" type="text"></b-form-input>
          </b-col>
          <b-col>
            <b-form-datepicker id="tripDate"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" v-model="trip.tripDate"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-form-input v-model="trip.vehicle" id="vehicle" placeholder="Veicolo" type="text"></b-form-input>
          </b-col>
        </b-row>
      </form>
      <b-row>
        <l-map ref="myMap" @ready="setUpTheMap(trip.path)" style="height: 500px" :zoom="zoom" :center="center"
          :drawControl="drawControl" v-if="mapReady">
          <l-draw></l-draw>
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <!-- <l-marker :lat-lng="markerLatLng"></l-marker> -->
          <l-feature-group ref="features"></l-feature-group>
          <l-geo-json :geojson="geojson"></l-geo-json>
        </l-map>
      </b-row>

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
      mapReady: false,
      docState: "saved",
    };
  },
  methods: {
    checkInputs: function () {
      if (this.trip === undefined || this.trip === null) {
        alert("Error");
        return false;
      }
      if (this.trip.name === undefined || this.trip.name === null || this.trip.name === "") {
        alert("inserisci il Nome del viaggio");
        return false;
      }
      if (this.trip.tripDate === undefined || this.trip.tripDate === null || this.trip.tripDate === "") {
        alert("inserisci la data del viaggio");
        return false;
      }
      if (this.trip.vehicle === undefined || this.trip.vehicle === null || this.trip.vehicle === "") {
        alert("inserisci il veicolo usato");
        return false;
      }
      if (this.trip.path === undefined || this.trip.path === null) {
        alert("inserisci il percorso");
        return false;
      }
      return true;
    },
    loadTrip: async function (tripId) {
      try {
        const response = await TripApi.getTripByID(tripId);
        if (response.status == 200) this.trip = response.data;
        else
          alert("Problema caricamento viaggio");
      } catch (error) {
        const e = error.toJSON()
        if (e.status == 401) {
          alert(e.message)
          localStorage.removeItem('token');
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userinfo');
          this.$router.push({ path: '/login' })
        } else
          alert("Problema nell'inserimento del viaggio")
      }


    },
    addTrip: async function () {
      //set trip path
      this.trip.path = this.drawnItems.toGeoJSON();
      if (this.checkInputs()) {
        try {
          const response = await TripApi.createTrip(this.trip).catch(this.handleAxiosError);
          if (response.status == 201) {
            this.trip = response.data;
            alert("Viaggio inserito correttamente")
            this.$router.push({ path: '/trips' })
          } else
            alert("Problema nell'inserimento del viaggio")
        } catch (error) {
          const e = error.toJSON()
          if (e.status == 401) {
            alert(e.message)
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userinfo');
            this.$router.push({ path: '/login' })
          } else
            alert("Problema nell'inserimento del viaggio")

        }

      }

    },
    editTrip: async function () {
      //set trip path
      this.trip.path = this.drawnItems.toGeoJSON();
      try {
        const response = await TripApi.updateTrip(this.trip.id, this.trip);
        if (this.checkInputs()) {
          if (response.status == 200) {
            this.trip = response.data;
            alert("Viaggio aggiornato correttamente")
            this.$router.push({ path: '/trips' })
          } else
            alert("Problema nell'inserimento del viaggio")
        }
      } catch (error) {
        const e = error.toJSON()
        if (e.status == 401) {
          alert(e.message)
          localStorage.removeItem('token');
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userinfo');
          this.$router.push({ path: '/login' })
        } else
          alert("Problema nell'inserimento del viaggio")
      }
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
      //console.log(this.trip.path)
      //this.mapIsReady = true;
      this.mapReady = true;
    } else {
      this.editmode = false;
      this.mapReady = true;
    }
  },

};
</script>