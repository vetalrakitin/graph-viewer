module.exports = getAllNames;

function getAllNames(graph) {
  var histogram = {};
  var names = [];

  graph.forEachNode(countNode);

  return names.sort(byCount);

  function countNode(node) {
    var [name, id] = node.id.split(' - ');

    var record = histogram[name];

    if (!record) {
      record = histogram[name] = Object.create(null);
      record.name = name;
      record.count = 0;
      record.packages = [];
      names.push(record);
    }
    record.count += 1;
  }

  function byCount(x, y) {
    return y.count - x.count;
  }
}
