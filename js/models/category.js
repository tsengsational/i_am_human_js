function createCategories () {


  return class {
    constructor (name, image_url, id) {
    this.name = name
    this.image_url = image_url
    this.id = id
    store.categories.push(this)
    }

    static find(id) {
      return store.categories.find((category) => {
        return category.id === id
      })
    }

    static createFromApi(categoryData) {
      return new Category(categoryData.name, categoryData.image_url, categoryData.id)
    }


  } //end of class

}

let Category = createCategories()
