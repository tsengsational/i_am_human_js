const store = {categories: [], tags: [], thoughts: [], comments: [], users: []}


$(() => {





})

function render(html, where) {
  $(where).empty()
  $(html).appendTo(where)
}
