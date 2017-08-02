function seedUsers(){

let jeremy = User.findOrCreate("jeremy646")
let eli = User.findOrCreate("elisings")
let jason = User.findOrCreate("sensational")

}

function seedThoughts() {


let jthought = new Thought("jeremy's title", "jeremy's content", jeremy.id)

let ethought = new Thought("eli's title", "eli's content", eli.id)

let sthought = new Thought("jason's title", "jason's content", jason.id)

}

function seedCategories() {


let alcohol = new Category("alcohol", "https://www.discoveryplace.info/sites/default/files/alcoholic1.jpg")


let depression = new Category("depression", "http://affinitymagazine.us/wp-content/uploads/2017/04/1468445687-depression.jpg")

let confidence = new Category("confidence", "http://images.agoramedia.com/EHBlogImages/therese-borchard/2015/07/Breaking-Down-the-Shame-of-Male-Depression-RM-722x406.jpg")

let addiction = new Category("addiction", "https://www.centeronaddiction.org/sites/default/files/inline-addiction-drugs-img%281%29.png")

}

function seedTags() {


new Tag(jthought.id, alcohol.id)

let addiction = new Category("addiction", "https://www.centeronaddiction.org/sites/default/files/inline-addiction-drugs-img%281%29.png")

new Tag(ethought.id, depression.id)
new Tag(sthought.id, confidence.id)

}

// Get all users from the API and sync them with our store.  Wait until we're done before creating seeds.
new Promise(UsersAdapter.index, function(resolve) {
  createSeedData()}, function(reject) {console.log('seeds failed')})
