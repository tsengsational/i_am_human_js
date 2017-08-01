function createTags() {
  let id = 0

  return class {
    constructor(category_id, thought_id) {
      this.category_id = category_id
      this.thought_id = thought_id
      this.id = ++id
      store.tags.push(this)
    }
  }
}

let Tag = createTags()
