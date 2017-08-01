function createCategoriesController(){
  return class{
    static renderCategories(){
      let start = '<div class="row">'
      let html = store.categories.map((category)=>{
        return category.template()
      })
      for (let i=0; i<html.length; i++){
        if ( i && (i % 3 === 0)) {
          start += `</div><div class = "row">`
          start += html[i]
        } else {
          start += html[i]
        };
      };
      start += `</div>`
      render(start, '#categories-here')
    }

    static addListenerForCategory(selector, eventType){
      $(selector).on(eventType, function(){
        CategoriesController.renderCategories()
      })
    }

  }
}

let CategoriesController = createCategoriesController()
