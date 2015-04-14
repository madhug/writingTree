var projectsData = [];

Template.projectsList.helpers({
  projects: function(){
        return Projects.find().fetch();
    }
});


Template.typeDisplay.helpers({
    nodesData: function(){
        return Nodes.find({project: this.projectCode});
    }
})


Template.nodeDisplay.rendered = function() {
    var el = this.find("[id=svgdiv]");
    var graph = new StoryMap(el,$(el).width(),$(el).height());
    
    var nodes = Nodes.find({project: this.data.projectCode});

    var added = function (doc) {
        graph.addNode(doc.name);
      };

    var removed = function (doc) {
        graph.removeNode(doc._id);
      };

    nodes.observe({
      added: added,
      removed: removed
    });

    /*Links.find().observe({
      added: function (doc) {
        graph.addLink(doc._id, doc.source, doc.target, doc.value);
      },
      removed: function (doc) {
        graph.removeLink(doc._id);
      }
    });*/
}