import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Trip from '../views/Trip.vue'
import Trips from '../views/Trips.vue'


import { authGuard } from '../auth/AuthGuard';

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Trips,
    beforeEnter: authGuard,
    meta: { transition: 'fade' },
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/trip',
    name: 'trip',
    component: Trip,
    beforeEnter: authGuard,
    meta: { transition: 'slide-right' },
  },
  {
    path: '/trip/:tripID',
    name: 'trip',
    component: Trip,
    beforeEnter: authGuard,
    meta: { transition: 'slide-right' },
  },
  {
    path: '/trips',
    name: 'trips',
    component: Trips,
    beforeEnter: authGuard,
    meta: { transition: 'slide-right' },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
