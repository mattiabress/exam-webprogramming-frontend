import Api from '@/utilities/Api'
const base_route_route = "/trip"

export default {
  getAllTrips() {
    return Api().get(base_route_route)
  },
  getTripByID(tripId) {
    return Api().get(base_route_route + "/" + tripId)
  },
  getAllTripsByDate(startdate, enddate) {
    if (startdate === null || startdate === undefined || startdate === "")
      return Api().get(base_route_route + "?enddate=" + enddate)
    else
      return Api().get(base_route_route + "?startdate=" + startdate + "&enddate=" + enddate)
  },
  createTrip(trip) {
    return Api().post(base_route_route, trip)
  },
  updateTrip(tripId, trip) {
    return Api().put(base_route_route + "/" + tripId, trip)
  },
  deleteTrip(tripId) {
    return Api().delete(base_route_route + "/" + tripId)
  },
}