function createThoughtsController(){
  return class {

    static addListenerToSubmit(){
      $('.create-thought').submit(() => {
        event.preventDefault()
        this.createFromForm()
        $('.form-here').empty()

      })
    }

    static addListenerToRenderForm(){
      $('body').on('click', '#render-thought-form', () => {
        render(Thought.formTemplate(), ".form-here" ).hide().slideDown('medium')
        $('select').material_select()
        this.addListenerToSubmit()
      })
    }

    static addListenerToLike(){
      $('.js-like-button').on('click', () => {
        let thought = Thought.find(parseInt(event.target.id))
        thought.addLikes()
      })
    }

    static addListenerToEdit(){

    }

    static addListenderToThoughtView(){
      $('body').on('click', 'js-thought-view', function(event){
        let thought = Thought.find(parseInt(event.target.id))
        thought.addView()
      })
    }



    static createFromForm(){
      let selectCategories = [...$('#category-selector option:selected')]
      selectCategories.shift()
      let title = $('#title').val()
      let content = $('#content').val()
      let user = User.findByUserName($('#username').val())
      let user_id;
      if (typeof user === 'undefined'){
        user_id = 1
      } else {
        user_id = user.id
      }
      ThoughtsAdapter.create(title, content, user_id, selectCategories)
    }

    static renderNewThought(thoughtData){
      let newThought = Thought.createFromApi(thoughtData)

      render(newThought.thoughtsHTML(), ".thought-here")
      ThoughtsController.addListenerToLike()
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
