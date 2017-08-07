function createCategories () {


  return class {

    constructor (name, image_url, id) {
    this.name = name
    this.image_url = image_url
    this.id = id
    store.categories.push(this)
    }


    static find(id) {
      return store.categories.find((category) => {
        return category.id === id
      })
    }

    static findByName(name) {
      return store.categories.find((category) => {
        return category.name == name
      })
    }

    static createFromApi(categoryData) {
      if(categoryData.id == null) {
        console.log(categoryData)
        return null
      }
      return new Category(categoryData.name, categoryData.image_url, categoryData.id)
    }

    thoughts() {

      let result = []
      let tags = store.tags.filter(tag => {return tag.category_id === this.id})
      let thoughtsLinks = tags.forEach(function(tag) {
        let thoughtID = parseInt(tag.thought_id)
        let thought = Thought.find(thoughtID)
        if(typeof thought != 'undefined') {
          result.push(thought)
          }
        })

      return result
    }



    template(){
      let thisColor = colors[Math.floor(Math.random() * colors.length)];
      return`<div class="col s12 l4">
      <a href="#" class="card ${thisColor} waves-effect waves-light lighten-2 ${thisColor}-text text-lighten-5 js-single-category" style="border-radius: 50%;"  id="category-${this.id}">
      <div class="card-image">
      <img src="${this.image_url}" alt="">
      </div>
      <div class="card-content">
      <div class="card-title flow-text" style="text-align: center;"><h2>${this.name.toUpperCase()}</h2></div>
      <div class="" style="text-align: center;">${this.numThoughts()} ${this.pluralize()}</div>
      </div>
      </a>
      </div>`
    };



    static formTemplate() {
      return `
        <div class="container"><div class="row" style="margin-bottom: 20px;"><div class="card-panel"><h3>Create a Category</h3>
        <form class="create-category" action="index.html" method="post">
          <div class="input-field">
          <label for="category[name]">Name</label>

          <input type="text" name="category[name]"  id="name">
          </div>
          <div class="input-field">
          <label for="category[image_url]">Image URL</label>
          <input type="text" name="category[image_url]" id="image-url"></div>
          <input class="btn indigo white-text waves-effect waves-light" type="submit" value="submit">
        </form></div></div></div>
        `
    }

    singleCategoryTemplate(){
      let thisColor = colors[Math.floor(Math.random() * colors.length)];
      return `
      <div class="row">
          <div class="col s12 m4 l4">
            <a href="#" class="card ${thisColor} waves-effect waves-light lighten-2 ${thisColor}-text text-lighten-5 js-single-category" style="border-radius: 75%;"  id="category-${this.id}">
            <div class="card-image">
            <img src="${this.image_url}" alt="">
            </div>
            <div class="card-content">
            <div class="card-title flow-text" style="text-align: center;"><h2>${this.name.toUpperCase()}</h2></div>
            <div class="" style="text-align: center;">${this.numThoughts()} ${this.pluralize()}</div>
            </div>
            </a>
            <div class="fixed-action-btn js-add-thought-btn" style="position:relative; float:right; bottom:100px; right:10px">
              <a class="btn-floating btn-large ${thisColor} darken-1">
                <i class="large material-icons">add</i>
              </a>
            </div>
          </div>
          <div class="col s12 m8 l8">
            <h1>Thoughts</h1>
            <div class="thoughts-here"></div>
          </div>
      </div>
      `
    }

    chipHTML(){
      return `
      <div class="chip js-category-chip" id="category-${this.id}">
        <a href="#"><img src="${this.image_url}" class="responsive-img">
        ${this.name.toUpperCase()}</a>
      </div>
      `
    }

    pluralize(){
      if(this.numThoughts() > 1){
        return 'Thoughts'
      } else if (this.numThoughts() === 0){
        return 'Thoughts'
      } else {
        return 'Thought'
      }
    }



    numThoughts(){
      return this.thoughts().length
    };

  } //end of class

};


let Category = createCategories()
