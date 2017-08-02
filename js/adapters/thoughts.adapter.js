class ThoughtsAdapter {
  static index(){
    $.get(`${BASE_URL}/thoughts`, (response) => {
      response.forEach(thought => {
        ThoughtsAdapter.saveToStore(thought)
      })
    })
  };

  static create(title, content, user_id) {
    $.post(`${BASE_URL}/thoughts`,
      {thought: {
        title: title,
        content: content,
        user_id: user_id
      }},
      ThoughtsController.renderNewThought)
  };

  static show(id) {
    $.get(`${BASE_URL}/thoughts/${id}`, ThoughtsAdapter.saveToStore)
  }

  static update(thought){
    $.ajax({
      method: 'PATCH',
      url: `${BASE_URL}/thoughts/${thought.id}`,
      data: {thought: {
              title: thought.title,
              content: thought.content,
              user_id: thought.user_id
            }},
      success: function(response){
        thought.title = response.title;
        thought.content = response.content;
        thought.user_id = response.user_id;
        console.log(thought)
      },
    })
  };

  static saveToStore(thoughtData){
    let possibleThought = Thought.find(thoughtData.id)
    if(typeof possibleThought === 'undefined'){
      Thought.createFromApi(thoughtData)
    }
  };

}
