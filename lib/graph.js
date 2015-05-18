Graph = function(links, project){
    /*
    
    1) get nodes to display for the map - 7 generations with the selected node in the center - array in the session variable
    2) get text from the nodes to display in the type view - root to selected node and links for the selected node - should just be 
       an array in the session variable which will then be displayed responsively
    3) add node
    4) connect 2 nodes
    5) delete nodes
    6) delete links
    7) update node - name, summary, text
    8) relink nodes

    */

    this.getDisplayNodes = function(selected, map){
        if(!selected) selected = project.storyMap;

        /* get ancestors */
        var ancestors = _getAncestors(selected, 3);

        /* get children */
        var descendants = _getDescendants(selected, 3);


        /* get subplots 
        var subplots = _.filter(links, function(l){if(l.source == selected && l.type == 'subplot') return l;}); */


        var allLinks = _.union(ancestors,descendants);
        allLinks = _.compact(allLinks);
        var linkIds = _.pluck(allLinks, '_id');

        /* link cursors */
        links = Links.find({_id: {$in: linkIds}});

        var nodeIds = _.union(_.pluck(allLinks, 'source'), _.pluck(allLinks, 'target'));
        nodeIds = _.uniq(nodeIds);
        nodeIds = _.map(nodeIds, function(n){return n.toString();});
        
        /* node cursors */
        nodes = Nodes.find({_id: {$in: nodeIds}});


        /* actual graph drawing */
        nodes.observe({
          added: function (doc) {
            map.addNode(doc._id, doc.name);
          },
          removed: function (doc) {
            map.removeNode(doc._id);
          }
        });

        links.observe({
          added: function (doc) {
            map.addLink(doc._id, doc.source, doc.target, 2);
          },
          removed: function (doc) {
            map.removeLink(doc._id);
          }
        });

        return {links: allLinks, nodes: nodes};
    }

    this.getDisplayText = function(){}    


    var _getDescendants= function(node, level){
        
        if(level == 0) return;

        var childrenLinks = _.filter(links,function(l){if(l.source == node && l.type == 'children') return l});
        var childNodes = _.pluck(childrenLinks, 'target');
        var descendants = [];
        if(childNodes.length > 0){
            var childrenLevels = _.map(childNodes, function(c){var r = _getDescendants(c,level-1); if(r) return r;});
            descendants = _.union(descendants, childrenLevels);
            var result =  _.union(childrenLinks, descendants);
            result = _.flatten(result);
            result = _.compact(result);
            return result;
        } 
        else return;
    };

    var _getAncestors = function(node, level){

        if(level == 0) return [];

        var parentLinks = _.filter(links,function(l){if(l.target == node && l.type == 'children') return l});
        var parentNodes = _.pluck(parentLinks, 'source');
        var ancestors = [];
        if(parentNodes.length > 0){
            var parentLevels = _.union(ancestors, _.map(parentNodes, function(p){return _getAncestors(p,level-1)}) );
            ancestors =  _.union(ancestors, parentLevels);
            var result =  _.union(childrenLinks, descendants);
            result = _.flatten(result);
            result = _.compact(result);
            return result;
        }
        else return [];
    };

}