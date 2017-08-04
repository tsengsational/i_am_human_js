class ApplicationController {
  static onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
}
