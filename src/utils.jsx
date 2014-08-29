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