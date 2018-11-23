import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import CardsComponent from './components/CardsComponent';
import ArenaComponent from "./components/ArenaComponent";
import ArenasComponent from './components/ArenasComponent';
import ChestsComponent from './components/ChestsComponent';
import LeaguesComponent from './components/LeaguesComponent';
import PlayersComponent from './components/PlayersComponent';


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
      path: '/login',
      name: 'login',
      component: LoginComponent
    },
    {
      path: '/cards',
      name: 'cards',
      component: CardsComponent
    },
    {
      path: '/arenas',
      name: 'arenas',
      component: ArenasComponent
    },
    {
      path: '/chests',
      name: 'chests',
      component: ChestsComponent
    },
    {
      path: '/leagues',
      name: 'leagues',
      component: LeaguesComponent
    },
    {
      path: '/players',
      name: 'players',
      component: PlayersComponent
    },
    {
      path: '/arenas/:id',
      name: 'arena',
      component: ArenaComponent,
      props: true
    }
  ]
})