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
        clearPage()
        render(Thought.formTemplate(), ".form-here" ).hide().slideDown('medium')
        $('select').material_select()
        this.addListenerToSubmit()
      })
    }

    static addListenertoThoughtLink(){
      $('.js-thought-view').on('click', event => {
        event.preventDefault()
        let id = parseInt(event.target.id.split('-')[1])
        let thought = Thought.find(id)
        clearPage()
        render(thought.thoughtsHTML(), '.thought-here').hide().fadeIn()
        ThoughtsController.addListenerToLike()
        ThoughtsController.addListenerToDelete()
        let html = thought.comments().map(comment => {
          return comment.commentHTML()
        }).join('')
        render(html, '.comments-here')
        thought.addView()
        CommentsController.addListenerToCommentForm()
      })
    }

    static addListenerToLike(){
      $('.js-like-button').on('click', () => {
        let thought = Thought.find(parseInt($('.js-like-button')[0].id))
        thought.addLikes()
      })
    }

    static addListenerToDelete(){
      $('.js-delete-thought-button').on('click', ()=> {
        let id = parseInt($('.js-delete-thought-button')[0].id)
        ThoughtsAdapter.destroy(id)
        alert("Thought Destroyed")
        CategoriesController.renderCategories()
      })
    }

    static addListenerToEdit(){

    }

    // static addListenderToThoughtView(){
    //   $('body').on('click', 'js-thought-view', function(event){
    //     let thought = Thought.find(parseInt(event.target.id))
    //     thought.addView()
    //   })
    // }




    static createFromForm(){
      let selectCategories = [...$('#category-selector option:selected')]
      selectCategories = selectCategories.map((thing) => {
        return thing.value
      })
      selectCategories.shift()
      let title = $('#title').val()
      let content = $('#content').val()
      if((title == "") || (content == "")) {
        alert("All fields are required")
        return null
      }
      let user = User.findByUserName($('#username').val())
      let user_id;
      if (typeof user === 'undefined'){
        user_id = 1
      } else {
        user_id = user.id
      }
      $('.form-here').empty()
      ThoughtsAdapter.create(title, content, user_id, selectCategories)
      .then(this.renderNewThought)
    }

    static renderNewThought(thoughtData){
      let newThought = Thought.createFromApi(thoughtData)
      render(newThought.thoughtsHTML(), ".thought-here")

      CommentsController.addListenerToCommentForm()
      ThoughtsController.addListenerToLike()
      ThoughtsController.addListenerToDelete()
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
