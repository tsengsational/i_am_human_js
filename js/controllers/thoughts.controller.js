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
        render(this.formHTML(), ".form-here" )
        this.addListenerToSubmit()
      })
    }

    static formHTML(){
    return `
      <h3>Create a Thought</h3>
      <form class="create-thought" action="index.html" method="post">
        <input type="text" name="thought[title]" placeholder="title" id="title">
        <input type="text" name="thought[content]" placeholder="content" id="content">
        <input type="text" name="thought[username]" placeholder="username" id="username">
        <input type="submit" value="submit">
      </form>
      `
      // debugger
      // render(html, ".form-here")
    }

    static createFromForm(){
      let title = $('#title').val()
      let content = $('#content').val()
      let user = User.findOrCreate($('#username').val())
      let newThought = new Thought(title, content, user.id)
      // let allUsersThoughts = user.thoughts()
      render(this.thoughtsHTML(newThought), ".thought-here")
      // ThoughtsController.usersThoughtsHTML()

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
