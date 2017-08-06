class MessagesController{

  static addFormListener(){
    $('.message-form').submit(() => {
      event.preventDefault()
      this.createFromForm()
    })
  }

  static createFromForm(){
    let all_messages;
    let chat_id = parseInt($('.chat-info')[0].id.split("-")[1])
    let chat = Chat.find(chat_id)[0]
    let user_id = User.findByUserName($('#message-username').val()).id
    let content = $('#message-content').val()

    MessagesAdapter.create(chat_id, content, user_id)
    .then(this.updateMessages)
  }


  static updateMessages(chat){
    console.log(chat[0].messages())
    let all_messages = chat[0].messages()
    let all_messages_html = all_messages.map(msg => {
    
      return msg.singleMessageHTML()
    }).join("")

    $('.chat-messages-here').empty().append(all_messages_html)
  }





}


// ChatsContoller.placeChat()
