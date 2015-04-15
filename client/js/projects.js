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
    var links = Links.find({project: this.data.projectCode, maptype: "story"});

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