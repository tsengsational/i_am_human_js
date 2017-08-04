function createThoughtsController(){
  return class {
// RENDERS
  static renderThought(thought){
    thought.addView()
    render(thought.thoughtHTML(), ".thought-here").hide().fadeIn()
    ThoughtsController.addListenerToLike()
    CategoriesController.addListenertoCategoryChip()
    CommentsController.renderComments(thought)
    CommentsController.addListenerToCommentForm()
    ThoughtsController.addListenerToDelete()
};

  static locallyUpdateLikes(thought) {
    // Increment the likes view but don't wait for the API request to come back
    $('.likes-here').text(`Likes: ${thought.likes}`)
  }

// LISTENERS
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
        ThoughtsController.renderThought(thought)
      })
    }

    static addListenerToLike(){
      $('.js-like-button').one('click', () => {
        console.log('clicked like')
        let thought = Thought.find(parseInt($('.js-like-button')[0].id))
        thought.addLike()
      })
      console.log('listening to like')
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
      .then(this.renderThought)
    }


    static usersthoughtHTML(allUsersThoughts){
          let html = ""
          allUsersThoughts.forEach((thought) => {
          html += ThoughtsController.thoughtHTML(thought)
          })
          $('.form-here').empty()
        render(html, ".thoughts-here")
    };



  }
}

let ThoughtsController = createThoughtsController()
