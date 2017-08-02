function createThoughts() {

  return class {
    constructor (title, content, user_id, id) {
      this.title = title
      this.content = content
      this.user_id = user_id
      this.likes = 0
      this.views = 0
      this.id = id
      store.thoughts.push(this)
    }

    static find(id){
      return store.thoughts.find((thought) => {
        return thought.id === id
      })
    };

    static formTemplate(){
      return `
        <h3>Create a Thought</h3>
        <form class="create-thought" action="index.html" method="post">
          <input type="text" name="thought[title]" placeholder="title" id="title">
          <input type="text" name="thought[content]" placeholder="content" id="content">
          <input type="text" name="thought[username]" placeholder="username" id="username">
          <input type="submit" value="submit">
        </form>
        `
    }

    static createFromApi(thoughtData){
      return new Thought(thoughtData.title, thoughtData.content, thoughtData.user_id, thoughtData.id)
    }

    removeFromStore() {
      let idx = store.thoughts.indexOf(this)
      store.thoughts.splice(idx, 1)
    }

  };
};

let Thought = createThoughts()
