const store = {categories: [], tags: [], thoughts: [], comments: [], users: []}


$(() => {

$('select').material_select();
$('.responsive-img').on('click', function(event) {
  event.preventDefault()
})

CategoriesController.renderCategories()
CategoriesController.addListenerForCategory('#render-categories', 'click')
ThoughtsController.addListenerToRenderForm()


})

function render(html, where) {
  $(where).empty()
  return $(html).appendTo(where)
}
