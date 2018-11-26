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
  getCard(idName) {
    return axios.get(baseURL + 'cards/' + idName);
  },
  getAllChests() {
    return axios.get(baseURL + "chests");
  },
  getChest(idName) {
    return axios.get(baseURL + 'chests/' + idName);
  },
  getAllLeagues() {
    return axios.get(baseURL + "leagues");
  },
  getLeague(idName) {
    return axios.get(baseURL + 'leagues/' + idName);
  },
  getAllPlayers() {
    return axios.get(baseURL + "players");
  },
  getPlayer(idName) {
    return axios.get(baseURL + 'players/' + idName);
  },

  translateImagesUrl(chests) {
    chests.forEach(function (chest) {
      chest.url = chest.idName.replace("-" + chest.arena, "");
      if (chest.idName.indexOf("'") != -1) {
        chest.url = chest.url.replace(/'/gi, "");
      }
      if (chest.league) {
        chest.url = chest.url.replace("-" + chest.league, "");
      }
      if (chest.name === "Season Reward Chest") {
        chest.urlLocal = "./../media/chest.png";
      }

    })
    return chests;
  },

  translateImageUrl(chest) {
    chest.url = chest.idName.replace("-" + chest.arena, "");
    if (chest.idName.indexOf("'") != -1) {
      chest.url = chest.url.replace(/'/gi, "");
    }
    if (chest.league) {
      chest.url = chest.url.replace("-" + chest.league, "");
    }
    return chest;
  }
}