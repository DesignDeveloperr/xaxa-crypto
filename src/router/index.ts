import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Main from "@/views/Main.vue";
import Collection from "@/views/Collection.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/collection',
    component: Collection
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
