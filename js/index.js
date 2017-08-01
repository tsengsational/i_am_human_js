const store = {categories: [], tags: [], thoughts: [], comments: [], users: [], sessions: [], current_user: null}


$(() => {





})

function render(html, where) {
  $(where).empty()
  $(html).appendTo(where)
}
