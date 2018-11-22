import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import CardsComponent from './components/CardsComponent';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    },
    {
      path:'/login',
      name:'login',
      component: LoginComponent
    },
    {
      path:'/cards',
      name:'cards',
      component: CardsComponent
    }
  ]
})