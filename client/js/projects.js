var projectsData = [];

Template.projectsList.helpers({
  projects: function(){
        return Projects.find().fetch();
    }
});
