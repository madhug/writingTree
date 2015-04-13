Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('projects',Meteor.userId()); }
});

Router.route('/', {name: 'projectsList'});

Router.route('/project/:code', {
    name: 'projectPage',
    data: function() { 
            var project = Projects.findOne({code : this.params.code});
            var nodes = Nodes.find({project: project.code}).fetch();
            var value = 
            { 
                project: project,
                nodes: nodes
            }
            return value;
        }
});