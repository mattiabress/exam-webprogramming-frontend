import Api from '@/utilities/Api'
const base_route_user = "/user"
export default {

  login(credentials) {
    return Api().post(base_route_user + '/login', credentials)
  },
  register(credentials) {
    return Api().post(base_route_user + '/signup', credentials)
  },
  getAllUsers() {
    return Api().get(base_route_user)
  },
  getUser(userId) {
    return Api().get(base_route_user + '/' + userId)
  },
  deleteUser(userId) {
    return Api().delete(base_route_user + '/' + userId)
  },
  logout() {
    return Api().delete(base_route_user + '/logout')
  },
}