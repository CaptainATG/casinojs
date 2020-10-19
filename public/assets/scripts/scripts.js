var $ = jQuery.noConflict();

$(document).ready(function() {	
	// tabs
	$('div.tabs-wrapper').find('.tab:not(:first)').hide();
	//$('ul.tabs > li:first-child').addClass('active');
	
	$('ul.tabs a').click(function(event) {
		event.preventDefault();
	
		// make tab button active
		$(this).closest('ul').find('li').removeClass('active');
		$(this).closest('li').addClass('active');
		
		// hide inactive tab and show new tab
		$(this).closest('div').find('.tab').hide();
		var showme = $(this).attr('id');
		$(this).closest('div').find('.tab.' + showme).fadeIn();
	});
	
	// tabs tranfer
	$('div.tranfer-wrapper').find('.tab_tranfer:not(:first)').hide();
	$('ul.tabs_tranfer > li:first-child').addClass('active');
	
	$('ul.tabs_tranfer a').click(function(event) {
		event.preventDefault();
	
		// make tab button active
		$(this).closest('ul').find('li').removeClass('active');
		$(this).closest('li').addClass('active');
		
		// hide inactive tab and show new tab
		$(this).closest('div').find('.tab_tranfer').hide();
		var showme = $(this).attr('id');
		$(this).closest('div').find('.tab_tranfer.' + showme).fadeIn();
	});
	
	
	// back to top smooth scroll
	$('#back-to-top').on('click',function (e) {
	    e.preventDefault();

	    $('html, body').stop().animate({
	        'scrollTop': $('body').offset().top
	    }, 900, 'swing');
	});
	
	
});

$(window).load(function() {	
	
});

$(window).scroll(function(){
	// on scroll, make the navigation fixed
	if ($(this).scrollTop() > 80) {
		$('#header').addClass('fixed-header');
		$('#back-to-top').css('display','block');
	} else {
		$('#header').removeClass('fixed-header');
		$('#back-to-top').hide();
	}
});


//languages
$(function() {

    var $menu = $('#ldd_languages');

    $menu.children('li').each(function() {
        var $this = $(this);
        var $span = $this.children('span');
        $span.data('width', $span.width());

        $this.bind('mouseenter', function() {
            $menu.find('.ldd_sublanguages').stop(true, true).hide();
            $span.stop().animate({ 'width': 'auto' }, 150, function() {
                $this.find('.ldd_sublanguages').slideDown(300);
            });
        }).bind('mouseleave', function() {
            $this.find('.ldd_sublanguages').stop(true, true).hide();
            $span.stop().animate({ 'width': $span.data('width') + 'px' }, 300);
        });
    });


});

