class ApplicationController {
  static onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  };

  static addListenersforBreadcrumbs(){
    this.addListenerForHome()
    this.addListenerForBreadcrumb('category')
    this.addListenerForBreadcrumb('thought')
  }

  // RENDERS
  static renderCategoryBreadcrumb(category){
    $('#home-categories').after(ApplicationController.categoryTemplate(category)).hide().toggle('left')
  }

  static renderThoughtBreadcrumb(thought){
    $('.js-category-crumb').after(ApplicationController.thoughtTemplate(thought)).hide().toggle('left')
  }

  // LISTENERS
  static addListenerForHome(){
    $('body').on('click', '#home-categories', event =>{
      event.preventDefault()
      CategoriesController.renderCategories()
      $(event.target).parent().nextAll().remove()
    })
  };

  static addListenerForBreadcrumb(type){
    $('body').on('click', `.js-${type}-crumb`, event => {
      event.preventDefault()
      let element = $(event.target).parent()
      let id = parseInt(element[0].id.split('-')[2])
      switch (type){
        case 'category':
          let category = Category.find(id)
          CategoriesController.renderSingleCategory(category)
          element.nextAll().remove()
          break;
        case 'thought':
          let thought = Thought.find(id)
          ThoughtsController.renderThought(thought)
          element.nextAll().remove()
          break;
      }
    })
  }

  // TEMPLATES
  static categoryTemplate(category){
    return `
    <li class="js-category-crumb" id="category-crumb-${category.id}">
      <a href="#">${category.name}</a> /
    </li>
    `
  }

  static thoughtTemplate(thought){
    return `
    <li class="js-thought-crumb" id="thought-crumb-${thought.id}">
      <a href="#">${thought.title}</a>
    </li>
    `
  }



}; // END CLASS
