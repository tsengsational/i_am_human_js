function createThoughtsController(){
  return class {

    static addListenerToSubmit(){
      $('.create-thought').submit(() => {
        event.preventDefault()
        this.createFromForm()
      })

    }

    static addListenerToRenderForm(){
      $('body').on('click', '#render-thought-form', () => {
        render(Thought.formTemplate(), ".form-here" )
        this.addListenerToSubmit()
      })
    }


    static createFromForm(){
      let title = $('#title').val()
      let content = $('#content').val()
      let user = User.findByUserName($('#username').val())
      if (typeof user === 'undefined'){
        let user_id = 1
      } else {
        let user_id = user.id
      }
      let newThought = ThoughtsAdapter.create(title, content, user_id)
      debugger
      render(this.thoughtsHTML(newThought), ".thought-here")

    }

    static thoughtsHTML(thought){
      return `
      <h3>${thought.title}</h3>
      <p>${thought.content}</p>
      <button type="delete" class="destroy-thought">Delete this thought</button>
      <button type="edit" class="edit-thought">Edit this thought</button>
      `
    }

    static usersThoughtsHTML(allUsersThoughts){
          let html = ""
          allUsersThoughts.forEach((thought) => {
          html += ThoughtsController.thoughtsHTML(thought)
          })
          $('.form-here').empty()
        render(html, ".thoughts-here")
    }

  }
}

let ThoughtsController = createThoughtsController()
