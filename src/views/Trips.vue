<template>
    <div class="trips">
        <div class="container">
            <b-row class="mt-5">
                <b-col>
                    <h1><strong>I miei viaggi</strong></h1>
                </b-col>

            </b-row>
            <b-row align-v="top">
                <b-col cols="12" md="2"><strong>Filtra Per data:</strong></b-col>
                <b-col cols="6" md="3">
                    <b-form-datepicker :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        v-model="searchStartDate" class="mb-2" @input="getAllTripsByDate()"></b-form-datepicker>
                </b-col>
                <b-col cols="6" md="3">
                    <b-form-datepicker :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        v-model="searchEndDate" class="mb-2" @input="getAllTripsByDate()"></b-form-datepicker>
                </b-col>
                <b-col cols="6" md="2"><button type="button" class="btn btn-success" @click="loadTrip()">
                        <b-icon-arrow-repeat></b-icon-arrow-repeat> 
                    </button></b-col>
                <b-col cols="6" md="1">
                    <router-link :to="{ name: 'trip' }"><button type="button" class="btn btn-success"><b-icon-plus-lg></b-icon-plus-lg></button>
                    </router-link>
                </b-col>
            </b-row>


            <b-table hover :items="trips" :fields="fields" :busy="isBusy" class="mt-3" label-sort-asc=""
                label-sort-desc="" label-sort-clear="" responsive>
                <template #table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                </template>
                <template #cell(id)="data">
                    <router-link :to="{ name: 'trip', params: { tripID: data.value } }">
                        <button type="button" class="btn btn-success">
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
                    label: 'Edit',
                },
                {
                    key: 'name',
                    label: 'Nome',
                    sortable: true
                },
                {
                    key: 'tripDate',
                    label: 'Data',
                    sortable: true
                },
                {
                    key: 'elimina',
                    label: 'Elimina',
                },
            ],
            trips: [{"id":1,"name":"Primo viaggio","tripDate":"2022-08-25","vehicle":"macchina","path":{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"LineString","coordinates":[[13.770461,45.654738],[13.773208,45.653988],[13.776255,45.653148],[13.777714,45.650208],[13.778658,45.648468],[13.776813,45.649608],[13.772264,45.650058],[13.768616,45.651648]]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.770332,45.654708]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.775911,45.653028]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.778615,45.648498]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.776727,45.649488]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.772049,45.649878]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.768444,45.651558]},"properties":{}}]},"user":{"id":1,"username":"root","email":"root@root","firstname":"root","lastname":"root"}},{"id":2,"name":"secondo viaggio","tripDate":"2022-08-26","vehicle":"monopattino","path":{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"LineString","coordinates":[[13.775139,45.655158],[13.776469,45.652968],[13.779345,45.654078],[13.782649,45.656358],[13.786812,45.656538],[13.789687,45.656508],[13.785996,45.654048],[13.789387,45.654498],[13.79355,45.655338],[13.797927,45.654798],[13.789344,45.653658],[13.789473,45.652098],[13.791876,45.652638],[13.793764,45.651168],[13.795953,45.650478],[13.797154,45.649698]]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.775096,45.655218]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.776469,45.652878]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.782692,45.656268]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.789773,45.656418]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.785911,45.654018]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.793721,45.655248]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.797798,45.654798]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.797112,45.649488]},"properties":{}}]},"user":{"id":1,"username":"root","email":"root@root","firstname":"root","lastname":"root"}},{"id":3,"name":"Terzo viaggio","tripDate":"2022-08-27","vehicle":"bici","path":{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"LineString","coordinates":[[13.760934,45.646683],[13.768873,45.651663],[13.771148,45.656283],[13.771749,45.657513],[13.773723,45.657933],[13.775997,45.658592],[13.777242,45.657153],[13.775053,45.656343],[13.775353,45.654933],[13.777885,45.649593],[13.780589,45.646083],[13.785996,45.647583],[13.790717,45.649773],[13.791919,45.650193],[13.791704,45.652683],[13.79458,45.650523],[13.799558,45.648393]]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.760934,45.646713]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.768916,45.651723]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.771791,45.657363]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.776083,45.658262]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.777285,45.656973]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.78046,45.645963]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.791747,45.652623]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[13.799386,45.648273]},"properties":{}}]},"user":{"id":2,"username":"mattia","email":"mattia@mattia","firstname":"mattia","lastname":"Bressan"}}],
            searchStartDate: null,
            searchEndDate: null
        };
    },
    methods: {
        loadTrip: async function () {
            this.isLoaded = false
            try {
                const response = await TripApi.getAllTrips();
                if (response.status == 200) {
                    this.trips = response.data;
                    this.isLoaded = true;
                }
            } catch (error) {
                const e = error.toJSON()
                if (e.status == 401) {
                    alert("Token scaduto")
                    localStorage.removeItem('token');
                    localStorage.removeItem('isAuthenticated');
                    localStorage.removeItem('userinfo');
                    this.$router.push({ path: '/login' })
                } else
                    alert(e.message)
            }

        },
        deleteTrip: async function (tripId) {
            if (confirm("Vuoi veramente cancellare il viaggio?")) {
                try {
                    const response = await TripApi.deleteTrip(tripId);
                    if (response.status == 200) {
                        alert("Viaggio cancellato");
                        await this.loadTrip();
                    }
                } catch (error) {
                    const e = error.toJSON()
                    if (e.status == 401) {
                        alert("Token scaduto")
                        localStorage.removeItem('token');
                        localStorage.removeItem('isAuthenticated');
                        localStorage.removeItem('userinfo');
                        this.$router.push({ path: '/login' })
                    } else if (e.status == 409) {
                        alert("Non riuscito a cancellare")
                    } else if (e.status == 404) {
                        alert("Non trovato")
                    } else
                        alert(e.message)
                }


            }
        },
        getAllTripsByDate: async function () {
            if (this.searchEndDate < this.searchStartDate)
                return alert("Data di fine non può essere maggiore di inzio");
            this.isLoaded = false
            try {
                const response = await TripApi.getAllTripsByDate(this.searchStartDate, this.searchEndDate);
                if (response.status == 200) {
                    this.trips = response.data;
                    this.isLoaded = true;
                }
            } catch (error) {
                const e = error.toJSON()
                if (e.status == 401) {
                    alert("Token scaduto")
                    localStorage.removeItem('token');
                    localStorage.removeItem('isAuthenticated');
                    localStorage.removeItem('userinfo');
                    this.$router.push({ path: '/login' })
                } else
                    alert(e.message)
            }
        },
    },
    mounted: async function () {

        await this.loadTrip();
    }
}
</script>