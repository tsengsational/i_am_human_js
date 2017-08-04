const BASE_URL = `http://localhost:3000`

class ApplicationAdapter {

  static handleError(response) {
    console.log(response)
    console.warn(`Error (${response.code})`)
    return response
  }
}
