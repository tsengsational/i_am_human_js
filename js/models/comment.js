function createComments () {


  return class {
    constructor (content, thought_id, user_id, id) {
    this.content = content
    this.thought_id = thought_id
    this.user_id = user_id
    this.id = id
    store.comments.push(this)
    }

    static find(id) {
      return store.comments.find((comment) => {
        return comment.id === id
      })
    }

    commentHTML(){
      let user = User.find(this.user_id)
      return `
      <p>${user.username}: ${this.content}
      `
    }

    static createFromApi(commentData) {
      if(commentData.id == null) {
        throw new Error('Unable to create comment')
      }
      return new Comment (commentData.content, commentData.thought_id, commentData.user_id, commentData.id)
    }

    removeFromStore() {
      let idx = store.comments.indexOf(this)
      store.comments.splice(idx, 1)
    }


  } //end of class

}

let Comment = createComments()
