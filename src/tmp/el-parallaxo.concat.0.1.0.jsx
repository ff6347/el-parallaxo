
/*! el-parallaxo.jsx - v0.1.0 - 2014-08-29 */

// This script creates a fake parallax with 2D layers
// it adds an master controller to the composition and
// adds an expression to the position of the selected layers.
// The distance to the parallax controller can be controlled
// via a slider on the layer

// Copyright (c) 2013 - 2014
// Fabian "fabiantheblind" Morón Zirfas
// Permission is hereby granted, free of charge, to any
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to
// whom the Software is furnished to do so, subject to
// the following conditions:
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// see also http://www.opensource.org/licenses/mit-license.php


// inital version
// v0.1.0

// Start settings.jsx
parallax_data = {
  "inital_dist_multiply": 1,
  /**
   * 0 = landscape
   * 1 = everything else
   */
  'mode': 0,
  "expr": [
    "// EL PARALLAXO expression written by fabiantheblind",
    "source_X = thisComp.layer(\"PARALLAX CONTROL\").transform.position[0];",
    "source_Y = thisComp.layer(\"PARALLAX CONTROL\").transform.position[1];",
    "distance = thisLayer.index * effect(\"dist\")(\"ADBE Slider Control-0001\");",
    "target_X = value[0] + source_X;",
    "try {target_X = value[0] + source_X /Math.abs(distance);}catch(e){}",
    // "try {target_X = value[0] + source_X / effect(\"dist\")(\"ADBE Slider Control-0001\");}catch(e){}",
    "target_Y = transform.position[1];",
    "[target_X,target_Y]"
  ]
};

// End settings.jsx
function parseTextToFloat(theText, theErrorMessage, minVal, maxVal, resetVal) {
  var val = Math.abs(parseFloat(theText, 10));
  // if(val > maxVal){
  //     val = maxVal;
  // }
  // if(val < minVal){
  //     val = minVal;
  // }
  val = resetValIfNAN(val, resetVal, theErrorMessage);

  return val;
}

function resetValIfNAN(val, resetVal, theErrorMessage) {
  if (isNaN(val) === true) {
    val = resetVal;
    // alert(theErrorMessage);
  }
  return val;
}

/**
 * This functions looks for an effect by name and matchname and returns it.
 * Thanks to Kevin Schires (the author of Elementary) for helping me with that
 * http://aescripts.com/authors/f-l/kevin-schires/
 *
 * @param  {Layer Object} layer The layer to check
 * @param  {String} name      The name off the effect
 * @param  {String} matchName The matchname of the effects
 * @return {Effect}           returns the effect for later usage
 */

function getEffect(layer, effectName, matchName) {

  var effectGroup = layer.property("ADBE Effect Parade");

  var effect = effectGroup(effectName);

  if (effect && effect.matchName != matchName) {
    effect.name += " *";
    effect = null;
  }

  if (!effect && effectGroup.canAddProperty(matchName)) {
    effect = effectGroup.addProperty(matchName);
    effect.name = effectName;
  }

  return effect;
}
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
 var buildUI = function(thisObj) {
   var H = 25; // the height
   var W = 30; // the width
   var G = 5; // the gutter
   var x = G;
   var y = G;
   var rows = 2;
   var colums = 7;

   var win = (thisObj instanceof Panel) ? thisObj : new Window('palette', 'El Parallaxo', [0, 0, (G * 3) + W * colums, (G * 3) + H * rows], {
     resizeable: true
   });

   if (win !== null) {


     // win.check_box = win.add('checkbox',[x,y,x+W*2,y + H],'check');
     // win.check_box.value = metaObject.setting1;
     win.do_it_button = win.add('button', [x, y, x + W * 5 + (G * 1), y + H], 'Fake Parallax');
     x = G;
     y += H + G;
     win.initial_value_stext = win.add('statictext', [x, y, x + W * 2, y + H], 'factor');
     x += (W * 2) + G;
     win.initial_value_etext = win.add('edittext', [x, y, x + W * 3, y + H], parallax_data.inital_dist_multiply);

     x = G;
     y += H + G;
     win.radiogroup = win.add('group', [x, y, x + W * 5, y + H * 5], '');
     win.radiogroup.button_landscape = win.radiogroup.add("radiobutton", [0, 0, 150, H], 'landscape');
     win.radiogroup.button_everythingelse = win.radiogroup.add("radiobutton", [0, H + G, 150, H * 2 + G], 'everything else');
     win.radiogroup.button_landscape.value = true;

     win.do_it_button.onClick = function() {
       parallax();
     };
     win.initial_value_etext.onChanging = function() {
       // win.slider_value_etext.text = this.value.toFixed(3);
       var buff = parallax_data.inital_dist_multiply;
       parallax_data.inital_dist_multiply = parseFloat(this.text); //parseTextToFloat(this.value, , 1, 100000000,1);
       if (isNaN(parallax_data.inital_dist_multiply)) {
         alert('Sorry this is not a floating point value\nReset to ' + buff);
         this.text = buff;
         parallax_data.inital_dist_multiply = buff;
       }
       // this.text = parallax_data.inital_dist_multiply;

     };

     win.radiogroup.addEventListener("click", function() {
       if (win.radiogroup.button_landscape.value === true) {
         win.initial_value_stext.text = 'factor';
       } else {
         win.initial_value_stext.text = 'distance';
       }
     });



     win.radiogroup.button_landscape.onClick = function() {
       if (this.value === true) {
         parallax_data.mode = 0; // landscape
       }
       alert(parallax_data.mode);
     };
     win.radiogroup.button_everythingelse.onClick = function() {
       if (this.value === true) {
         parallax_data.mode = 1; // everything else
       }
       alert(parallax_data.mode);
     };
   }
   return win;
 };
 ///   THIS WILL CHECK IF PANEL IS DOCKABLE OR FLAOTING WINDOW
 var win = buildUI(thisObj);
 if ((win !== null) && (win instanceof Window)) {
   win.center();
   win.show();
 } // end if win  null and not a instance of window