StoryMap = function(el, w, h) {
  this.selectedNode = null;
  var graph = this;

  /*$(el).on('click', 'g.node', function (e) {
    var node = this;
    graph.selectedNode = d3.select(node).data()[0];
    console.log(graph.selectedNode);
    update();
  });*/

  // Add and remove elements on the graph object
  this.addNode = function (id, name) {
    nodes.push({"id":id, "name": name});
    update();
  };

  this.removeNode = function (id) {
    var i = 0;
    var n = findNode(id);
    while (i < links.length) {
      if ((links[i]['source'] == n)||(links[i]['target'] == n))
        {
          links.splice(i,1);
        }
        else i++;
    }
    nodes.splice(findNodeIndex(id),1);
    update();
  };

  this.removeLink = function (id){
    for(var i=0;i<links.length;i++)
    {
      if(links[i].id === id)
        {
          links.splice(i,1);
          break;
        }
    }
    update();
  };

  this.removeallLinks = function(){
    links.splice(0,links.length);
    update();
  };

  this.removeAllNodes = function(){
    nodes.splice(0,links.length);
    update();
  };

  this.addLink = function (id, source, target, value) {
    var sourceNode = findNode(source);
    var targetNode = findNode(target);
    if(sourceNode && targetNode){
      links.push({id: id, "source":sourceNode,"target":targetNode,"value":value});
      update();
    }
  };

  var findNode = function(id) {
    for (var i in nodes) {
      if (nodes[i]["id"] == id) return nodes[i];};
  };

  var findNodeIndex = function(id) {
    for (var i=0;i<nodes.length;i++) {
      if (nodes[i].id==id){
        return i;
      }
    };
  };

  // set up the D3 visualisation in the specified element
  
  var svg = d3.select(el)
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id","svg")
    .attr("pointer-events", "all")
    .attr("viewBox","0 0 "+w+" "+h)
    .attr("perserveAspectRatio","xMinYMid");
  var vis = svg.append('svg:g');

  var force = d3.layout.force();
  var links = force.links();
  var nodes = force.nodes();
  
  vis.append("g").attr("class", "links");
  vis.append("g").attr("class", "nodes");

  var update = function () {
    
    var node = vis.select(".nodes").selectAll("g.node")
    .data(nodes, function(d) { return d.id;});

    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("data-id",function(d) { return d.id;})
      .call(force.drag);

    nodeEnter.append("svg:circle")
      .attr("class","nodeStrokeClass")
      .attr("r",32)
      .on('click', function(d){d.fixed = true});

    nodeEnter.append("svg:text")
      .attr("class","textClass")
      .text( function(d){return d.name;});

    node.exit().remove();

    var link = vis.select(".links").selectAll("g.link")
      .data(links, function(d) {
        return d.id;
      });

    var linkEnter = link.enter().append("g")
        .attr("id",function(d){return d.id;})
        .attr("class","link");
    linkEnter.append("line").attr("stroke", "#ddd")
      .attr("stroke-opacity", 0.8);

    link.exit().remove();


    force.on("tick", function(e) {

      /*if(d3.select(".selected")[0][0]){
        nodes[d3.select(".selected").attr("data-id")].x = w/2;
        nodes[d3.select(".selected").attr("data-id")].y = h/2;
      }*/
      // Push sources up and targets down to form a weak tree.
      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      var k = 10 * e.alpha;
      links.forEach(function(d, i) {
        d.source.y -= k;
        d.target.y += k;
      });

      link.select("line")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

      
    });

      // Restart the force layout.
      force
        .gravity(.15)
        .distance(100)
        .charge(-1200)
        .linkDistance(100)
        .size([w, h])
        .start();
  };

  this.linkCount = 0;

  // Make it all go
  update();
}
