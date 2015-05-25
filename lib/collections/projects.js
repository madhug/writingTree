Projects = new Mongo.Collection('projects', {
    transform: function(doc) {
        return new Project(doc);
    }
});

Projects.allow({
    update: function(userId, doc) {
        // only allow posting if you are logged in
        return !! (doc._userId == userId);
    },
    insert: function (userId, doc) {
        return !! userId;
    },
    remove: function (userId, doc) {
        return !! (doc._userId == userId);
    },
});


/*


title: "name",
summary: "summary",
userid: "userid",
storymap_root_id: "storymap_root_id",
charactermap_root_id: "charactermap_root_id",
miscellaniesmap_root_id: "miscellaniesmap_root_id"

*/


Project = function(doc) {
    _.extend(this, doc);
    this._id = this._id || this.create();
};

Project.prototype = {
    //readonly
    get id() {
        return this._id;
    },

    //readonly
    get userid() {
        return this._userid;
    },

    //readonly
    get storymap_root_id() {
        return this._storymap_root_id;
    },

    //readonly
    get charactermap_root_id() {
        return this._charactermap_root_id;
    },

    //readonly
    get miscellaniesmap_root_id() {
        return this._miscellaniesmap_root_id;
    },

    get title() {
        return this._title;
    },

    set title(value) {
        this._title = value;
    },

    get code() {
        return this._code;
    },

    set code(value) {
        this._code = value;
    },

    get summary() {
        return this._summary;
    },

    set summary(value) {
        this._summary = value;
    },

    create : function() {
        this._title = this._title || 'New project';
        this._summary = this._summary || 'Summary';
        this._code =  this._title.replace(/\s+/g, '');
        //this._storymap_root_id = this._storymap_root_id || new Node();
        //this._charactermap_root_id = this._charactermap_root_id || new Node();
        //this._miscellaniesmap_root_id = this._miscellaniesmap_root_id || new Node();
    
        var that = this;
        var doc = {
                    _title: this._title, 
                    _summary: this._summary, 
                    _code: this._code,
                    //_storymap_root_id: this._storymap_root_id,
                    //_charactermap_root_id: this._charactermap_root_id,
                    //_miscellaniesmap_root_id: this._miscellaniesmap_root_id,
                    _userid: Meteor.userId(),
                    _created: new Date()
                };        
        Projects.insert(doc, function(error, result) {
            that._id = result;
        });
    },

    update : function() {

    },

    delete : function() {

    }

}