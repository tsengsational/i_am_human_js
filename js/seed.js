function seedUsers(){
  // let anonymous = User.findOrCreate("Anonymous")
  // let jeremy = User.findOrCreate("jeremy646")
  // let eli = User.findOrCreate("elisings")
  // let jason = User.findOrCreate("sensational")
  // let princeThatWasPromised = Promise.resolve()
  return User.findOrCreate("Anonymous")
  .then(()=> {return User.findOrCreate("jeremy646")})
  .then(() => {return User.findOrCreate("elisings")})
  .then(()=> {return User.findOrCreate("tsengsational")})

  // console.log("done")
}

function seedThoughts() {

  let jeremy_id = User.findByUserName("jeremy646")
  let eli_id = User.findByUserName("elisings")
  let tseng_id = User.findByUserName("tsengsational")

  return ThoughtsAdapter.create("jeremy's title", "jeremy's content", jeremy_id)
  .then(() => {return ThoughtsAdapter.create("eli's title", "eli's content", eli_id)})
  .then(() => {return ThoughtsAdapter.create("jason's title", "jason's content", tseng_id)})

}

function seedCategories() {


  let alcohol = CategoriesAdapter.create("alcohol", "https://www.discoveryplace.info/sites/default/files/alcoholic1.jpg")

  let depression = CategoriesAdapter.create("depression", "http://affinitymagazine.us/wp-content/uploads/2017/04/1468445687-depression.jpg")

  let confidence = CategoriesAdapter.create("confidence", "http://images.agoramedia.com/EHBlogImages/therese-borchard/2015/07/Breaking-Down-the-Shame-of-Male-Depression-RM-722x406.jpg")

  let addiction = CategoriesAdapter.create("addiction", "https://www.centeronaddiction.org/sites/default/files/inline-addiction-drugs-img%281%29.png")


}

function seedTags() {


  TagsAdapter.create(jthought.id, alcohol.id)
  TagsAdapter.create(ethought.id, depression.id)
  TagsAdapter.create(sthought.id, confidence.id)

}

// Get all users from the API and sync them with our store.  Wait until we're done before creating seeds.
// let promise = new Promise(UsersAdapter.index, function(resolve) {
  // seedUsers()}, function(reject) {console.log('seeds failed')})

// UsersAdapter.seed()
