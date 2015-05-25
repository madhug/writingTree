var projectsData = [];

Template.projectsList.helpers({
    projects: function(){
        return Projects.find().fetch();
    },

    createFlow: function(){
        if(Meteor.userId()){
            return Session.get('createProjectForm') ? 'createFormTemplate' : 'createButtonTemplate';
        } else {
            return 'signupPrompt';
        }
    }

});

Template.createButtonTemplate.events({
    'click .createButton': function(event, template){
        Session.set('createProjectForm', true);
    }
});

Template.createFormTemplate.events({
    'click .cancel': function(event, template){
        Session.set('createProjectForm', false);
    },

    'click .save': function(event, template) {
        var data = {};
        data.title = $('.add-form .title').val();
        data.summary = $('.add-form .summary').val();
        var newProject = new Project(data);
        Session.set('createProjectForm', false);
    }
});


Template.typeDisplay.helpers({
    nodesData: function(){
        var project = this.project.fetch();
        var nodes = Nodes.find({project: project[0].code}).fetch();
        var nodeIds = nodes.map(function(n) { return parseInt(n._id) });
        var text = Texts.find({node:{$in: nodeIds}}, {sort: {node: 1}}).fetch();
        return text;
    },
    isNodeSelected: function() {
      if(Session.get("selected_node")== this.node) {
        return "selectedNode";
      }
    },
    doUpdate: function () {
        var self = this;
        return function (e, editor) {
            // Get edited HTML from Froala-Editor
            var newHTML = editor.getHTML();
            // Do something to update the edited value provided by the Froala-Editor plugin, if it has changed:
            if (!_.isEqual(newHTML, self.text)) {
                var nodeText = {
                    _id: self.id,
                    text: newHTML
                }
                self.update(nodeText);
                /*Meteor.call('textUpdate', nodeText, function(error, result){
                    console.log(result);
                })*/
            }
            return false; // Stop Froala Editor from POSTing to the Save URL
        }
    }
});

Template.typeDisplay.events({
    "click .text" : function(event, template){
        var selected_id = $(event.currentTarget).attr("id");
        Session.set("selected_node", selected_id);
    }
});

Template.nodeDisplay.rendered = function() {
    var el = this.find("[id=svgdiv]");
    var map = new StoryMap(el,$(el).width(),$(el).height());
    var project = this.data.project.fetch()[0];
    var _self = this;
    this.autorun(function() {
        var links = Links.find({project: project.code}).fetch();
        var graph = new Graph(links,project);
        var result = graph.getDisplayNodes(undefined,map);
    })
};

Template.nodeDisplay.events({
    'click .node':function(event, template){
        
        var selected_id = $(event.currentTarget).attr("id");
        Session.set("selected_node", selected_id);

        Tracker.autorun(function(){
            /*remove previous selection*/
            d3.selectAll('.selected circle').attr("r",32);
            d3.selectAll('.selected').each(
                function(d){
                    d.fixed = false;
                    d3.select(this)
                    .classed('selected', false);
                }
            );

            /* add new selections */
            var id = Session.get("selected_node");
            //d3.selectAll("circle[cx='100']")
            d3.select(".node[id='"+id+"']")
            .classed("selected", true);
            d3.selectAll('.selected circle')
            .attr("r",40);
        });
    }
});
