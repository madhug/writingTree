var projectsData = [];

Template.projectsList.helpers({
  projects: function(){
        return Projects.find().fetch();
    }
});


Template.typeDisplay.helpers({
    nodesData: function(){
        return this.nodes.fetch();
    },
    isNodeSelected: function() {
      console.log("Session: ",Session.get("selected_node"));
      console.log("this._id: ",this._id);
      if(Session.get("selected_node") == this._id) {
        return "selectedNode"
      }
    }
})


Template.nodeDisplay.rendered = function() {
    var el = this.find("[id=svgdiv]");
    var graph = new StoryMap(el,$(el).width(),$(el).height());
    
    var nodes = this.data.nodes;

    var links = Links.find({project: nodes.fetch()[0].project, maptype: "story"});

    var added = function (doc) {
        graph.addNode(doc._id, doc.name);
      };

    var removed = function (doc) {
        graph.removeNode(doc._id);
      };

    nodes.observe({
      added: added,
      removed: removed
    });

    links.observe({
      added: function (doc) {
        graph.addLink(doc._id, doc.source, doc.target, 2);
      },
      removed: function (doc) {
        graph.removeLink(doc._id);
      }
    });
}

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
        
        /*add new selections*/
        d3.select(event.currentTarget)
        .classed("selected", true)
        d3.selectAll('.selected circle').attr("r",40);

        var selected_id = $(event.currentTarget).data("id");
        Session.set("selected_node", selected_id);
    }
});
