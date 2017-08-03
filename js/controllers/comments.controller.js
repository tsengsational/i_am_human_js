function createCommentsController(){
  return class {


    static addListenerToCommentForm(){
      $('.comment-form').submit(() => {
        event.preventDefault()
        let user_id = User.findByUserName($('#comment-user').val()).id
        let content = $('#comment-content').val()
        let thought_id = parseInt($('.get-thought-id')[0].id.split('-')[1])
        let thought = Thought.find(thought_id)
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

  }

}

let CommentsController = createCommentsController()
