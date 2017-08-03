function seedUsers(){

  return User.findOrCreate("Anonymous")
  .then(()=> {return User.findOrCreate("jeremy646")})
  .then(() => {return User.findOrCreate("elisings")})
  .then(()=> {return User.findOrCreate("tsengsational")})

  // console.log("done")
}

function seedThoughts() {

  let jeremy_id = User.findByUserName("jeremy646").id
  let eli_id = User.findByUserName("elisings").id
  let tseng_id = User.findByUserName("tsengsational").id

  return ThoughtsAdapter.create("jeremy's title", "jeremy's content", jeremy_id)
  .then(() => {return ThoughtsAdapter.create("eli's title", "eli's content", eli_id)})
  .then(() => {return ThoughtsAdapter.create("jason's title", "jason's content", tseng_id)})

}

function seedCategories() {

  return CategoriesAdapter.create("alcohol", "https://www.discoveryplace.info/sites/default/files/alcoholic1.jpg")
  .then(() => {return CategoriesAdapter.create("depression", "http://affinitymagazine.us/wp-content/uploads/2017/04/1468445687-depression.jpg")})
  .then(() => {return CategoriesAdapter.create("confidence", "http://images.agoramedia.com/EHBlogImages/therese-borchard/2015/07/Breaking-Down-the-Shame-of-Male-Depression-RM-722x406.jpg")})
  .then(() => {return CategoriesAdapter.create("addiction", "https://www.centeronaddiction.org/sites/default/files/inline-addiction-drugs-img%281%29.png")})

}


function seedTags() {

  let ct0 = Category.findByName("alcohol").id
  let ct1 = Category.findByName("depression").id
  let ct3 = Category.findByName("addiction").id

  let th0 = Thought.findByTitle("jeremy's title").id
  let th1 = Thought.findByTitle("jason's title").id
  let th2 = Thought.findByTitle("eli's title").id

  return TagsAdapter.create(ct0, th0)
  .then(() => { return TagsAdapter.create(ct1, th1)})
  .then(() => { return TagsAdapter.create(ct3, th2)})

}


UsersAdapter.index()
.then(ThoughtsAdapter.index)
.then(CategoriesAdapter.index)
.then(TagsAdapter.index)
.then(seedUsers)
.then(seedThoughts)
.then(seedCategories)
.then(seedTags)
