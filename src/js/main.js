
//Bootstrap's mobile device @media breakpoint
var mobileBreak = 767;

//Load and set skill icons
var iconLocation = "src/images/skill-icons-";
var mIconSize = 128;
var sIconSize = 64;
var iconArr = ["HTML5", "CSS3", "JS", "jQuery", "Bootstrap", "Sass", "Vue", "Java", "Android", "Github", "Node", "Gulp", "WordPress", "Illustrator"];
var skillArr = $(".skill-icon");
var curSize = sIconSize;

//Functions to run immediately
resizeFrames('.project', mobileBreak);
alignHeadings(".section-heading");
setSkillIcons(true);

//Resize project boxes if window is mobile-sized
$(window).resize(function(){
	resizeFrames('.project', mobileBreak);
	alignHeadings(".section-heading");
	setSkillIcons();
});

//Resizes all selector element's heights to the same value
function resizeFrames(selector, breakPoint){
	var max = 0;
	if(selector !== ''){
		if($("body").width() > breakPoint - getScrollBarWidth()){

			//Recalulates the max height, then assigns to all
			$(selector).each(function(){
				$(this).css("height", "auto");
			});

			$(selector).each(function(){
				if(max < $(this).height()){
					max = $(this).height();
				}
			});
			$(selector).height(max);
		} else {
			//Resets the height of all selected elements to "auto",
			$(selector).each(function(){
				$(this).css("height", "auto");
			});
		}
	}
}

//Find the width of the vertical scrollbar.
//Returns 0 if none
function getScrollBarWidth(){

	$('body, html').css('overflow', 'hidden');
	var scrollWidth = $(window).width();

	$('body, html').css('overflow', 'visible');
	return scrollWidth -= $(window).width();
}

//Align all section-headings to the center of the window,
//offset by half od the element's width
function alignHeadings(selector){
	if(selector !== ''){
		$(selector).each(function(){
			var margin = $(".divider").width()/2 - $(this).width()/2;
			$(this).css("margin-left", margin);
		});
	}
}

function setSkillIcons(update){
	var size;

	if($(window).width() <= mobileBreak){
		size = sIconSize;
	} else {
		size = mIconSize;
	}

	if(size !== curSize || update){
		curSize = size;

		var i = 0;
		$(".skill-icon").each(function(){
			var image = "url(" + iconLocation + size + "/Logo-" + iconArr[i] + ".png)";
			$(this).css({"background-image": image, "width": "" + size, "height": "" + size});
			i++;
		});
	}
}