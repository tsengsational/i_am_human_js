const store = {categories: [], tags: [], thoughts: [], comments: [], users: []}
const colors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange']

$(() => {

$('select').material_select();
$('.responsive-img').on('click', function(event) {
  event.preventDefault()
})

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
