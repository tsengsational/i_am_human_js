function createTags() {

  return class {
    constructor(category_id, thought_id, id) {
      this.category_id = category_id
      this.thought_id = thought_id
      this.id = id
      store.tags.push(this)
    }

    static find(id) {
      return store.tags.find((tag) => {
        return tag.id === id
      })
    }

    static createFromApi(tagData) {
      if(tagData.id == null) {
        console.log(tagData)
        console.warn('Unable to create tag')
      }
      return new Tag (tagData.category_id, tagData.thought_id, tagData.id)
    }

    removeFromStore() {
      let idx = store.tags.indexOf(this)
      store.tags.splice(idx, 1)
    }


  } //end of class
}

let Tag = createTags()
