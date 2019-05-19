(function(){
/* Load Script function we may need to load jQuery from the Google's CDN */
/* That code is world-reknown. */
/* One source: http://snipplr.com/view/18756/loadscript/ */

var loadScript = function(url, callback){
  var script = document.createElement("script");
  script.type = "text/javascript";

  // If the browser is Internet Explorer.
  if (script.readyState){
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" || script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  // For any other browser.
  } else {
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

/* This is my app's JavaScript */
var myAppJavaScript = function($){
  // $ in this scope references the jQuery object we'll use.
  // Don't use jQuery, or jQuery191, use the dollar sign.
  // Do this and do that, using $.
  $(document).foundation();
  $('body').append('<p>Your app is using jQuery version '+$.fn.jquery+'</p>');
};

/* If jQuery has not yet been loaded or if it has but it's too old for our needs,
we will load jQuery from the Google CDN, and when it's fully loaded, we will run
our app's JavaScript. Set your own limits here, the sample's code below uses 2.2
as the minimum version we are ready to use, and if the jQuery is older, we load 2.2.0. */
if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 2.2)) {
  loadScript('//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js', function(){
    jQuery220 = jQuery.noConflict(true);
    myAppJavaScript(jQuery220);
  });
} else {
  myAppJavaScript(jQuery);
}
})();
