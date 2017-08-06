class CategoriesController {

// RENDERS
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

    static renderForm() {
      render(Category.formTemplate(), $('.form-here')).hide().slideDown('medium')
      CategoriesController.addListenerForSubmit()
    }

    static renderSingleCategory(category){
      clearPage()
      render(category.singleCategoryTemplate(), '.categories-here').hide().fadeIn()
      if($('.js-category-crumb').length === 0){
        ApplicationController.renderCategoryBreadcrumb(category)
      } else {
        $('.js-category-crumb').nextAll().remove()
      }
      let tags = store.tags.filter(tag => {return tag.category_id === category.id})
      let thoughtsLinks = tags.map(tag => {
        let thoughtID = parseInt(tag.thought_id)
        let thought = Thought.find(thoughtID)
        return thought.linkHTML()
      }).join('')
      // render onto this category thoughts space
      render(thoughtsLinks, ".thoughts-here").hide().fadeIn()
      ThoughtsController.addListenertoThoughtLink()
    }

// LISTENERS
    static addListenertoCategoryChip(){
      $('.js-category-chip').on('click', function(event){
        event.preventDefault()
        let id = parseInt(this.id.split('-')[1])
        let category = Category.find(id)
        CategoriesController.renderSingleCategory(category)
      })
      console.log("listening to Category Chips")
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
        clearPage()
        CategoriesController.renderSingleCategory(category)
        // let thoughts = CategoriesAdapter.categoriesThoughts(category)

      })
    };

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
