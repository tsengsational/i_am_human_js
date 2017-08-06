class MessagesAdapter{

  static index(){
    return $.get(`${BASE_URL}/messages`, (response) => {
      response.forEach(msg => {
        // debugger
        MessagesAdapter.saveToStore(msg)
      })
    })
    console.log(store)
  };

  static create(chatID, content, user_id){
    let chat = Chat.find(chatID)
    return fetch(`${BASE_URL}/messages`,
      {body: JSON.stringify({message: {
        chat_id: chatID,
        content: content,
        user_id: user_id
      }}),
      method: 'POST',
      headers: {"Content-Type":
      "application/json"}})
      .then(response => {return response.json()})
      .then(response => {
        let newMessage = Message.createFromApi(response)
        return chat
      })
      // return newMessage
  }

  static destroy(id){
    let message = Message.find(id)[0]
    message.removeFromStore()
    $.ajax({
      method: 'DELETE',
      url: `${BASE_URL}/messages/${id}`,
      success: (response) => {alert("Message deleted"
      )}
    })
  };

  static saveToStore(messageData){
    let possibleMSG = Message.find(messageData.id).id
    if(typeof possibleMSG === 'undefined'){
      return Message.createFromApi(messageData)
    }
    return possibleMSG
  };



}
