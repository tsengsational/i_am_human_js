class UsersAdapter {

  static index() {
    return $.get(`${BASE_URL}/users`, (response) => {
      response.forEach((user) => {
        UsersAdapter.saveToStore(user)
      })
    })
    console.log(store)
  }

  static seed(){
    this.index().then(seedUsers)
  }

  static create(username) {
    // make API call to create user
    // get response back
    // instantiate a new User object with the response data (createFromApi)
    return fetch(`${BASE_URL}/users`,
      {body: JSON.stringify({user: {username: username}}), method: 'POST', headers:{"Content-Type": "application/json"}})
      .then(response => {return response.json()})
      .then(User.createFromApi)

  }



  static show(userId) {
    $.get(`${BASE_URL}/users/${userId}`, UsersAdapter.saveToStore)
  }

  static saveToStore(userData) {
    // if the user is in the store, cool.  If not, save it to the store
    let possibleUser = User.find(userData.id)
    if(typeof possibleUser === 'undefined') {
      return User.createFromApi(userData)
    }
    return possibleUser
  }


  // static update() {}
  //
  // static destroy() {}


}
