/**
 * Creates a graph for a give package name
 */
// var tree = require('./tree/provide/tree-1650620846435.json');
var tree = require('./tree/provideSingleton/tree-1650620627750.json');

module.exports = buildGraph;

function getId(item) {
  return item.name.replace(/^.*\((.*)\)/, '$1') + ' - ' + item.id.slice(0, 8);
}

function buildGraph() {
  var graph = require('ngraph.graph')({uniqueLinkId: false});

  var promise = Promise.resolve();

  graph.beginUpdate();
  
  for(const item of tree) {
    const parentId = getId(item);
    graph.addNode(parentId, {id: item.id});
    item.deps.forEach(function(dep) {
      graph.addLink(parentId, getId(dep));
    })
  }

  graph.endUpdate();

  return {
    graph: graph,
    start: promise
  };
}
