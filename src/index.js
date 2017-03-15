var $ = require('jquery');
var jQuery  = require('jquery');

require('./parallax');

require('./index.scss');


// Plaxify all `js-plaxify` element layers
var layers = $('.js-plaxify');

$.each(layers, function(index, layer){
  $(layer).plaxify({
    xRange: $(layer).data('xrange') || 0,
    yRange: $(layer).data('yrange') || 0,
    invert: $(layer).data('invert') || false
  });
});

$.plax.enable();
