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

    addLikes(){
      this.likes++
      ThoughtsAdapter.update(this)
    }

    addView(){
      this.views++
      ThoughtsAdapter.update(this)
    }



    static formTemplate(){
      let categories = store.categories
      let catArr = categories.map(function(category){
        return `<option value="${category.id}">${category.name}</option>`
      }).join(' ')
      return `
        <h3>Create a Thought</h3>
        <form class="create-thought" action="index.html" method="post">
          <input type="text" name="thought[title]" placeholder="title" id="title">
          <input type="text" name="thought[content]" placeholder="content" id="content">
          <input type="text" name="thought[username]" placeholder="username" id="username">
          <select class="js-select-categories">
          ${catArr}
          </select>
          <input type="submit" value="submit">
        </form>
        `
    }

    linkHTML(){
      return `<a class="js-thought-view" id="thought-${this.id}">${this.title}</a>`
    }

    thoughtsHTML(){
      return `
      <h3>${this.title}</h3>
      <p>${this.content}</p>
      <button class="btn indigo lighten-3 white-text waves-effect waves-light z-depth-0 hoverable js-like-button" id="${this.id}">Like</button>
      <button class="btn indigo lighten-3 white-text waves-effect waves-light z-depth-0 hoverable js-delete-thought-button" id="${this.id}">Delete</button>
      <button class="btn indigo lighten-3 white-text waves-effect waves-light z-depth-0 hoverable js-edit-thought-button" id="${this.id}">Edit</button>
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
