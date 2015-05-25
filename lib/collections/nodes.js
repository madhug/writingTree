Nodes = new Mongo.Collection('nodes', {
    transform: function(doc){
        return new Node(doc);
    }
});

Nodes.allow({
    update: function(userId, doc) {
        // only allow posting if you are logged in
        return !! userId;
    },
    insert: function (userId, document) {
        return !! userId;
    },
    remove: function (userId, doc) {
        return !! userId;
    },
});

/**
{ _id : "1", project : "bastardFrog", type : "story", name : "Assassin", summary : "Intro to the Assassin" }
**/

Node = function(doc) {
    _.extend(this,doc);
    if(!this._node) {
        //create node
    }
    if(!this._id) {
        //create
    }
}


Node.prototype = {
    get id() {
        //readonly
        return this._id;
    },

    get project() {
        return this._project;
    },

    get type() {
        return this._type;
    },

    get name() {
        return this._name;
    },

    set name(value) {
        this._name = value;
    },

    get summary() {
        return this._summary;
    },

    set summary(value) {
        this._summary = value;
    },


    create: function() {

    },

    update: function(textAttributes) {
        check(Meteor.userId(), String);
        check(textAttributes, {
          _id: String,
          summary: String,
          name: String
        });
        var user = Meteor.user();
        var updateNode = 
        {
          _name: textAttributes.name,
          _summary: textAttributes.summary,
          _userId: user._id, 
          _author: user.username, 
          _updated: new Date()
        };
        return Nodes.update({_id: textAttributes._id}, {$set: updateText}, {upsert:false});
    },

    delete: function() {

    }
}
