class UsersController {

  static renderForm() {
    let html = `
    <form class="user-form" action="#" method="post">
      <label for="username">Enter a username:  </label>
      <input type="text" name="username" id="username" value="" placeholder="username">
      <input type="submit" value="Log In">
    </form>`
    render(html, 'body')
    this.addListener()
  }

  static addListener() {
    $('.user-form').on('submit', (event) => {
      event.preventDefault()
      this.createFromForm()
    })
  }

  static createFromForm() {
    let desiredUserName = $('#username').val()
    $('#username').val("")
    User.findOrCreate(desiredUserName)
    // Once we have a Session controller, need to log them in!
    
    $('.user-form').empty()
  }

}
