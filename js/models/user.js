function createUsers() {
  let id = 0

  return class {
    constructor(username) {
      this.username = username
      this.id = ++id
      store.users.push(this)
    }

  static findByUserName(username) {
    return store.users.find((user) => {
      return user.username === username
      })
  }

  static findOrCreate(username) {
    let existingUser = User.findByUserName(username)
    if(existingUser != null) {
      console.log('User already exists')
      return existingUser
    } else {
      console.log('Created new user')
      return new User(username)
    }
  }

  }

}

let User = createUsers()
