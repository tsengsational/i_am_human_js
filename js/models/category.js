function createCategories () {
  let id = 0

  return class {
    constructor (name, image_url) {
    this.name = name
    this.image_url = image_url
    this.id = ++id
    store.categories.push(this)
    }
  }

}

let Category = createCategories()
