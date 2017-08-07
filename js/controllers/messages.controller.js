MainChat = null

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
    let chat = Chat.find(chat_id)
    let user_id = User.findByUserName($('#message-username').val()).id
    let content = $('#message-content').val()

    MessagesAdapter.create(chat_id, content, user_id)
    .then(this.updateMessages)
  }


  static updateMessages(chat){
    // console.log(chat[0].messages())
    // MessagesAdapter.index()
    let all_messages = chat.messages()
    let all_messages_html = all_messages.map(msg => {

      return msg.singleMessageHTML()
    }).join("")

    $('.chat-messages-here').empty().append(all_messages_html)
  }

  static RTimeUpdateMessages(){
    // console.log(chat[0].messages())
    // MessagesAdapter.index()
    // debugger
    let all_messages = MainChat.messages()
    // debugger
    let all_messages_html = all_messages.map(msg => {

      return msg.singleMessageHTML()
    }).join("")

    $('.chat-messages-here').empty().append(all_messages_html)
  }


  static realTimeMessageUpdate(){
    // debugger
    MessagesAdapter.index()
    MessagesController.RTimeUpdateMessages()
  }





}


// ChatsContoller.placeChat()
