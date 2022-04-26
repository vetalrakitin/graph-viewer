/**
 * Creates a graph for a give package name
 */

module.exports = buildGraph;

function getId(item) {
  return getName(item) + ' - ' + item.id.slice(0, 8);
}

function getName(item) {
  return item.name.replace(/^.*\((.*)\)/, '$1');
}

function buildGraph(pkgName, version, http) {
  var graph = require('ngraph.graph')({uniqueLinkId: false});
  
  var promise = http
    .get('http://0.0.0.0:8080/' + pkgName)
    .then((response) => {
      const tree = response.data;
      // console.log(tree)  
      graph.beginUpdate();
    
      for(const item of tree) {
        const parentId = getId(item);
        const name =  getName(item);
        graph.addNode(parentId, {id: item.id, name});
        item.depends.forEach(function(dep) {
          graph.addLink(parentId, getId(dep), {id: dep.id, name: getName(dep)});
        })
      }
    
      graph.endUpdate();
    })

  return {
    graph: graph,
    start: promise
  };
}
