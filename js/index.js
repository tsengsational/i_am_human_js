const store = {categories: [], tags: [], thoughts: [], comments: [], users: []}


$(() => {

CategoriesController.renderCategories()
CategoriesController.addListenerForCategory('#render-categories', 'click')
ThoughtsController.addListenerToRenderForm()


})

function render(html, where) {
  $(where).empty()
  $(html).appendTo(where)
}
