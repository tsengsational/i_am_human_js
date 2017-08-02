class CategoriesAdapter {

  static index() {
    $.get(`${BASE_URL}/categories`, (response) => {
      response.forEach((category) => {
        CategoriesAdapter.saveToStore(category)
      })
    })
  }

  static create(name, image_url) {
    $.post(`${BASE_URL}/categories`,
      {category: {name: name,
                  image_url: image_url}},
      Category.createFromApi)
  }

  static show(id) {
    $.get(`${BASE_URL}/categories/${id}`, CategoriesAdapter.saveToStore)
  }

  static update(category){
    $.ajax({
      method: 'PATCH',
      url: `${BASE_URL}/thoughts/${category.id}`,
      data: {category: {
              name: category.name,
              image_url: category.image_url,
            }},
      success: function(response){
        category.name = response.name;
        category.image_url = response.image_url;
        console.log(category)
      },
    })
  };

  static saveToStore(categoryData) {
    let possibleCategory = Category.find(categoryData.id)
    if(typeof possibleCategory === 'undefined') {
      Category.createFromApi(categoryData)
    }
  }
}
