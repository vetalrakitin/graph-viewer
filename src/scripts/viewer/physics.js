/**
 * Physics engine settings, shared by both renderers
 */
module.exports = function () {
  return {
    springLength : 80,
    springCoeff : 0.0002,
    gravity: -20,
    theta : 0.7,
    dragCoeff : 0.02
  };
};
