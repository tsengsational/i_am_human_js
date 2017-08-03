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

    static findByTitle(title) {
      return store.thoughts.find((thought) => {
        return thought.title == title
      })
    }

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
      let start = `<option defaultSelected:false disabled selected>Choose your categories</option>`
      let catArr = categories.map(function(category){
        return`<option value="${category.id}">${category.name}</option>`
      }).join(' ')
      start += catArr
      return `
        <div class="row" style="margin-bottom: 20px;"><div class="card-panel"><h3>Create a Thought</h3>
        <form class="create-thought" action="index.html" method="post">
          <div class="input-field"><input type="text" name="thought[title]"  id="title">
          <label for="thought[title]">Title</label>
          </div>
          <div class="input-field"><input type="text" name="thought[content]" id="content">
          <label for="thought[content]">Content</label></div>
          <div class="input-field"><input type="text" name="thought[username]" id="username">
          <label for="thought[username]">Username</label></div>
          <div class="input-field">
          <select multiple class="js-select-categories" id="category-selector">
          ${start}
          </select>
          </div>
          <input class="btn indigo white-text waves-effect waves-light" type="submit" value="submit">
        </form></div></div>
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
      if(thoughtData.id == null) {
        throw new Error('Unable to create thought')
      }
      return new Thought(thoughtData.title, thoughtData.content, thoughtData.user_id, thoughtData.id)
    }

    removeFromStore() {
      let idx = store.thoughts.indexOf(this)
      store.thoughts.splice(idx, 1)
    }

  };
};

let Thought = createThoughts()
