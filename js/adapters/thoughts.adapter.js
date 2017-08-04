class ThoughtsAdapter {
  static index(){
    return $.get(`${BASE_URL}/thoughts`, (response) => {
      response.forEach(thought => {
        ThoughtsAdapter.saveToStore(thought)
      })
    })
    console.log(store)
  };

  static create(title, content, user_id, selectCategories) {

    let categoryArray = selectCategories.map(category => {
      return {category_id: parseInt(category)}
    })
    return fetch(`${BASE_URL}/thoughts`,
      {body: JSON.stringify({thought: {
        title: title,
        content: content,
        user_id: user_id,
        tags: categoryArray,
        likes: 0,
        views: 0
        }}),
        method: 'POST',
        headers:{"Content-Type": "application/json"}})
        .then(response => {return response.json()})
        .then(response => {
          if(response.status === "error") {
            ApplicationAdapter.handleError(response)
            return null
          }
          let newThought = Thought.createFromApi(response.thought)
          response.tags.forEach(tag => {
            Tag.createFromApi(tag)
          })
          return newThought
        })

        // .then(response => {return response.json()})
        // .then(response => {let newThought = Thought.createFromApi(response);
        // return newThought})
        // .then(newThought => {TagsAdapter.createTags(newThought, selectCategories)})


    // $.post(`${BASE_URL}/thoughts`,
    //   {thought: {
    //     title: title,
    //     content: content,
    //     user_id: user_id
    //   }},
      // ThoughtsController.renderNewThought)
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
              user_id: thought.user_id,
              likes: thought.likes,
              views: thought.views
            }},
      success: function(response){
        thought.title = response.title;
        thought.content = response.content;
        thought.user_id = response.user_id;
        thought.likes = response.likes;
        thought.views = response.views;
        console.log(thought)
      },
    })
  };

  static destroy(id) {
    Thought.find(id).removeFromStore()
    $.ajax({
      method: 'DELETE',
      url: `${BASE_URL}/thoughts/${id}`,
      success: (res) => {console.log('Thought deleted')}
    })
  }

  static saveToStore(thoughtData){
    let possibleThought = Thought.find(thoughtData.id)
    if(typeof possibleThought === 'undefined'){
      return Thought.createFromApi(thoughtData)
    }
    return possibleThought
  };

}
