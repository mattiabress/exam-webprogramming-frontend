import Api from '@/utilities/Api'
const base_route_route="/trip"

export default {
  getAllTrips () {
    return Api().get(base_route_route)
  },
  getTripByID (tripId) {
    return Api().get(base_route_route+"/"+tripId)
  },
  createTrip (trip) {
    return Api().post(base_route_route, trip)
  },
  updateTrip (tripId,trip) {
    return Api().put(base_route_route+"/"+tripId, trip)
  },
  deleteTrip (tripId) {
    return Api().delete(base_route_route+"/"+tripId)
  },
}