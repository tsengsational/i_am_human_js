class ChatsContoller{

  static placeChat(){
    $('#render-chat-form').on('click', () => {
      $('.chat-form-here').empty().append(Chat.ChatForm)
      this.addFormListener()
    })
  }

  static renderChatLinks(){
    $('#render-chats').on('click', () => {
      clearPage()
      $('.chat-here').append(Chat.allChatLiks())
      this.renderChatFromLink()
    })
  }

  static addFormListener(){
    $('.create-chat-form').submit(() => {
      event.preventDefault()
      this.createFromForm()
    })
  };

  static renderChatFromLink(){
    $('.js-chat-view').on('click', () => {
      // debugger
      let chat_id = parseInt(event.target.id.split("-")[1])
      let chat = Chat.find(chat_id)
      ChatsContoller.renderChat(chat)
    })
  }

  static renderChat(chat){
    // debugger
    clearPage()
    $('.chat-here').append(chat.chatHTML())
    $('.messages-form-here').append(Message.messageForm())
    MessagesController.addFormListener()
    // debugger
    MainChat = chat
    ChatsContoller.setInter()

  }

  static setInter(){
    // debugger
    let update = setInterval(MessagesController.realTimeMessageUpdate, 250);
  }

  // static realTimeChatRender(chat){
  //   debugger
  //   let update = setInterval(function () {
  //   }, 1000);
  //
  //   update(MessagesController.updateMessages(chat))
  // }

  static createFromForm(){
    let chat_name = $('#chat-name').val()
    ChatsAdapter.create(chat_name)
    .then(this.renderChat)

  }


}

ChatsContoller.placeChat()
ChatsContoller.renderChatFromLink()
ChatsContoller.renderChatLinks()
