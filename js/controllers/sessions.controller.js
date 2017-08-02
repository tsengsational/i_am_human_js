function createSessionsController(){
  let id = 0
  let current_user = null

  return class {
    constructor(user_id){
      this.user_id = user_id
      this.username = fetch(`http://localhost:3000/users/${user_id}`)
        .then(respones => return response.json().username)
      current_user = this.username
    };

    static current_user(){
      return current_user
    }

    static logOut(){
      let index = store.sessions.findIndex(function(session){
        return session.username === store.current_user
      })
      current_user = null
    }
  }
}

let SessionController = createSessionsController()
