class CategoriesAdapter {

  static index() {
    $.get(`http://localhost:3000/categories`, (response) => {
      response.forEach((category) => {
        CategoriesAdapter.saveToStore(category)
      })
    })
  }

  static create(name, image_url) {
    $.post(`http://localhost:3000/categories`,
      {category: {name: name,
                  image_url: image_url}},
      Category.createFromApi)
  }

  static show(id) {
    $.get(`http://localhost:3000/categories/${id}`, CategoriesAdapter.saveToStore)
  }

  static saveToStore(categoryData) {
    let possibleCategory = Category.find(categoryData.id)
    if(typeof possibleCategory === 'undefined') {
      Category.createFromApi(categoryData)
    }
  }
}
