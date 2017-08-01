function createSession(){
  let id = 0

  return class {
    constructor(user_id){
      this.user_id = user_id
      this.username = fetch(`http://localhost:3000/users/${user_id}`)
        .then(respones => return response.json().username)
      this.startTime = Date.now
      this.endTime = null
      store.sessions.push(this)
      store.current_user = this.username
    };

    static logOut(){
      let index = store.sessions.findIndex(function(session){
        return session.username === store.current_user
      })
      let session = store.sessions[index]
      session.endtime = Date.now
      store.current_user = null
    }
  }
}

let Session = createSession()
