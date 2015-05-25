Texts = new Mongo.Collection('texts', {
    transform: function(doc) {
        return new Text(doc);
    }
});

Texts.allow({
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

/*

node: nodeid
text: ""

*/

Text = function(doc) {
    _.extend(this,doc);
    this._id = this._id || this.create();
}


Text.prototype = {
    get id() {
        //readonly
        return this._id;
    },

    get node() {
        return this._node;
    },

    set node(value) {
        this._node = value;
    },

    get text() {
        return this._text;
    },

    set text(value) {
        this._text = value;
    },

    create: function() {
        this._node = this._node || new Node();
        //this._node = 
    },

    update: function(textAttributes) {
        check(Meteor.userId(), String);
        check(textAttributes, {
          _id: String,
          text: String
        });
        var user = Meteor.user();
        var updateText = 
        {
          text: textAttributes.text,
          userId: user._id, 
          author: user.username, 
          updated: new Date()
        };
        return Texts.update({_id: textAttributes._id}, {$set: updateText}, {upsert:false});
    },

    delete: function() {

    }
}