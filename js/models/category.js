function createCategories () {

  let colors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange']


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
        throw new Error('Unable to create category')
      }
      return new Category(categoryData.name, categoryData.image_url, categoryData.id)
    }

    template(){
      let thisColor = colors[Math.floor(Math.random() * colors.length)];
      return`<div class="col s12 l4">
      <a href="#" class="card ${thisColor} waves-effect waves-light lighten-2 ${thisColor}-text text-lighten-5 js-single-category" style="border-radius: 75%;"  id="category-${this.id}">
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
        <div class="row" style="margin-bottom: 20px;"><div class="card-panel"><h3>Create a Category</h3>
        <form class="create-category" action="index.html" method="post">
          <div class="input-field">
          <label for="category[name]">Name</label>

          <input type="text" name="category[name]"  id="name">
          </div>
          <div class="input-field">
          <label for="category[image_url]">Image URL</label>
          <input type="text" name="category[image_url]" id="image-url"></div>
          <input class="btn indigo white-text waves-effect waves-light" type="submit" value="submit">
        </form></div></div>
        `
    }

    singleCategoryTemplate(){
      return `
      <div class="row">
          <div class="col s12 m6 l6">
            <img src="${this.image_url}" class="responsive-img" style="border-radius: 50%;">
          </div>
          <div class="col s12 m6 l6">
            <h1>${this.name}</h1>
          </div>
      </div>
      <div class="row">
        <div class="thoughts-here">
        </div>
      </div>
      `
    }

    pluralize(){
      if(this.numThoughts > 1){
        return 'Thoughts'
      } else if (this.numThoughts === 0){
        return 'Thoughts'
      } else {
        return 'Thought'
      }
    }



    numThoughts(){
      return store.tags.filter((tag)=>{
        return tag.category_id === this.id
      }).length
    };

  } //end of class

};


let Category = createCategories()
