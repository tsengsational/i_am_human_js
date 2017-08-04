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
      <div class="card">
        <div class="card-content">
          <p>${user.username}: ${this.content} </p>
        </div>
      </div>
      `
    }

    static createFromApi(commentData) {
      if(commentData.id == null) {
        console.log(commentData)
        console.warn('Unable to create comment')
        return null
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
