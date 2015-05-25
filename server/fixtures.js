/*db.projects.insert([
{ "title" : "Madhu the Assassin", "summary" : "Story of Madhu the assassin", "code" : "madhuAssassin", "userid" : "YEc73xeYCAsSwBXN8" },
{ "title" : "Parallel Universe", "summary" : "Someone is stuck in a parallel universe", "code" : "parallelUniverse", "userid" : "YEc73xeYCAsSwBXN8" },
{ "title" : "The Bastard Frog", "summary" : "The Story of the Bastard Frog", "code" : "bastardFrog", "userid" : "YEc73xeYCAsSwBXN8" },
{ "title" : "The Cambrian Era", "summary" : "The Story of the Cambrian Era", "code" : "cambrianEra", "userid" : "YEc73xeYCAsSwBXN8" },
])*/



/*  if (Nodes.find().count() === 0){
    Nodes.insert({ _id : "1", project : "bastardFrog", type : "story", name : "Assassin", summary : "Intro to the Assassin" });
    Nodes.insert({ _id : "2", project : "bastardFrog", type : "story", name : "Dark Forest", summary : "The assassin walks into the Dark forest"});
    Nodes.insert({ _id : "3", project : "bastardFrog", type : "story", name : "Great City" , summary : "The assassin comes to the Great City"});
}

if (Links.find().count() === 0){
    Links.insert({source: "1", target: "2", type: 'children', project: "bastardFrog", maptype: "story"});
    Links.insert({source: "1", target: "3", type: 'children', project: "bastardFrog", maptype: "story"});
}

if (Texts.find().count() === 0){
    Texts.insert({node: "1", text : "Once upon a time, in a land far far away, there lived an assassin of much repute. She was known to have brought down a man of the size of a mountain with merely a toothpick. No one knew her real name or where she was from. But if there was a famous death in the land, everyone knew it was her. "});
    Texts.insert({node: "2", text : "One day, when a child was playing in the field near the Dark forest, he thought he saw a small woman dressed in all black, enter the forest. His mother forbade him from telling this to anyone. " });
    Texts.insert({node: "3", text : "On the night of the full moon, the citizens of the Great City were transfixed by the assassin visiting their city; not in stealth but in full view of everyone in the city" });
}
/**

db.nodes.insert({ _id : "4", project : "bastardFrog", type : "story", name : "Meeting Crow" , summary : "The assassin meets the Crow in the Dark Forest"});
db.links.insert({source: "3", target: "4", type: 'children', project: "bastardFrog", maptype: "story"})
**/

Meteor.startup(function() {
   if (Meteor.users.find().count() == 0) {
       var users = [
           {name:"Normal User",email:"normal@tutorials.com",roles:[], password: "normal3210"},
           {name:"Admin User",email:"admin@tutorials.com",roles:['admin'], password: "admin3210"}
       ];
 
       _.each(users, function (user) {
           var id = Accounts.createUser({
               email: user.email,
               password: user.password,
               profile: { name: user.name }
           });
       });
   };
});