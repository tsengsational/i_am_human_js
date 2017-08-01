function createComments () {
  let id = 0

  return class {
    constructor (content, thought_id, user_id) {
    this.content = content
    this.thought_id = thought_id
    this.user_id = user_id
    this.id = ++id
    store.comments.push(this)
    }
  }

}

let Comment = createComments()