//Slide
jQuery(window).load(function() {

	// init Cycle for slider
	$('#slides').after('<div id="circle-pager">').cycle({
			fx:      'fade', 
			speed:    800, 
			timeout:  8000,
			cleartype:  true,
			cleartypeNoBg: false,
			pager: '#circle-pager',
			next:  '#slider .next1', 
			prev:  '#slider .prev1',
			slideResize: false,
			fit: 0,
			width: '100%',
			before:  function(currSlideElement, nextSlideElement) { 
				// hide elements and put them in start position		
				$(this).find('.slide-image').css({
					'opacity': '0',
					'right': '-50px'
				});
				$(this).find('.slide-text').css({
					'opacity': '0',
					'left': '-50px'
				});
				$(this).find('.slide-text p').css({
					'opacity': '0',
					'left': '15px'
				});
				$(this).find('.slide-image img').css({
					'opacity': '0',
					'right': '-100px'
				});
			},
			after:  function(currSlideElement, nextSlideElement) { 			
				// fade in image
				$(this).find('.slide-image').animate({
					'opacity': '1',
					'right': '0'
				}, 500, 'linear');
				// bring the text box from top
				$(this).find('.slide-text').delay(500).animate({
					'opacity': '1',
					'left': '0'
				}, 500, 'easeOutBack');
				// bring the paragraphs in
				$(this).find('.slide-text p:eq(0)').delay(500).animate({
					'opacity': '1',
					'left': '0'
				}, 500, 'easeOutBack');
				$(this).find('.slide-text p:eq(1)').delay(700).animate({
					'opacity': '1',
					'left': '0'
				}, 500, 'easeOutBack');
				$(this).find('.slide-text p:eq(2)').delay(900).animate({
					'opacity': '1',
					'left': '0'
				}, 500, 'easeOutBack');
				$(this).find('.slide-text p:eq(3)').delay(1100).animate({
					'opacity': '1',
					'left': '0'
				}, 500, 'easeOutBack');
				// bring the front images in
				$(this).find('.slide-image img:eq(0)').delay(500).animate({
					'opacity': '1',
					'right': '0'
				}, 800, 'easeOutBack');
				$(this).find('.slide-image img:eq(1)').delay(700).animate({
					'opacity': '1',
					'right': '0'
				}, 800, 'easeOutBack');
				$(this).find('.slide-image img:eq(2)').delay(900).animate({
					'opacity': '1',
					'right': '0'
				}, 800, 'easeOutBack');
				$(this).find('.slide-image img:eq(3)').delay(1100).animate({
					'opacity': '1',
					'right': '0'
				}, 800, 'easeOutBack');

			} 
		});
	
		
		// Slots slider
	$('#slides-slots').after('<div id="circle-pager">').cycle({
			fx:      'fade', 
			speed:    800, 
			timeout:  8000,
			cleartype:  true,
			cleartypeNoBg: false,
			pager: '#circle-pager',
			next:  '.slider_slot .next1', 
			prev:  '.slider_slot .prev1',
			slideResize: false,
			fit: 0,
			width: '100%',
			before:  function(currSlideElement, nextSlideElement) { 
				// hide elements and put them in start position		
				$(this).find('.slide-image').css({
					'opacity': '0',
					'right': '-50px'
				});
				$(this).find('.slide-text').css({
					'opacity': '0',
					'left': '-50px'
				});
				$(this).find('.slide-text p').css({
					'opacity': '0',
					'left': '15px'
				});
				$(this).find('.slide-image img').css({
					'opacity': '0',
					'right': '-100px'
				});
			},
			after:  function(currSlideElement, nextSlideElement) { 			
				// fade in image
				$(this).find('.slide-image').animate({
					'opacity': '1',
					'right': '0'
				}, 500, 'linear');
				// bring the text box from top
				$(this).find('.slide-text').delay(500).animate({
					'opacity': '1',
					'left': '0'
				}, 500, 'easeOutBack');
				// bring the paragraphs in
				$(this).find('.slide-text p:eq(0)').delay(500).animate({
					'opacity': '1',
					'left': '0'
				}, 500, 'easeOutBack');
				$(this).find('.slide-text p:eq(1)').delay(700).animate({
					'opacity': '1',
					'left': '0'
				}, 500, 'easeOutBack');
				$(this).find('.slide-text p:eq(2)').delay(900).animate({
					'opacity': '1',
					'left': '0'
				}, 500, 'easeOutBack');
				$(this).find('.slide-text p:eq(3)').delay(1100).animate({
					'opacity': '1',
					'left': '0'
				}, 500, 'easeOutBack');
				// bring the front images in
				$(this).find('.slide-image img:eq(0)').delay(500).animate({
					'opacity': '1',
					'right': '0'
				}, 800, 'easeOutBack');
				$(this).find('.slide-image img:eq(1)').delay(700).animate({
					'opacity': '1',
					'right': '0'
				}, 800, 'easeOutBack');
				$(this).find('.slide-image img:eq(2)').delay(900).animate({
					'opacity': '1',
					'right': '0'
				}, 800, 'easeOutBack');
				$(this).find('.slide-image img:eq(3)').delay(1100).animate({
					'opacity': '1',
					'right': '0'
				}, 800, 'easeOutBack');

			} 
		});
	
	
});	


//DIALOG	

$.fx.speeds._default = 300;

$(function() {
    $("#dialog-message").dialog({
        autoOpen: false,
        show: "blind",
        hide: "scale",
        modal: true,
        resizable: "false"
    });
	
	$("#message").click(function() {
        $("#dialog-message").dialog("open");
        return false;
    });
	

    $("#dialog-message_detail").dialog({
        autoOpen: false,
        show: "blind",
        hide: "scale",
        modal: false,
        resizable: "false"
    });
	
	$("#message_detail").click(function() {
        $("#dialog-message_detail").dialog("open");
        return false;
    });
	
	
	$("#dialog-transaction").dialog({
        autoOpen: false,
        show: "blind",
        hide: "scale",
        modal: true,
        resizable: "false"
    });
	
	$("#transaction").click(function() {
        $("#dialog-transaction").dialog("open");
        return false;
    });
		
		$("#dialog-tranfers_lots").dialog({
			autoOpen: false,
			show: "blind",
			hide: "scale",
			modal: true,
			resizable: "false"
	});
	
	$("#tranfers_lots").click(function() {
        $("#dialog-tranfers_lots").dialog("open");
        return false;
});});


//DATE		
$(function() {
    $( "#datepicker" ).datepicker({
	inline: true
	});
});


