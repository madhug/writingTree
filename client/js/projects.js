var projectsData = [];

Template.projectsList.helpers({
  projects: function(){
        return Projects.find().fetch();
    }
});


Template.typeDisplay.helpers({
    nodesData: function(){
        var project = this.project.fetch();
        var nodes = Nodes.find({project: project[0].code}).fetch();
        var nodeIds = nodes.map(function(n) { return parseInt(n._id) });
        var text = Texts.find({node:{$in: nodeIds}}).fetch();
        return text;
    },
    isNodeSelected: function() {
      if(Session.equals("selected_node", this.node)) {
        return "selectedNode";
      }
      // ReactiveVar
    },
    doSave: function () {
        var self = this;
        return function (e, editor) {
            // Get edited HTML from Froala-Editor
            var newHTML = editor.getHTML();
            // Do something to update the edited value provided by the Froala-Editor plugin, if it has changed:
            if (!_.isEqual(newHTML, self.myDoc.myHTMLField)) {
                /*console.log("onSave HTML is :"+newHTML);
                myCollection.update({_id: self.myDoc._id}, {
                    $set: {myHTMLField: newHTML}
                });*/
            }
            return false; // Stop Froala Editor from POSTing to the Save URL
        }
    }
})

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
        d3.select(event.currentTarget)
        .classed("selected", true);
        d3.selectAll('.selected circle')
        .attr("r",40);

        var selected_id = $(event.currentTarget).data("id");
        Session.set("selected_node", selected_id);
    }
});
