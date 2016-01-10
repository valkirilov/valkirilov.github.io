
var App = (function() {

	var mainLineElement;

	var init = function() {

		mainLineElement = $('#main-line');
		
		initTopContainer();
		initSectionAbout();
		initSectionWork();
		initSectionContacts();
		initAnchorScroll();
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

	var initSectionWork = function() {
		var section = $('#section-work');
		var offset = getViewportOffset(section);
		var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		
		var projectJspres = $('#section-work #work-project-jspres');
    	if ($(window).scrollTop() >  projectJspres.offset().top - viewportHeight && !projectJspres.hasClass('icons-animated')) {
			projectJspres.addClass('icons-animated');
     		setTimeout(function() { addAnimation(projectJspres, 'flipInX', true); }, 100);
		}
		
		var projectWhatToDo = $('#section-work #work-project-what-to-do');
		if ($(window).scrollTop() >  projectWhatToDo.offset().top - viewportHeight && !projectWhatToDo.hasClass('icons-animated')) {
			projectWhatToDo.addClass('icons-animated');
     		setTimeout(function() { addAnimation(projectWhatToDo, 'flipInX', true); }, 200);
		}
		
		var projectEasyMath = $('#section-work #work-project-easy-math');
		if ($(window).scrollTop() >  projectEasyMath.offset().top - viewportHeight && !projectEasyMath.hasClass('icons-animated')) {
			projectEasyMath.addClass('icons-animated');
     		setTimeout(function() { addAnimation(projectEasyMath, 'flipInX', true); }, 300);
		}
		
		var projectBullsAndCows = $('#section-work #work-project-bulls-and-cows');
		if ($(window).scrollTop() >  projectBullsAndCows.offset().top - viewportHeight && !projectBullsAndCows.hasClass('icons-animated')) {
			projectBullsAndCows.addClass('icons-animated');
     		setTimeout(function() { addAnimation(projectBullsAndCows, 'flipInX', true); }, 400);
		}
		
		var projectChatPrivately = $('#section-work #work-project-chat-privately');
		if ($(window).scrollTop() >  projectChatPrivately.offset().top - viewportHeight && !projectChatPrivately.hasClass('icons-animated')) {
			projectChatPrivately.addClass('icons-animated');
     		setTimeout(function() { addAnimation(projectChatPrivately, 'flipInX', true); }, 500);
		}
		
		var projectMoreProjects = $('#section-work #work-project-more-projects');
		if ($(window).scrollTop() >  projectMoreProjects.offset().top - viewportHeight && !projectMoreProjects.hasClass('icons-animated')) {
			projectMoreProjects.addClass('icons-animated');
     		setTimeout(function() { addAnimation(projectMoreProjects, 'flipInX', true); }, 600);
    	}
	}
	
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
	
	var initSectionAbout = function() {
		var section = $('#section-about');
		var offset = getViewportOffset(section);
		var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		
    	if ($(window).scrollTop() >  section.offset().top - viewportHeight && !section.hasClass('icons-animated')) {
			section.addClass('icons-animated');
			console.log('show');
     		setTimeout(function() { addAnimation($('#section-about .about-icons .about-icon.php'), 'zoomIn', true); }, 500);
     		setTimeout(function() { addAnimation($('#section-about .about-icons .about-icon.html5'), 'zoomIn', true); }, 600);
     		setTimeout(function() { addAnimation($('#section-about .about-icons .about-icon.css3'), 'zoomIn', true); }, 700);
     		setTimeout(function() { addAnimation($('#section-about .about-icons .about-icon.apple'), 'zoomIn', true); }, 800);
     		setTimeout(function() { addAnimation($('#section-about .about-icons .about-icon.linux'), 'zoomIn', true); }, 900);
     		setTimeout(function() { addAnimation($('#section-about .about-icons .about-icon.javascript'), 'zoomIn', true); }, 1000);
    	}
	}	
	
	var initSectionContacts = function() {
		var section = $('#section-contacts');
		var offset = getViewportOffset(section);
		var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		
    	if ($(window).scrollTop() >  section.offset().top - viewportHeight && !section.hasClass('icons-animated')) {
			section.addClass('icons-animated');
     		setTimeout(function() { addAnimation($('#section-contacts .social #social-email'), 'slideInUp', true); }, 500);
			setTimeout(function() { addAnimation($('#section-contacts .social #social-linkedin'), 'slideInUp', true); }, 600);
			setTimeout(function() { addAnimation($('#section-contacts .social #social-github'), 'slideInUp', true); }, 700);
			setTimeout(function() { addAnimation($('#section-contacts .social #social-behance'), 'slideInUp', true); }, 800);
    	}
	}	
	
	var initAnchorScroll = function() {
		$('a').click(function() {
  			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      			var target = $(this.hash);
      			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
			        $('html,body').animate({
			          scrollTop: target.offset().top - mainLineElement.height()
			        }, 1000);
			        return false;
			    }
    		}
		});
	}

	function addAnimation(element, animation, opacity) {
		opacity = opacity || false;

		element.addClass('animated');
		element.addClass(animation);

		if (opacity) {
			element.css('display', 'block');
			element.css('opacity', '1');
		}
		
		element.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			element.removeClass('animated');
			element.removeClass(animation);
		});
	}

	$(window).on('scroll', function() {
		positionMainLine();
		initSectionAbout();
		initSectionWork();
		initSectionContacts();
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