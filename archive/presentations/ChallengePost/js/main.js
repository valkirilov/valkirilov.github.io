
var lastSlide;
$(document).ready(function() {	
	setInterval(watchTransitions, 1000);
	
	function watchTransitions() {
		var currentSlideId = getSlideId();
		console.log("Last: " + lastSlide);
		
		if (currentSlideId == lastSlide)
			return;
			
		console.log("Changed");
			
		lastSlide = currentSlideId;
		switch (currentSlideId) {
			case "slide_1": $('#slide_1 .label_2').addClass('animated swing'); break;
			case "slide_2": $('#slide_2 .image_2').addClass('animated shake'); break;			
			case "slide_10": $('#slide_10 .image_3').addClass('animated tada'); break;
			case "slide_15": $('#slide_15 .image_3').addClass('animated flipInY'); break;
			case "slide_19": $('#slide_19 .image_4').addClass('animated flip');
							$('#slide_19 .label_3').addClass('animated tada'); break;
		}
	}	
});



function getSlideId() {
	var currentLocation = window.location;
	
	var currentSlide = currentLocation.hash.replace("#/", "");
	return currentSlide;
}

