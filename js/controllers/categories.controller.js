class CategoriesController {

    static renderCategories(){
      clearPage()
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
      render(start, '.categories-here').hide().fadeIn()
      CategoriesController.addListenerForForm()
    }

    static addListenerForCategory(selector, eventType){
      $(selector).on(eventType, function(){
        CategoriesController.renderCategories()
        CategoriesController.addListenerForForm()
      })
    }

    static addListenerForForm() {
      $('#render-category-form').on('click', function(){
        CategoriesController.renderForm()
      })
    }

    static addListenertoRenderCategory(){
      $('body').on('click', '.js-single-category', event => {
        let categoryID = $(event.target).parents('a')[0].id.split('-')[1]
        let category = Category.find(parseInt(categoryID))
        // debugger
        clearPage()
        render(category.singleCategoryTemplate(), '.categories-here')
        // call method that makes ajax request to get all thoughts of this category and return it then render the return value
        let thoughts = CategoriesAdapter.categoriesThoughts(category)
        // debugger
        console.log(thoughts)
        // render onto this category thoughts space


      })
    }

    static renderForm() {
      render(Category.formTemplate(), $('.form-here')).hide().slideDown('medium')
      CategoriesController.addListenerForSubmit()
    }

    static addListenerForSubmit() {
      $('.create-category').submit(() => {
        event.preventDefault()
        this.createFromForm()
      })
    }

    static createFromForm() {
      let name = $('input#name').val()
      let image_url = $('input#image-url').val()
      if((name == "") || (image_url == "")) {
        alert("All fields are required")
        return null
      }
      $('.form-here').empty()
      CategoriesAdapter.create(name, image_url)
      .then(CategoriesController.renderCategories)
    }





  }
