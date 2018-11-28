import Vue from 'vue';
import VueRouter from 'vue-router';

import loginService from "@/services/loginService.js";

import IndexComponent from './components/IndexComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import CardComponent from './components/CardComponent.vue';
import CardsComponent from './components/CardsComponent';
import ArenaComponent from "./components/ArenaComponent";
import ArenasComponent from './components/ArenasComponent';
import ChestComponent from './components/ChestComponent';
import ChestsComponent from './components/ChestsComponent';
import LeaguesComponent from './components/LeaguesComponent';
import LeagueComponent from './components/LeagueComponent';
import PlayersComponent from './components/PlayersComponent';
import PlayerComponent from './components/PlayerComponent';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexComponent
    },
    {
      path: '/home',
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
      path: '/cards/:id',
      name: 'card',
      component: CardComponent,
      props: true
    },
    {
      path: '/arenas',
      name: 'arenas',
      component: ArenasComponent
    },
    {
      path: '/arenas/:id',
      name: 'arena',
      component: ArenaComponent,
      props: true
    },
    {
      path: '/chests',
      name: 'chests',
      component: ChestsComponent
    },
    {
      path: '/chests/:id',
      name: 'chest',
      component: ChestComponent,
      props: true
    },
    {
      path: '/leagues',
      name: 'leagues',
      component: LeaguesComponent
    },
    {
      path: '/leagues/:id',
      name: 'league',
      component: LeagueComponent
    },
    {
      path: '/players',
      name: 'players',
      component: PlayersComponent
    },
    {
      path: '/players/:id',
      name: 'player',
      component: PlayerComponent
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = loginService.getCredentials();
  if (to.name !== 'login') {
    if (!token) {
      if (to.name === 'login') next()
      else next({ name: 'login' })

    } else {
      if (to.path === '/') next({ name: 'home' })
      else next()
    }
  } else {
    if (to.path === '/') next({ name: 'home' })
    else next()
  }
})

export default router;