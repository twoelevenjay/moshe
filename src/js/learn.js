import ScrollMagic from 'scrollmagic';
import { TweenMax, TimelineMax } from "gsap/all"; 
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
gsap.registerPlugin(ScrollToPlugin);
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

$(function () { // wait for document ready
// init
var controller = new ScrollMagic.Controller();

//hijacked scroll suuucks on mobile (short window too)
controller.scrollPos(function () {
	if(window.innerWidth <= 768 || window.innerHeight <= 600){
		return 0;
	} else {
		return window.pageYOffset;
	}
});

if($(window).width() >= 768 && $(window).height() >= 600 ){
	addPinning();
}

function addPinning(){
var myscene;
$(".panel").each(function() {
	var target = $(this).find("p");
	var tl = new TimelineMax();

// tl.from(target, .5, { opacity:0, y:100 });
// tl.to(target, .5, { opacity:0, y:0}, 1);

tl.staggerFrom(target, .8, { opacity:0, y:40}, .1);

myscene = new ScrollMagic.Scene({
	triggerElement: this,
	triggerHook: "0",
	duration: '100%',
// offset: -200
})
.setPin(this, {pushFollowers: true})
.setTween(tl)
.addTo(controller);
});
}
// change behaviour of controller to animate scroll instead of jump

controller.scrollTo(function (newpos, offset) {
	TweenMax.to(window, 2, {scrollTo: {y: newpos + offset}});
});

//  bind scroll to anchor links
$("#menu").on("click","a", function (e) {
	var id = $(this).attr("href");
	if ($(id).length > 0) {
		e.preventDefault();

// trigger scroll
if(id == '#panel-5'){
	controller.scrollTo(id, 10);
}
else{
	controller.scrollTo(id, 600);
}
// if supported by the browser we can even update the URL.
// if (window.history && window.history.pushState) {
//  history.pushState("", document.title, id);
// }
}
});
});

