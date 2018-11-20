
export default{
  login(username,pass){
    let tok = username+pass;
    $cookies.set("U53RN4M3",btoa(tok),60*30);
  }
}