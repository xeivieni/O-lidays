/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.4
 *
 */
(function(a,b,c,d){var e=a(b);a.fn.lazyload=function(c){function i(){var b=0;f.each(function(){var c=a(this);if(h.skip_invisible&&!c.is(":visible"))return;if(!a.abovethetop(this,h)&&!a.leftofbegin(this,h))if(!a.belowthefold(this,h)&&!a.rightoffold(this,h))c.trigger("appear"),b=0;else if(++b>h.failure_limit)return!1})}var f=this,g,h={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null};return c&&(d!==c.failurelimit&&(c.failure_limit=c.failurelimit,delete c.failurelimit),d!==c.effectspeed&&(c.effect_speed=c.effectspeed,delete c.effectspeed),a.extend(h,c)),g=h.container===d||h.container===b?e:a(h.container),0===h.event.indexOf("scroll")&&g.bind(h.event,function(a){return i()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,c.one("appear",function(){if(!this.loaded){if(h.appear){var d=f.length;h.appear.call(b,d,h)}a("<img />").bind("load",function(){c.hide().attr("src",c.data(h.data_attribute))[h.effect](h.effect_speed),b.loaded=!0;var d=a.grep(f,function(a){return!a.loaded});f=a(d);if(h.load){var e=f.length;h.load.call(b,e,h)}}).attr("src",c.data(h.data_attribute))}}),0!==h.event.indexOf("scroll")&&c.bind(h.event,function(a){b.loaded||c.trigger("appear")})}),e.bind("resize",function(a){i()}),/iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent.persisted&&f.each(function(){a(this).trigger("appear")})}),a(b).load(function(){i()}),this},a.belowthefold=function(c,f){var g;return f.container===d||f.container===b?g=e.height()+e.scrollTop():g=a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return f.container===d||f.container===b?g=e.width()+e.scrollLeft():g=a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return f.container===d||f.container===b?g=e.scrollTop():g=a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return f.container===d||f.container===b?g=e.scrollLeft():g=a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!a.rightoffold(b,c)&&!a.leftofbegin(b,c)&&!a.belowthefold(b,c)&&!a.abovethetop(b,c)},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})})(jQuery,window,document)

$(function(){
	
	// Image lazy loading - http://www.appelsiini.net/projects/lazyload
	
	$("img[data-original]").lazyload({ 
	    effect : "fadeIn",
	    appear: function() {
	    	$(this).parent().spin('large');	
	    },
	    load: function() { 
	    	$(this).parent().data('spinner').stop(); 
	    }
	});
	
	// Hover behaviour for images when touch is not available (ie. desktop)
	
	$('.no-touch .image-wrapper').hover(
		function(){
			$(this).find('.overlay').fadeIn();
		}, 
		function(){
			$(this).find('.overlay').fadeOut();
		}
	);
	
	var cartButton = null,
		favouritesButton = null,
		loginButton = null,
		registerButton = null,
		myAccountButton = null,
		logoutButton = null;
	
	$(document)
	.on('ready', function() {
		cartButton = $('#cart-menu-button');
		favouritesButton = $('#favourite-menu-button');
		loginButton = $('#login-menu-button');
		registerButton = $('#register-menu-button');
		myAccountButton = $('#account-menu-button');
		logoutButton = $('#logout-menu-button');
	})
	.on('fm.cartupdated', function(e, cart) {
		if(cartButton.length > 0) {
			if(cart.summary.items > 0) {
				cartButton.text(cart.label + ' (' + cart.summary.items + ')');
				cartButton.closest('li').removeClass('hide');
			}
			else {
				cartButton.closest('li').addClass('hide');
			}
		}
	})
	.on('fm.favouritesupdated', function(e, favourites) {
		if(favouritesButton.length > 0) {
			if(favourites.count > 0) {
				favouritesButton.closest('li').removeClass('hide');
				favouritesButton.text(favourites.label + ' (' + favourites.count + ')');
			}
			else {
				favouritesButton.closest('li').addClass('hide');
			}
		}
	})
	.on('fm.contactupdated', function(e, contact) {
		// Logged in?
		if(contact.logged_in) {
			$('.auth-item').addClass('hide');
			myAccountButton.text(contact.name).removeClass('hide');
			logoutButton.removeClass('hide');
		}
		else {
			$('.auth-item').addClass('hide');
			loginButton.removeClass('hide');
			registerButton.removeClass('hide');
		}
	})
	;
	
	// Behaviour for images when touch is available (ie. mobile and tablet)
	
	if(!$(document).hasClass('no-touch'))
	{
		$('.list .image-protection-container img.protected, .list .image-wrapper img').click(function(event){
			if (event.target === this) {
				if($(this).closest('.image-wrapper').find('.overlay').length > 0)
				{
					$('.overlay').fadeOut();
					$(this).closest('.image-wrapper').find('.overlay').fadeIn();
					event.preventDefault();
				}
			}
		});
		
		$('.gallery .image-protection-container img.protected, .gallery .image-wrapper img').click(function(event) {
			if (event.target === this) {
				$('.overlay').fadeOut();
				$(this).closest('.image-wrapper').find('.overlay').fadeIn();
			}
		});
		
		$('.gallery .overlay .shadow').click(function(event) {
			if (event.target === this) {	
				$(this).closest('.overlay').fadeOut();
			}
		});
	}
});
