class TagsAdapter {

  static index() {
    return $.get(`${BASE_URL}/tags`,
    (response) => {
      response.forEach((tag) => {
        TagsAdapter.saveToStore(tag)
      })
    })
  }

  static create(category_id, thought_id) {
    return fetch(`${BASE_URL}/tags`,
      {body: JSON.stringify({tag:
        {category_id: category_id,
        thought_id: thought_id
      }}), method: 'POST', headers:{"Content-Type": "application/json"}})
      .then(response => {return response.json()})
      .then(Tag.createFromApi)
  }

  static show(id) {
    $.get(`${BASE_URL}/tags/${id}`, TagsAdapter.saveToStore)
  }

  static update(tag){
    $.ajax({
      method: 'PATCH',
      url: `${BASE_URL}/tags/${tag.id}`,
      data: {tag: {
              category_id: tag.category_id,
              thought_id: tag.thought_id
            }},
      success: function(response){
        tag.category_id = response.category_id;
        tag.thought_id = response.thought_id;
        console.log(tag)
      },
    })
  };

  static saveToStore(tagData) {
    let possibleTag = Tag.find(tagData.id)
    if(typeof possibleTag === 'undefined') {
      return Tag.createFromApi(tagData)
    }
    return possibleTag
  }

  static destroy(id) {
    Tag.find(id).removeFromStore()
    $.ajax({
      method: 'DELETE',
      url: `${BASE_URL}/tags/${id}`,
      success: (res) => {console.log('Tag deleted')}
    })
  }

}
