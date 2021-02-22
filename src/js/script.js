$(document).ready(function () {
	preloaderFadeOutTime = 800;
	function hidePreloader() {
	var preloader = $('.preloader');
	preloader.fadeOut(preloaderFadeOutTime);
	}
	hidePreloader();

	$(window).scroll(function () {
		// sticky navbar on scroll script
		if (this.scrollY > 20) {
			$('.navbar').addClass("sticky");
		} else {
			$('.navbar').removeClass("sticky");
		}
		// scroll-up button show/hide script
		if (this.scrollY > 500) {
			$('.scroll-up-btn').addClass("show");
		} else {
			$('.scroll-up-btn').removeClass("show");
		}
	});
	// slide-up script
	$('.scroll-up-btn').click(function () {
		$('html').animate({
			scrollTop: 0
		});
		// removing smooth scroll on slide-up button click
		$('html').css("scrollBehavior", "auto");
	});
	$('.navbar .menu li a').click(function () {
		// applying again smooth scroll on menu items click
		$('html').css("scrollBehavior", "smooth");
	});
	// toggle menu/navbar script
	$('.menu-btn').click(function () {
		$('.navbar .menu').toggleClass("active");
		$('.menu-btn i').toggleClass("active");
	});
	// typing text animation script
	var typed = new Typed(".typing", {
		strings: ["Developer", "Designer", "Researcher", "Blogger"],
		typeSpeed: 100,
		backSpeed: 60,
		loop: true
	});
	var typed2 = new Typed(".typing-2", {
		strings: ["Developer", "Designer", "Researcher", "Blogger"],
		typeSpeed: 100,
		backSpeed: 60,
		loop: true
	});
	// owl carousel script
	$('.carousel').owlCarousel({
		margin: 20,
		loop: true,
		autoplayTimeOut: 2000,
		responsiveBaseElement: 'body',
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
				nav: false
			},
			600: {
				items: 2,
				nav: false
			},
			1000: {
				items: 3,
				nav: false
			}
		}
	});
});

$(document).ready(function () {
	var itemSelector = '.grid-item';
	var $container = $('#container').isotope({
		itemSelector: itemSelector,
		masonry: {
			columnWidth: itemSelector,
			isFitWidth: true
		}
	});
	//Ascending order
	var responsiveIsotope = [
		[480, 3],
		[720, 3]
	];
	var itemsPerPageDefault = 3;
	var itemsPerPage = defineItemsPerPage();
	var currentNumberPages = 1;
	var currentPage = 1;
	var currentFilter = '*';
	var filterAtribute = 'data-filter';
	var pageAtribute = 'data-page';
	var pagerClass = 'isotope-pager';

	function changeFilter(selector) {
		$container.isotope({
			filter: selector
		});
	}

	function goToPage(n) {
		currentPage = n;
		var selector = itemSelector;
		selector += (currentFilter != '*') ? '[' + filterAtribute + '="' + currentFilter + '"]' : '';
		selector += '[' + pageAtribute + '="' + currentPage + '"]';
		changeFilter(selector);
	}

	function defineItemsPerPage() {
		var pages = itemsPerPageDefault;
		for (var i = 0; i < responsiveIsotope.length; i++) {
			if ($(window).width() <= responsiveIsotope[i][0]) {
				pages = responsiveIsotope[i][1];
				break;
			}
		}
		return pages;
	}

	function setPagination() {
		var SettingsPagesOnItems = function () {
			var itemsLength = $container.children(itemSelector).length;
			var pages = Math.ceil(itemsLength / itemsPerPage);
			var item = 1;
			var page = 1;
			var selector = itemSelector;
			selector += (currentFilter != '*') ? '[' + filterAtribute + '="' + currentFilter + '"]' : '';
			$container.children(selector).each(function () {
				if (item > itemsPerPage) {
					page++;
					item = 1;
				}
				$(this).attr(pageAtribute, page);
				item++;
			});
			currentNumberPages = page;
		}();
		var CreatePagers = function () {
			var $isotopePager = ($('.' + pagerClass).length == 0) ? $('<div class="' + pagerClass + '"></div>') : $('.' + pagerClass);
			$isotopePager.html('');
			for (var i = 0; i < currentNumberPages; i++) {
				var $pager = $('<a href="javascript:void(0);" class="pager" ' + pageAtribute + '="' + (i + 1) + '"></a>');
				$pager.html(i + 1);
				$pager.click(function () {
					var page = $(this).eq(0).attr(pageAtribute);
					goToPage(page);
				});
				$pager.appendTo($isotopePager);
			}
			$container.after($isotopePager);
		}();
	}
	setPagination();
	goToPage(1);
	//Adicionando Event de Click para as categorias
	$('.filters a').click(function () {
		var filter = $(this).attr(filterAtribute);
		currentFilter = filter;
		setPagination();
		goToPage(1);
	});
	//Evento Responsivo
	$(window).resize(function () {
		itemsPerPage = defineItemsPerPage();
		setPagination();
	});
});

$(document).ready( function() {
	$('.filter-button-group').on( 'click', 'li', function() {
	 var filterValue = $(this).attr('data-filter');
	 $('.grid').isotope({ filter: filterValue });
	 $('.filter-button-group li').removeClass('active');
	 $(this).addClass('active');
	});
});

$(document).ready( function() {
	$('.isotope-pager').on( 'click', 'a', function() {
	 var filterValue = $(this).attr('data-page');
	 $('.isotope-pager a').removeClass('active');
	 $(this).addClass('active');
	});
});

$(document).on('click','.navbar .menu li', function(){
	$(this).addClass('active').siblings().removeClass('active');
});


var selector = '.navbar .menu li a';
$(window).scroll(function() {
	  onScrollt(selector);
});
function onScrollt(selector) {
		var scrollPos = $(document).scrollTop();
		$(selector).each(function() {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if (parseInt(refElement.position().top) <= scrollPos && parseInt(refElement.position().top) + parseInt(refElement.height()) > scrollPos) {
						$(selector).removeClass("active");
						$('.navbar .menu li').removeClass("active")
						currLink.addClass("active");
				} else {
						currLink.removeClass("active");
				}
		});
}
