/* 
  Imagenes:
    /images/arenas/${idName}.png	Arenas images
    /images/cards/${idName}.png	Cards images
    /images/chests/${idName}.png	Chests images
    /images/leagues/${idName}.png	Leagues images
*/
const baseURL = 'http://www.clashapi.xyz/api/';
const imagesURL = 'http://www.clashapi.xyz/images/';
import axios from 'axios';
export default {
  getAllArenas() {
    return axios.get(baseURL + "arenas");
  },
  getArena(idName) {
    return axios.get(baseURL + 'arenas/' + idName);
  },
  getAllCards() {
    return axios.get(baseURL + "cards");
  },
  getCardEspecific() {
    return axios.get(baseURL + 'cards/' + idName);
  },
  getAllChests() {
    return axios.get(baseURL + "chests");
  },
  getChest() {
    return axios.get(baseURL + 'chests/' + idName);
  },
  getAllLeagues() {
    return axios.get(baseURL + "leagues");
  },
  getLeague() {
    return axios.get(baseURL + 'leagues/' + idName);
  },
  getAllPlayers() {
    return axios.get(baseURL + "players");
  },
  getPlayer() {
    return axios.get(baseURL + 'players/' + idName);
  }
}
