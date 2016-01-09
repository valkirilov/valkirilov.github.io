
var App = (function() {

	var mainLineElement;

	var init = function() {

		mainLineElement = $('#main-line');

		initTopContainer();

	};

	var initTopContainer = function() {
		setTimeout(function() {	addAnimation($('.top .name'), 'slideInUp', true);	}, 1000);
		setTimeout(function() { addAnimation($('.top .description'), 'zoomIn', true); }, 2000);
		setTimeout(function() { $('.top').addClass('added-image'); }, 3000);
		setTimeout(function() { addAnimation($('#main-line'), 'slideInUp', true);	}, 3000);
		setTimeout(function() { addAnimation($('#navigation-about'), 'zoomIn'); }, 3100);
		setTimeout(function() { addAnimation($('#navigation-work'), 'zoomIn'); }, 3200);
		setTimeout(function() { addAnimation($('#navigation-contacts'), 'zoomIn'); }, 3300);
	};

	var positionMainLine = function() {
		var offset = getViewportOffset(mainLineElement);
		var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    if ($(window).scrollTop() > viewportHeight - mainLineElement.height()) {
      mainLineElement.addClass('fixed');
    }
    else {
      mainLineElement.removeClass('fixed');
  	}
	}

	function addAnimation(element, animation, opacity) {
		opacity = opacity || false;

		element.addClass('animated');
		element.addClass(animation);

		if (opacity) {
			element.fadeIn();
		}
	}

	$(window).on('scroll', function() {
		positionMainLine();
	});

	function getViewportOffset($e) {
	  var $window = $(window),
	    scrollLeft = $window.scrollLeft(),
	    scrollTop = $window.scrollTop(),
	    offset = $e.offset(),
	    rect1 = { x1: scrollLeft, y1: scrollTop, x2: scrollLeft + $window.width(), y2: scrollTop + $window.height() },
	    rect2 = { x1: offset.left, y1: offset.top, x2: offset.left + $e.width(), y2: offset.top + $e.height() };
	  return {
	    left: offset.left - scrollLeft,
	    top: offset.top - scrollTop,
	    insideViewport: rect1.x1 < rect2.x2 && rect1.x2 > rect2.x1 && rect1.y1 < rect2.y2 && rect1.y2 > rect2.y1
	  };
	}

	return {
		init: init
	}
})();

$(document).ready(function() {
	App.init();
});