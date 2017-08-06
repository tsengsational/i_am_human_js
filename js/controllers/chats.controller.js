class ChatsContoller{

  static placeChat(){
    $('.chat-form-here').empty().append(Chat.ChatForm)
    this.addFormListener()
  }

  static addFormListener(){
    $('.create-chat-form').submit(() => {
      event.preventDefault()
      this.createFromForm()
    })
  };

  static renderChat(chat){
    clearPage()

    $('.chat-here').append(chat.chatHTML())
    $('.messages-form-here').append(Message.messageForm())
    MessagesController.addFormListener()
      //get all messages for chat, make html of them and render to ".chat-messages-here"
    // console.log(chat)
  }

  static createFromForm(){
    let chat_name = $('#chat-name').val()
    ChatsAdapter.create(chat_name)
    .then(this.renderChat)

  }


}
