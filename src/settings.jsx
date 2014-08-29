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