(function() {
  'use strict';
  var ThisIsABigTest = {
    init: function() {
      console.log('The test script has been initialized!! Huzzah!');
    }
  };

  window.ThisIsABigTest = ThisIsABigTest;
}());

ThisIsABigTest.init();
