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

    static createFromApi(categoryData) {
      new Category(categoryData.name, categoryData.image_url, categoryData.id)
    }

    template(){
      let thisColor = colors[Math.floor(Math.random() * colors.length)];
      return`<div class="col s12 l4">
      <a href="#" class="card ${thisColor} waves-effect waves-light lighten-2 ${thisColor}-text text-lighten-5" style="border-radius: 75%;">
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

    pluralize(){
      if(this.numThoughts > 1){
        return 'Thoughts'
      }else{
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
