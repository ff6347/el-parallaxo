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