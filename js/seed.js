function createSeedData(){

let jeremy = new User("jeremy646")
let eli = new User("elisings")
let jason = new User("sensational")


let jthought = new Thought("jeremy's title", "jeremy's content", jeremy.id)

let ethought = new Thought("eli's title", "eli's content", eli.id)

let sthought = new Thought("jason's title", "jason's content", jason.id)

let alchohol = new Category("alchohol", "https://www.discoveryplace.info/sites/default/files/alcoholic1.jpg")

let depression = new Category("depression", "http://affinitymagazine.us/wp-content/uploads/2017/04/1468445687-depression.jpg")

let confidence = new Category("confidence", "http://images.agoramedia.com/EHBlogImages/therese-borchard/2015/07/Breaking-Down-the-Shame-of-Male-Depression-RM-722x406.jpg")

let addiction = new Category("addiction", "https://www.centeronaddiction.org/sites/default/files/inline-addiction-drugs-img%281%29.png")

new Tag(jthought.id, alchohol.id)
new Tag(ethought.id, depression.id)
new Tag(sthought.id, confidence.id)

}

createSeedData()
