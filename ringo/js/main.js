
$(window).resize(function() { 
	var wH = $(window).height();
	var wW = $(window).width();
    $('.video').height(wH).width(wW);
});
$(window).resize();

$(document).bind(
	'touchmove',
	function(e) {
	e.preventDefault();
	}
);

//functions
(function ($) {
    $.fn.showOnebyOne= function () {
        var $obo = $(this);
        var delay = 0;
        
        $obo.each(function () {
            var $oboItem = $(this);
            setTimeout(function() { 
            	$oboItem.an();
            	setTimeout(function() { 
	            	$oboItem.removeClass('hided');
	            	$oboItem.addClass('visible');
	            	setTimeout(function() { 
	            		$oboItem.dan();
	            	},1000);
	            },1);
            }, delay);
            delay += 250;
        });
    };
    $.fn.showOnebyOneF= function () {
        var $obo = $(this);
        var delay = 0;
        
        $obo.each(function () {
            var $oboItem = $(this);
            setTimeout(function() { 
            	$oboItem.an();
            	setTimeout(function() { 
	            	$oboItem.removeClass('hided');
	            	$oboItem.addClass('visible');
	            	setTimeout(function() { 
	            		$oboItem.dan();
	            	},1000);
	            },1);
            }, delay);
            delay += 150;
        });
    };
    $.fn.hideOnebyOne= function () {
        var $obo = $(this);
        var delay = 0;
        
        $obo.each(function () {
            var $oboItem = $(this);
            setTimeout(function() { 
	            $oboItem.addClass('hided');
            }, delay);
            delay += 150;
        });
    };
    $.fn.sh = function () {
        $(this).removeClass('hided')
    };
    $.fn.hd = function () {
        $(this).addClass('hided')
    };
    $.fn.an = function () {
        $(this).addClass('animated')
    };
    $.fn.dan = function () {
        $(this).removeClass('animated')
    };
})(jQuery);

function nextScreen() {
    var $cont = $(".viewport");
    var $sl = $cont.find('section.page');
    var $vis = $cont.find('section.page.visible');
    var $next = $vis.next('section.page');
    var $prev = $vis.prev('section.page');

    if($next.size()) {
        var $next = $vis.next('section.page');
    } else {
        var $next = $cont.find('section.page:first');
    }

    $next.addClass('disp');

    var $id = $next.attr('id');
    $('.pager a').removeClass('active');
    var highlight = $('#' + $id + '_link');
    highlight.addClass('active');

    setTimeout(function() {
        $next.addClass('appear');
        setTimeout(function() {
            $next.addClass('visible');
            $vis.addClass('prev');
            setTimeout(function() {
                $vis.removeClass('visible appear next prev appear-prev');
                $next.removeClass('appear');
            }, 1000);
        },1);
    }, 1);
}
function prevScreen() {
    var $cont = $(".viewport");
    var $sl = $cont.find('section.page');
    var $vis = $cont.find('section.page.visible');
    var $next = $vis.next('section.page');
    var $prev = $vis.prev('section.page');


    if($prev.size()) {
        var $prev = $vis.prev('section.page');
    } else {
        var $prev = $cont.find('section.page:last');
    }
    var $id = $prev.attr('id');
    $('.pager a').removeClass('active');
    var highlight = $('#' + $id + '_link');
    highlight.addClass('active');

    if($prev.hasClass('prev')) {
        //
    } else {
        $prev.addClass('prev');
    }
    $prev.addClass('disp');

    setTimeout(function() {
        $prev.addClass('appear-prev');
        $vis.addClass('next');
        setTimeout(function() {
            $prev.removeClass('prev');
            $prev.addClass('visible');

            setTimeout(function() {
                $vis.removeClass('visible appear next prev appear-prev');
                $prev.removeClass('appear-prev');
            }, 1000);
        }, 1);
    }, 1);
}

$('.pager a, .mainpage-nav a').click(function(){
    var $cont = $(".viewport"),
        id = $(this).attr('href'),
        tid = $(this).attr('id'),
        $vis = $cont.find('section.page.visible');

    $('.pager a').removeClass('active');

    var highlight = $('#' + tid + 'nk');
    highlight.addClass('active');
    $(this).addClass('active');

    $(id).removeClass('visible appear next prev appear-prev disp');
    $(id).addClass('visible disp oph');
    setTimeout(function() {
        $(id).addClass('opa');
        setTimeout(function() {
            $vis.removeClass('visible appear next prev appear-prev disp');
            $(id).removeClass('opa oph');
        }, 1000);
    },1);

    return false;
});

$('body').preload(function() {

	$(window).resize();
	$('.curtain').removeClass('visible');
	setTimeout(function () {
		$('.curtain').remove();
		$('section.slider').find('article').removeClass('deanimated');
	}, 2000);

    $(function(){
        (function oneWheel(){
            $('.viewport').one('mousewheel', { mousewheel: { behavior: 'debounce', delay: 1200 } }, function(event, delta) {
                event.preventDefault();

                if(delta < 0)
                    nextScreen();
                else
                    prevScreen();
                setTimeout(oneWheel,1500);
            })
        })()
    });

    $('.viewport').swipe( {
        swipeUp:function(event, direction, distance, duration) {
            prevScreen();
        },
        swipeDown:function(event, direction, distance, duration) {
            nextScreen();
        },
        click:function(event, target) {
        },
        threshold:100,
        allowPageScroll:"vertical"
    });
});