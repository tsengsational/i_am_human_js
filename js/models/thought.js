function createThoughts() {

  return class {
    constructor (title, content, user_id, id) {
      this.title = title
      this.content = content
      this.user_id = user_id
      this.likes = 0
      this.views = 0
      this.id = id
      store.thoughts.push(this)
    }

    static find(id){
      return store.thoughts.find((thought) => {
        return thought.id === id
      })
    };

    static findByName(name){

    };

    createThought(){

    };


    destroyThought(){

    };

    editThought(){

    };

    static createFromApi(thoughtData){
      return new Thought(thoughtData.title, thoughtData.content, thoughtData.user_id, thoughtData.id)
    }

  };
};

let Thought = createThoughts()
