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
    let isStartDateNull = startdate === null || startdate === undefined || startdate === "";
    let isEndDateNull = enddate === null || enddate === undefined || enddate === "";
    if (!isStartDateNull && !isEndDateNull)
      return Api().get(base_route_route + "?startdate=" + startdate + "&enddate=" + enddate);
    else if (isStartDateNull)
      return Api().get(base_route_route + "?enddate=" + enddate);
    else if (isEndDateNull)
      return Api().get(base_route_route + "?startdate=" + startdate);
    else
      ;
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