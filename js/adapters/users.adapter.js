class UsersAdapter {

  static index() {
    $.get(`${BASE_URL}/users`, (response) => {
      response.forEach((user) => {
        UsersAdapter.saveToStore(user)
      })
    })
  }

  static create(username) {
    // make API call to create user
    // get response back
    // instantiate a new User object with the response data (createFromApi)
    $.post(`${BASE_URL}/users`,
      {user: {username: username}},
      User.createFromApi)
  }



  static show(userId) {
    $.get(`${BASE_URL}/users/${userId}`, UsersAdapter.saveToStore)
  }

  static saveToStore(userData) {
    // if the user is in the store, cool.  If not, save it to the store
    let possibleUser = User.find(userData.id)
    if(typeof possibleUser === 'undefined') {
      User.createFromApi(userData)
    }
  }


  // static update() {}
  //
  // static destroy() {}


}
