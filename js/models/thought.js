function createThoughts() {
  let id = 0

  return class {
    constructor (title, content, user_id) {
      this.title = title
      this.content = content
      this.user_id = user_id
      this.likes = 0
      this.views = 0
      this.id = ++id
      store.thoughts.push(this)
    }

    static find(id){

    };

    static findByName(name){

    };

    createThought(){

    };


    destroyThought(){

    };

    editThought(){

    };


  };  
};

let Thought = createThoughts()
