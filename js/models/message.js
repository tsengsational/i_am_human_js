function createMessages() {
  return class {
    constructor(id, chat_id, content, user_id) {
      this.id = id;
      this.chat_id = chat_id;
      this.content = content;
      this.user_id = user_id;
      store.messages.push(this)
    };

    static find(id){
      return store.messages.find(msg => {
        return msg.id === id
      });
    };



    static createFromApi(messageData){
      // debugger
      if(messageData.id === null) {
        console.log(messageData)
        console.warn('Unable to create message')
      }
      return new Message(messageData.id , messageData.chat_id, messageData.content, messageData.user_id)
    }

    removeFromStore(){
      store.messages = store.messages.filter((msg) => {
        return msg.id !== this.id
      })
    }


    static messageForm(){
      return `
      <div class="container">
        <form class="message-form">
          <label for="message[content]">Message</label>
          <div class="input-field"><input type="text" name="message[content]"  id="message-content">
          <div class="input-field"><input type="text" name="message[username]"  id="message-username" value="Anonymous">
          <input class="btn indigo white-text waves-effect waves-light" type="submit" value="submit">
          </div>
      </div>
      `
    }


    singleMessageHTML(){
      let username = User.find(this.user_id).username
      return `
      <p> ${username}: ${this.content} </p>
      `
    }


  };
}; // end of class

let Message = createMessages()
