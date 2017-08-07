function createThoughts() {

  return class {
    constructor (title, content, user_id, id, likes, views) {
      this.title = title
      this.content = content
      this.user_id = user_id
      this.likes = likes
      this.views = views
      this.id = id
      store.thoughts.push(this)
    };

    static find(id){
      return store.thoughts.find((thought) => {
        return thought.id === id
      })
    };

    static findByTitle(title) {
      return store.thoughts.find((thought) => {
        return thought.title == title
      })
    };

    addLike(){
      this.likes++
      ThoughtsController.locallyUpdateLikes(this)
      ThoughtsAdapter.update(this) // Update the database.  No need to wait until done here; user can't click Like multiple times in a row.
    };

    addView(){
      this.views++
      ThoughtsAdapter.update(this)
    };

    static formTemplate(){
      let categories = store.categories
      let start = `<option defaultSelected:false disabled selected>Choose your categories</option>`
      let catArr = categories.map(function(category){
        return`<option value="${category.id}">${category.name}</option>`
      }).join(' ')
      start += catArr
      return `
        <div class="container">
          <div class="row" style="margin-bottom: 20px;">
            <div class="card-panel"><h3>Create a Thought</h3>
              <form class="create-thought" action="index.html" method="post">
                <div class="input-field"><input type="text" name="thought[title]"  id="title">
                  <label for="thought[title]">Title</label>
                </div>
                <div class="input-field"><input type="text" name="thought[content]" id="content">
                  <label for="thought[content]">Content</label>
                </div>
                <div class="input-field"><input type="text" value="Anonymous" name="thought[username]" id="username">
                </div>
                <div class="input-field">
                  <select multiple class="js-select-categories" id="category-selector">
                    ${start}
                  </select>
                </div>
                <input class="btn indigo white-text waves-effect waves-light" type="submit" value="submit">
              </form>
            </div>
          </div>
        </div>
        `
    };

    linkHTML(){
      let thisColor = colors[Math.floor(Math.random() * colors.length)];
      return `<div class="col s12 m6"><a href="#" class="card-panel waves-effect waves-light ${thisColor} white-text darken-1 js-thought-view" id="thought-${this.id}" style="border-radius: 50%; height: 15em; width: 15em; padding: .5em;"><div class="center-align card-content js-thought-view" id="thoughtlink-${this.id}" style="
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 50%;
        height: 30%;
        margin: auto;" id="thought-${this.id}">${this.title.toUpperCase()}</div></a></div>`
    };

    thoughtHTML(){
      let thisColor = colors[Math.floor(Math.random() * colors.length)];
      let categoryChips = this.categories().map(category => {return category.chipHTML()})
      let uniq = categoryChips.filter(ApplicationController.onlyUnique).join(' ')
      let username = User.find(this.user_id).username
      return `
      <div class="container">
        <div class="card">
          <div class="card-content">
            <span class="card-title black-text">${this.title}</span>   by   <span class="grey-text">${username}</span>
            <div class="row"> </div>
            <div class="views-likes grey-text">
                <span class="views-here">Views: ${this.views}</span>  |  <span class="likes-here">Likes: ${this.likes}</span>
            </div>
              <p class="thought-content" id="thought-content">${this.content}</p>

            <div class="get-thought-id" id="thoughtID-${this.id}"> </div>
            <div class="fixed-action-btn horizontal" style="position:relative; float:right; bottom:35px; right:10px">
              <a class="btn-floating btn-large ${thisColor}">
                <i class="large material-icons">more_horiz</i>
              </a>
              <ul>
                <li><a class="btn-floating blue js-like-button" id="${this.id}"><i class="material-icons">thumb_up</i></a></li>
                <li><a class="btn-floating red darken-1 js-delete-thought-button" id="${this.id}"><i class="material-icons">delete</i></a></li>
                <li><a class="btn-floating green js-edit-thought-button" id="${this.id}"><i class="material-icons">mode_edit</i></a></li>
                <li><a class="btn-floating yellow js-comment-button"><i class="material-icons">mode_comment</i></a></li>
              </ul>
            </div>
            <div class="row">
            <div class="">${uniq}</div>
            </div>
          </div>
        </div>
        <br>  ` + Comment.formTemplate()
    };

    comments(){
      return store.comments.filter((comment) => {
        return comment.thought_id === this.id
      })
    };

    static createFromApi(thoughtData){
      if(thoughtData.id == null) {
        console.log(thoughtData)
        console.warn('Unable to create thought')
      }
      return new Thought(thoughtData.title, thoughtData.content, thoughtData.user_id, thoughtData.id, thoughtData.likes, thoughtData.views)
    }

    removeFromStore() {
      let idx = store.thoughts.indexOf(this)
      store.thoughts.splice(idx, 1)
    };

    categories(){
      let categoriesTags = store.tags.filter(tag => {return tag.thought_id === this.id})
      return categoriesTags.map(tag =>{return Category.find(parseInt(tag.category_id))})
    };

  };
};

let Thought = createThoughts()
