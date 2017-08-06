class ChatsAdapter{

  static index(){
    return $.get(`${BASE_URL}/chats`, (response) => {
      response.forEach(chat => {
        // debugger
        ChatsAdapter.saveToStore(chat)
      })
    })
    console.log(store)
  };

  static create(name){
    return fetch(`${BASE_URL}/chats`,
    {body: JSON.stringify({chat: {
      name: name
    }}),
    method: 'POST',
    headers: {"Content-Type":
    "application/json"}})
    .then(response => {return response.json()})
    .then(response => {
      let newChat = Chat.createFromApi(response)
      return newChat
    })
  }

  static destroy(id){
    let chat = Chat.find(id)[0]
    debugger
    chat.removeFromStore()
    $.ajax({
      method: 'DELETE',
      url: `${BASE_URL}/chats/${id}`,
      success: (response) => {alert("Chat deleted"
      )}
    })
  };

  static saveToStore(chatData){
    let possibleChat = Chat.find(chatData.id).id
    if(typeof possibleChat === 'undefined'){
      return Chat.createFromApi(chatData)
    }
    return possibleChat
  };




} // end of class
