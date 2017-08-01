const store = {categories: [], tags: [], thoughts: [], comments: [], users: []}


$(() => {

CategoriesController.renderCategories()



})

function render(html, where) {
  $(where).empty()
  $(html).appendTo(where)
}
