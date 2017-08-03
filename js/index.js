const store = {categories: [], tags: [], thoughts: [], comments: [], users: []}


$(() => {

$('select').material_select();

CategoriesController.renderCategories()
CategoriesController.addListenerForCategory('#render-categories', 'click')
ThoughtsController.addListenerToRenderForm()
CategoriesController.addListenertoRenderCategory()


})

function render(html, where) {
  $(where).empty()
  return $(html).appendTo(where)
}

function clearPage(){
  $('.js-clear').empty()
}
