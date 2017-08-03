class CategoriesController {

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
      CategoriesController.addListenerForForm()
    }

    static addListenerForCategory(selector, eventType){
      $(selector).on(eventType, function(){
        CategoriesController.renderCategories()
        CategoriesController.addListenerForForm()
      })
    }

    static addListenerForForm() {
      console.log('adding listener')
      $('#render-category-form').on('click', function(){
        CategoriesController.renderForm()
      })
    }

    static renderForm() {
      $('.form-here').empty()
      render(Category.formTemplate(), $('.form-here'))
      CategoriesController.addListenerForSubmit()
    }

    static addListenerForSubmit() {
      $('.create-category').submit(() => {
        event.preventDefault()
        this.createFromForm()
        $('.form-here').empty()

      })
    }

    static createFromForm() {
      let name = $('input#name').val()
      let image_url = $('input#image-url').val()
      $('.form-here').empty()
      CategoriesAdapter.create(name, image_url)
      .then(CategoriesController.renderCategories)
    }





  }
