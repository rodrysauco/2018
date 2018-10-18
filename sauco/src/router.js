import Vue from 'vue';
import VueRouter from 'vue-router';
import AddPerson from './components/AddPerson';
import PersonList from './components/PersonList';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/add',
      name: "add",
      component: AddPerson,
    },
    {
      path: '/',
      name: "home",
      component: PersonList,
    },
    {
      path: '/user/:id',
      name: "user",
      component: AddPerson,
      props : true
    },
  ]
})