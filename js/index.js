const store = {categories: [], tags: [], thoughts: [], comments: [], users: [], chats: [], messages: []}
const colors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange']

$(() => {

$('select').material_select();
$('.responsive-img').on('click', function(event) {
  event.preventDefault()
})
console.log('document ready')

// below was moved to seed.js

// CategoriesController.renderCategories()
// CategoriesController.addListenerForCategory('#render-categories', 'click')
// ThoughtsController.addListenerToRenderForm()
// CategoriesController.addListenertoRenderCategory()


})

console.log('loading index.js')
function render(html, where) {
  $(where).empty()
  return $(html).appendTo(where)
}

function clearPage(){
  $('.js-clear').empty()
}

function breadcrumbHTML(step){
  return `
  <li>
    <a href="#" class="js-crumb" id="crumb-${step}">${step}</a> /
  </li>
  `
}
