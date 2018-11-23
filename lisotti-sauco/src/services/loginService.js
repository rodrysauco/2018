/* eslint-disable */
export default{
  login(username,pass){
    let tok = username+pass;
    $cookies.set("U53RN4M3",btoa(tok),60*30);
  },
  getCredentials(){
    return $cookies.get('U53RN4M3');
  },
  logout(){
    $cookies.remove('U53RN4M3');
  }
}