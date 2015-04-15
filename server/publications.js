Meteor.publish('projects', function(userid){
    return Projects.find({userid: userid});
})

Meteor.publish('nodes', function(){
    return Nodes.find();
})

Meteor.publish('links', function(){
    return Links.find();
})


