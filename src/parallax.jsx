function parallax() {
  // "in function main. From here on it is a straight run"
  //

  var curComp = app.project.activeItem;
  if (!curComp || !(curComp instanceof CompItem)) {
    alert('please select a comp');
    return;
  }

  if (curComp.selectedLayers.length < 1) {
    alert('Please select at least one layer');
    return;
  }
  app.beginUndoGroup('FSS Parallax');
  var parallax_ctrl_exists = false;
  var parallax_ctrl = null;
  if (curComp.selectedLayers.length < 1) {
    alert("Please select at least one layer");
    return;
  }

  for (var i = 1; i < curComp.layers.length; i++) {
    var layer = curComp.layers[i];
    if (layer.name === "PARALLAX CONTROL") {
      parallax_ctrl_exists = true;
      parallax_ctrl = layer;
    }
  }
  var layers = [];
  for (var k = 0; k < curComp.selectedLayers.length; k++) {
    layers.push(curComp.selectedLayers[k]);
  }
  if (!parallax_ctrl_exists) {
    var ctrl = curComp.layers.addNull();
    ctrl.name = "PARALLAX CONTROL";
  }

  for (var j = 0; j < layers.length; j++) {
    var sel_layer = layers[j];
    var posbuff = sel_layer.transform.position.value;
    var eff = null;

    eff = getEffect(sel_layer, "dist", "ADBE Slider Control");
    if (eff === null) {
      alert("Fatal error please report an issue to @fabiantheblind");
      // var dist_slider = sel_layer("ADBE Effect Parade").addProperty("ADBE Slider Control");
      // dist_slider.name = "dist";
      // dist_slider.property("ADBE Slider Control-0001").setValue(1);
    } else {}
    eff.property("ADBE Slider Control-0001").setValue(parallax_data.inital_dist_multiply);

    sel_layer.transform.position.expression = parallax_data.expr.join("\n");

    // sel_layer.transform.position.setValue(posbuff);
  }

  app.endUndoGroup();
}