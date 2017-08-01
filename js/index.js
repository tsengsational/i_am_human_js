const store = {categories: [], tags: [], thoughts: [], comments: [], users: []}


$(() => {

CategoriesController.renderCategories()
CategoriesController.addListenerForCategory('#render-categories', 'click')


})

function render(html, where) {
  $(where).empty()
  $(html).appendTo(where)
}
