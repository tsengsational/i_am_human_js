function createChat(){
  return class {
    constructor(name, id){
      this.name = name;
      this.id = id;
      store.chats.push(this)
    }

    static find(id){
      return store.chats.find((chat) => {
        return chat.id === id
      })
    }


    static findByName(name){
      return store.chats.filter((chat) => {
        return chat.name === name
      })
    }

    chatLinkHTML(){
      return `
      <a href="#" class="js-chat-view" id="chat-${this.id}">${this.name}</a>`
    }


    static allChatLiks(){
      ChatsAdapter.index()
      return store.chats.map(chat => {
        return chat.chatLinkHTML()
      }).join("")
    }


    static ChatForm(){
      return `
        <div class="container">
          <form class="create-chat-form">
          <label for="chat[name]">Name This Chat</label>
            <div class="input-field"><input type="text" name="chat[name]"  id="chat-name">
            <input class="btn indigo white-text waves-effect waves-light" type="submit" value="submit">
            </div>
          </form>
        </div>
      `
    }


    chatHTML(){
      return `
      <div class="chat-info" id="chat_id-${this.id}">
      <h2> ${this.name} </h2>
        <div class="container" >
          <div class="chat-messages-here">
          </div>
          <div class="messages-form-here"
          </div>
        </div>
      </div>
      `
    }


    messages(){
      return store.messages.filter( msg => {
        return msg.chat_id === this.id
      })
    }

    static createFromApi(chatData){
      if(chatData.id === null) {
        console.log(thoughtData)
        console.warn('Unable to create chat')
      }
      return new Chat(chatData.name, chatData.id)
    }

    removeFromStore(){
      store.chats = store.chats.filter((chat) => {
        return chat.id !== this.id
      })
    }

  }
} // end of of class

let Chat = createChat()
