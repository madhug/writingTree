Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('projects',Meteor.userId()); }
});

Router.route('/', {name: 'projectsList'});

Router.route('/project/:code', {
    name: 'projectPage',
    data: function() { 
            return {
                project: Projects.findOne({code : this.params.code}), 
                nodes: Nodes.find({project: this.params.code}, {transform: function (doc) {
                       doc.selected = false;
                       return doc;
                    }})
            }
            
        }
});

Router.onBeforeAction('dataNotFound', {only: 'projectPage'});