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
                project: Projects.find({_code : this.params.code})
            }
            
        }
});

Router.onBeforeAction('dataNotFound', {only: 'projectPage'});