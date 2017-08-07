function createThoughtsController(){
  return class {
// RENDERS
  static renderThought(thought){
    thought.addView()
    render(thought.thoughtHTML(), ".thought-here").hide().fadeIn()
    if($('.js-thought-crumb').length === 0){
      ApplicationController.renderThoughtBreadcrumb(thought)
    }
    ThoughtsController.addListenerToComment()
    ThoughtsController.addListenerToLike()
    ThoughtsController.addListenerToDelete()
    ThoughtsController.addListenerToEdit()
    CategoriesController.addListenertoCategoryChip()
    CommentsController.renderComments(thought)
    CommentsController.addListenerToCommentForm()
};
  static renderThoughtForm(){
    clearPage()
    render(Thought.formTemplate(), ".form-here").hide().slideDown('medium')
    this.addListenerToSubmit()
    $('select').material_select();
  }

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

    static addListenertoRenderFormforCategory(){
      $('.js-add-thought-btn').on('click', (event)=>{
        let id = $(event.target).parents('.js-add-thought-btn').prev('a')[0].id.split('-')[1]
        this.renderThoughtForm()
      })
    }
    static addListenerToRenderForm(){
      $('body').on('click', '#render-thought-form', () => {
        this.renderThoughtForm()
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

    static addListenerToComment() {
      $('.js-comment-button').on('click', () => {
        console.log('clicked Comment')
        CommentsController.showForm()
      })
      console.log('listening to comment button')
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
