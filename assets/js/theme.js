(function($) {
	"use strict";

	$(function() {
		/**
		 * Add Google Analitcs Events for event tracking
		 */
		$('a[data-event-label]').mousedown(function() {

			var eventCategory = $(this).attr("data-event-category");

			if(!eventCategory){
				eventCategory = 'Uncategorized';
			}

		  ga('send', 'event', eventCategory, 'click', $(this).attr('data-event-label'),1);
		});

		/**
		 * Initialize countdown plugin
		 */
		if ($.fn.countdown !== undefined) {
			$('.line-countdown').each(function () {
				$(this).countdown({
					date: $(this).attr('data-endtime'),
					render: function(data) {
						$(this.el).html("\
							<div>" + this.leadingZeros(data.days, 2) + " <span>days</span></div>\
							<div>" + this.leadingZeros(data.hours, 2) + " <span>hrs</span></div>\
							<div>" + this.leadingZeros(data.min, 2) + " <span>min</span></div>\
							<div>" + this.leadingZeros(data.sec, 2) + " <span>sec</span></div>\
						");
					}
				});
			});
		}

		/**
		 * Nav
		 */
		$(".line-menu-btn").click(function(e){
			$('body').addClass('active');
		});
		$(".line-menu-btn-x").click(function(e){
			$('body').removeClass('active');
		});

		/**
		 * Scroll Blur
		 */
		$(window).scroll(function() {
		    var oVal;
		    oVal = $(window).scrollTop() / 180;
		    return $(".line-blur-active").css("opacity", oVal);
		});


		/**
		 * Parallax Scrolling Tutorial
		 * For NetTuts+
		 *  
		 * Author: Mohiuddin Parekh
		 *	http://www.mohi.me
		 * 	@mohiuddinparekh   
		 */
		$('div[data-type="background"]').each(function(){
			var elm = $(this),
				win = $(window);

			win.on('scroll', function() {
				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!								
				var yPos = -(win.scrollTop() / elm.data('speed')); 

				// Put together our final background position
				var coords = '50% '+ yPos + 'px';

				// Move the background
				elm.css({ backgroundPosition: coords });
			}); // window scroll Ends
		});


		/**
		 * Set Full Banner
		 */
    $(window).on('resize', function() {
    	$('.line-full,.line-item-height').css({'height': $(window).height()});
    }).trigger('resize');

		/**
		 * Initialize go to top button
		 */
		$('#line-gotop').on('click', function(e) {
			e.preventDefault();
			$("html, body").animate({
				scrollTop: 0
			}, 1000);
		});
		$(window).on('load scroll', function() {
			$(window).scrollTop() > 0
				? $('#line-gotop').addClass('line-visible')
				: $('#line-gotop').removeClass('line-visible');
		});

		/**
		 * Register event to dismiss alert box
		 */
		$(document).on('click', '.line-alert .close', function(e) {
			e.preventDefault();
			$(this).closest('.line-alert').fadeOut();
		});

		/**
		 * Initialize linethemes components
		 */
		if ($.fn.component !== undefined) {
			$('.line-portfolio').component('portfolio');
			$('form.newsletter, .contact-form form').component('ajax-form');
			$('.line-tabs').component('tabs');
			$('.line-accordion').component('accordion');
			$('.line-progress-bar').component('progress-bar');
			$('.line-reveal').component('reveal');
			$('.line-sticky').component('sticky', {
				containment: '#line-page-body > .line-container'
			});
		}

		if ($.fn.waypoint !== undefined) {
			$('[data-waypoint-enabled="yes"]').waypoint(function() {
				$(this).trigger('on-inside-viewport');
			}, { offset: '90%' });

			$(window).on('load', function() {
				setTimeout(function() {
					$.waypoints('refresh');
				}, 100);
			});
		}

		/**
		 * Scroll to target section
		 */
		$(window).on('load', function() {
			if (window.location.hash.length > 1) {
				var section = $(window.location.hash);

				if (section.length > 0) {
					$('html, body').animate({
						scrollTop: section.offset().top
					}, 500);
				}
			}
		});

		/**
		 * Initialize pretty photo plugin
		 */
		if ($.fn.nivoLightbox !== undefined) {
			$('a[data-lightbox="nivoLightbox"]').nivoLightbox({
				effect: 'fade',                             // The effect to use when showing the lightbox
				theme: 'default',                           // The lightbox theme to use
				keyboardNav: true,                          // Enable/Disable keyboard navigation (left/right/escape)
				clickOverlayToClose: true,                  // If false clicking the "close" button will be the only way to close the lightbox
				errorMessage: 'The requested content cannot be loaded. Please try again later.'
			});
		}

		/**
		 * Initialize flex slider plugin
		 */
		if ($.fn.flexslider !== undefined) {
			$('.flexslider').flexslider({
				animation: 'fade',
				slideshow: true,
				controlNav: true,
				prevText: '<i class="fa fa-angle-left"></i>',
				nextText: '<i class="fa fa-angle-right"></i>',
			});

			$('.line-carousel').flexslider({
				animation: 'slide',
				animationLoop: false,
				directionNav: false,
				itemWidth: 300,
				minItems: 1,
				maxItems: 3,
			});

			$('.line-carousel-one').flexslider({
				animation: 'slide',
				animationLoop: false,
				directionNav: false,
				minItems: 1,
				maxItems: 1,
			});
		}
		
		/**
		 * Initialize number counter plugin
		 */
		if ($.fn.countTo !== undefined) {
			$('.line-funfact').on('on-inside-viewport', function() {
				$('.line-count-numb', this).each(function() {
					if ($(this).data('is-animated') === undefined) {
						var to = parseInt($(this).attr('data-to')), speed = parseInt($(this).attr('data-speed'));
						$(this).countTo({
							to: to,
							speen: speed
						});

						$(this).data('is-animated', true);
					}
				});
			});
		}

		/**
		 * Woocommerce Widgets
		 */
		$("#spinner").spinner({
			spin: function(event, ui) {
				if (ui.value < 1) {
					$( this ).spinner("value", 1);
					return false;
				}
			}
		});

		$(".price_slider").slider({
			range: true,
			min: 0,
			max: 100,
			values: [ 0, 75 ],
			slide: function( event, ui ) {
				$( ".price_label > input " ).val( "€" + ui.values[ 0 ] + " - €" + ui.values[ 1 ] );
			}
		});

		$(".price_label > input ").val(
			"€" + $(".price_slider").slider("values", 0) + " - €" + $(".price_slider").slider("values", 1)
		);
	});
	
})(jQuery);