function createSessionsController(){
  let current_user = null

  return class {

    static logIn(username){
      let user = User.findByUserName(username)
      if typeof user === 'undefined' {
        throw new Error('No user with username ' + username)
      }

      this.username = fetch(`http://localhost:3000/users/${user_id}`)
        .then((response) => {return response.json().username})
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

let SessionsController = createSessionsController()
