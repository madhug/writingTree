Meteor.publish('projects', function(userid){
    return Projects.find({_userid: userid});
})

Meteor.publish('nodes', function(){
    return Nodes.find();
})

Meteor.publish('links', function(){
    return Links.find();
})

Meteor.publish('texts', function(){
    return Texts.find();
})


