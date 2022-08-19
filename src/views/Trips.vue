<template>
  <div class="trips">
    <div class="container">
      <b-row class="mt-5">
        <b-col> <h2>I miei viaggi</h2> </b-col>
       
      </b-row>
      <b-row align-v="top">
        <b-col>Filtra Per data: </b-col>
        <b-col>
          <b-form-datepicker :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            v-model="searchStartDate" class="mb-2" @input="getAllTripsByDate()"></b-form-datepicker>
        </b-col>
        <b-col>
          <b-form-datepicker :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            v-model="searchEndDate" class="mb-2" @input="getAllTripsByDate()"></b-form-datepicker>
        </b-col>
        <b-col><button type="button" class="btn btn-success" @click="loadTrip()">
            <b-icon-arrow-repeat ></b-icon-arrow-repeat>
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
          <router-link :to="{ name: 'trip', params: { tripID: data.value } }">
          <button type="button" class="btn btn-success" >
            <b-icon-pencil-square></b-icon-pencil-square>
          </button>
          </router-link>
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
.table {
    color: #006060;
}

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
      trips: [
    {
        "id": 1,
        "name": "Venezuela",
        "tripDate": "2022-08-18",
        "vehicle": "motorbike",
        "path": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                13.771706,
                                45.649418
                            ],
                            [
                                13.767071,
                                45.651788
                            ],
                            [
                                13.769217,
                                45.654908
                            ],
                            [
                                13.774731,
                                45.65423
                            ],
                            [
                                13.783915,
                                45.65345
                            ],
                            [
                                13.781769,
                                45.64892
                            ]
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            13.731923,
                            45.641432
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            13.771727,
                            45.6494
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            13.77001,
                            45.65285
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            13.769195,
                            45.65492
                        ]
                    }
                }
            ]
        },
        "user": {
            "id": 1,
            "username": "root",
            "email": "root@root",
            "firstname": "root",
            "lastname": "root"
        }
    },
    {
        "id": 5,
        "name": "mio viaggio a NY",
        "tripDate": "2022-08-19",
        "vehicle": "bus",
        "path": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                13.768036,
                                45.65186
                            ],
                            [
                                13.770311,
                                45.65357
                            ],
                            [
                                13.780396,
                                45.65423
                            ],
                            [
                                13.78619,
                                45.65078
                            ],
                            [
                                13.782413,
                                45.64787
                            ]
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            13.767951,
                            45.65183
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            13.77044,
                            45.6536
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            13.780439,
                            45.65411
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            13.786061,
                            45.65072
                        ]
                    }
                }
            ]
        },
        "user": {
            "id": 1,
            "username": "root",
            "email": "root@root",
            "firstname": "root",
            "lastname": "root"
        }
    },
    {
        "id": 7,
        "name": "pippo",
        "tripDate": "2022-08-18",
        "vehicle": "ad",
        "path": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                13.765032,
                                45.65219
                            ],
                            [
                                13.7728,
                                45.6539
                            ],
                            [
                                13.777864,
                                45.65198
                            ],
                            [
                                13.777606,
                                45.65135
                            ]
                        ]
                    }
                }
            ]
        },
        "user": {
            "id": 1,
            "username": "root",
            "email": "root@root",
            "firstname": "root",
            "lastname": "root"
        }
    },
    {
        "id": 10,
        "name": "mio viaggio di mario",
        "tripDate": "2022-08-18",
        "vehicle": "macchina",
        "path": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                13.776104,
                                45.65084
                            ],
                            [
                                13.779924,
                                45.65462
                            ],
                            [
                                13.786533,
                                45.65399
                            ],
                            [
                                13.783572,
                                45.6485
                            ]
                        ]
                    }
                }
            ]
        },
        "user": {
            "id": 8,
            "username": "mario",
            "email": "mark@twain.com",
            "firstname": "Mark",
            "lastname": "Twain"
        }
    },
    {
        "id": 12,
        "name": "Mattia",
        "tripDate": "2022-08-10",
        "vehicle": "dsad",
        "path": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                13.770247,
                                45.65054
                            ],
                            [
                                13.773508,
                                45.65372
                            ],
                            [
                                13.783078,
                                45.65375
                            ],
                            [
                                13.782306,
                                45.64796
                            ]
                        ]
                    }
                }
            ]
        },
        "user": {
            "id": 8,
            "username": "mario",
            "email": "mark@twain.com",
            "firstname": "Mark",
            "lastname": "Twain"
        }
    },
    {
        "id": 13,
        "name": "Viaggio mattia",
        "tripDate": "2022-08-09",
        "vehicle": "dadad",
        "path": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                13.769388,
                                45.651055
                            ],
                            [
                                13.776813,
                                45.654955
                            ],
                            [
                                13.784108,
                                45.653425
                            ],
                            [
                                13.781705,
                                45.650665
                            ]
                        ]
                    }
                }
            ]
        },
        "user": {
            "id": 9,
            "username": "mattia",
            "email": "mati22b@gmail.com",
            "firstname": "Mattia",
            "lastname": "Bressan"
        }
    }
],
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