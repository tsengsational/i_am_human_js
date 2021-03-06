function createCommentsController(){
  return class {

    static renderComments(thought){
    let html = Comment.commentsListHeader() + thought.comments().map(comment => {
      return comment.commentHTML()
    }).join('')
    render(html, '.comments-here')
    }

    static addListenerToCommentForm(){
      $('.comment-form').submit(() => {
        event.preventDefault()
        let user_id = User.findByUserName($('#comment-user').val()).id
        let content = $('#comment-content').val()
        let thought_id = parseInt($('.get-thought-id')[0].id.split('-')[1])
        let thought = Thought.find(thought_id)
        // clear comment form
        $('#comment-user').val("Anonymous")
        $('#comment-content').val("")
        CommentsController.hideForm()
        // add comment to database
        CommentsAdapter.create(content, thought_id, user_id)

        // let html = thought.comments().map(comment => {
        //   debugger
        //   return comment.commentHTML()
        // })
        //
        //
        // debugger
        // render(html, ".comments-here")
        // debugger
      })
    }

    static showForm() {
      console.log('showing form')
      $('.create-comments-here').show()
    }

    static hideForm() {
      $('.create-comments-here').hide()
    }


  }

}

let CommentsController = createCommentsController()
