function createUsers() {


  return class {
    constructor(username, id) {
      this.username = username
      this.id = id
      store.users.push(this)
    }

  static findByUserName(username) {
    return store.users.find((user) => {
      return user.username === username
      })
  }

  static find(id) {
    return store.users.find((user) => {
      return user.id === id
    })
  }

  static findOrCreate(username) {
    let existingUser = User.findByUserName(username)
    if(typeof existingUser != 'undefined') {
      return Promise.resolve(existingUser)
    } else {
      return UsersAdapter.create(username)
    }
  }


  static createFromApi(userData) {
    if(userData.id == null) {
      console.log(userData)
      console.warn('Unable to create user')
    }
    return new User (userData.username, userData.id)
  }

  thoughts(){
    return store.thoughts.filter((thought) => {
      return thought.user_id === this.id
    })
  }


} //end of class

}

let User = createUsers()
