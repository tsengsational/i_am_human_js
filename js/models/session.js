function createSession(){
  let id = 0

  return class {
    constructor(user_id){
      this.user_id = user_id
      this.user = fetch(`http://localhost:3000/users/${user_id}`)
        .then(respones => response.json())
        .then(json => )
    };
  }
}
