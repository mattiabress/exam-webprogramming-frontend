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
                    <router-link :to="{ name: 'trip' }"><button type="button" class="btn btn-success">
                            <b-icon-plus-lg></b-icon-plus-lg>
                        </button>
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
            trips: null,
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