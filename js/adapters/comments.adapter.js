class CommentsAdapter {

  static index() {
    return $.get(`${BASE_URL}/comments`,
    (response) => {
      response.forEach((comment) => {
        CommentsAdapter.saveToStore(comment)
      })
    })
  }

  static create(content, thought_id, user_id) {
    let html;
    return fetch(`${BASE_URL}/comments`,
      {body: JSON.stringify({comment:
        {content: content,
        thought_id: thought_id,
        user_id: user_id
      }}), method: 'POST', headers:{"Content-Type": "application/json"}})
      .then(response => {return response.json()})
      .then(response => {let comment = Comment.createFromApi(response); return comment})
      .then(comment => {
        let thought = Thought.find(comment.thought_id)
         html = thought.comments().map(comment => {
          return comment.commentHTML()
        })
        // debugger
        $('.comments-here').empty()
        $('.comments-here').append(html)
        // render(html, ".comments-here")
      });
  }

  static show(id) {
    $.get(`${BASE_URL}/comments/${id}`, UsersAdapter.saveToStore)
  }

  static update(comment){
    $.ajax({
      method: 'PATCH',
      url: `${BASE_URL}/comments/${comment.id}`,
      data: {comment: {
              content: comment.content,
              thought_id: comment.thought_id,
              user_id: comment.user_id
            }},
      success: function(response){
        comment.content = response.content;
        comment.thought_id = response.thought_id;
        comment.user_id = response.user_id;
        console.log(comment)
      },
    })
  };

  static saveToStore(commentData) {
    let possibleComment = Comment.find(commentData.id)
    if(typeof possibleComment === 'undefined') {
      return Comment.createFromApi(commentData)
    }
    return possibleComment
  }

  static destroy(id) {
    Comment.find(id).removeFromStore()
    $.ajax({
      method: 'DELETE',
      url: `${BASE_URL}/comments/${id}`,
      success: (res) => {console.log('Comment deleted')}
    })
  }

}
