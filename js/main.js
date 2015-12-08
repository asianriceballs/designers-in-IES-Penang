/**
 * main.js
 * Stack behaviour also here ... 
 */

;(function(window) {

	'use strict';

	var support = { transitions: Modernizr.csstransitions },
		// transition end event name
		transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		onEndTransition = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target != this ) return;
					this.removeEventListener( transEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(this); }
			};
			if( support.transitions ) {
				el.addEventListener( transEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		},
		// the pages wrapper
		stack = document.querySelector('.pages-stack'),
		// the page elements
		pages = [].slice.call(stack.children),
		// total number of page elements
		pagesTotal = pages.length,
		// index of current page
		current = 0,
		// menu button
		menuCtrl = document.querySelector('button.menu-button'),
		// the navigation wrapper
		nav = document.querySelector('.pages-nav'),
		// the menu nav items
		navItems = [].slice.call(nav.querySelectorAll('.link--page')),
		//All the Dot Sidebar Items
		dotnav = document.querySelector('.dotNav'),
		// All the individual dots
		sideNavItems = [].slice.call(dotnav.querySelectorAll('.dNav')),
		//other items I want to keep an eye on 
		header = document.querySelectorAll('.bp-header'),
		// All the individual dots
		arrowItems = document.querySelectorAll('.dwn-arrow'),
		// the grid
		grid = document.querySelector('.grid'),
		// the grid items
		gridItems = [].slice.call(grid.querySelectorAll('.grid__item')),
		//the logo
		logo = document.querySelector('#logo'),
		// the header
		bghead = document.querySelector('.header'),
		// check if menu is open
		isMenuOpen = false;
		

	function init() {
		buildStack();
		initEvents();
	}

	function buildStack() {
		var stackPagesIdxs = getStackPagesIdxs();

		// set z-index, opacity, initial transforms to pages and add class page--inactive to all except the current one
		for(var i = 0; i < pagesTotal; ++i) {
			var page = pages[i],
				posIdx = stackPagesIdxs.indexOf(i);
			var arrow = arrowItems[i];

			if( current !== i ) {
				classie.add(page, 'page--inactive');
				header[i].style.display ="none";
				
					if( posIdx !== -1 ) {
						// visible pages in the stack
						page.style.WebkitTransform = 'translate3d(0,100%,0)';
						page.style.transform = 'translate3d(0,100%,0)';
					}
					/*
					page.style.transitionDuration = '0.6s';
						page.style.WebkitTransitionDuration= '0.6s';
						page.style.TransitionTimingFunction ='ease-in-out';
						page.style.WebkitTransitionTimingFunction = 'ease-in-out';
					*/
				else {
					// invisible pages in the stack
					page.style.WebkitTransform = 'translate3d(0,75%,-300px)';
					page.style.transform = 'translate3d(0,75%,-300px)';
				}
			}
			else {
				classie.remove(page, 'page--inactive');
				header[i].style.display ="inherit";
			}

			page.style.zIndex = i < current ? parseInt(current - i) : parseInt(pagesTotal + current - i);
			
			if( posIdx !== -1 ) {
				page.style.opacity = parseFloat(1 - 0.1 * posIdx);
			}
			else {
				page.style.opacity = 0;
			}
		}
	}

	// event binding
	function initEvents() {
		// menu button click
		menuCtrl.addEventListener('click', toggleMenu);

		// navigation menu clicks
		navItems.forEach(function(item) {
			// which page to open?
			var pageid = item.getAttribute('href').slice(1);
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				openPage(pageid);
			});
		});

		// navigation dot clicks
		sideNavItems.forEach(function(item) {
			var i = 0;
			// which page to open?
			var pageid = item.getAttribute('href').slice(1);
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				openPage(pageid);
			});
		});

		// Clicking the Grid Items and opening the corresponding page
		gridItems.forEach(function(item) {
			// which page to open?
			var pageid = item.getAttribute('href').slice(1);
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				openPage(pageid);
			});
		});

		// clicking on a page when the menu is open triggers the menu to close again and open the clicked page
		pages.forEach(function(page) {
			var pageid = page.getAttribute('id');
			page.addEventListener('click', function(ev) {
				if( isMenuOpen ) {
					ev.preventDefault();
					openPage(pageid);
				}
			});
		});

		// navigation dot clicks
		pages.forEach(function(page) {
			// which page to open?
			var i = 0;
			var pageid = arrowItems[i].getAttribute('href').slice(1);
			var item = arrowItems[i];

			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				openPage(pageid);
			});

			//make the Down Arrow shake
			item.addEventListener('mouseover', function(ev) {
				classie.remove(this, 'slideInUp');
				classie.add(this, 'shake');
			});

			item.addEventListener('mouseout', function(ev) {
				classie.remove(this, 'shake');
				classie.add(this, 'slideInUp');
			});
		});

		// keyboard navigation events
		document.addEventListener( 'keydown', function( ev ) {
			var keyCode = ev.keyCode || ev.which;
			if( keyCode === 40 ) {
				ev.preventDefault();
				changePage();
			}
		});

		//opening the first page
		logo.addEventListener('click', function(ev) {
			var pageid = logo.getAttribute('href').slice(1);
				ev.preventDefault();
				openPage(pageid);
		});

		// Click on Down arrow
		/*dwnarrow.addEventListener('click', function( ev ) {
		});*/
	}

	// toggle menu fn
	function toggleMenu() {
		if( isMenuOpen ) {
			closeMenu();
		}
		else {
			openMenu();
			isMenuOpen = true;
		}
	}

	// opens the menu
	function openMenu() {
		// toggle the menu button
		classie.add(menuCtrl, 'menu-button--open')
		// stack gets the class "pages-stack--open" to add the transitions
		classie.add(stack, 'pages-stack--open');
		// reveal the menu
		classie.add(nav, 'pages-nav--open');
		//hide the background of the header
		classie.add(bghead, 'bhck');

		//classie.add(head, 'hide');

		// now set the page transforms
		var stackPagesIdxs = getStackPagesIdxs();
		for(var i = 0, len = stackPagesIdxs.length; i < len; ++i) {
			var page = pages[stackPagesIdxs[i]];
			page.style.WebkitTransform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50*i) + 'px)'; // -200px, -230px, -260px
			page.style.transform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50*i) + 'px)';
		}
	}

	// function for the animation of the pages when transitioning the page

	// closes the menu
	function closeMenu() {
		// same as opening the current page again
		openPage();
	}

	// opens a page
	function openPage(id) {

		openMenu();

		var futurePage = id ? document.getElementById(id) : pages[current],
			futureCurrent = pages.indexOf(futurePage),
			stackPagesIdxs = getStackPagesIdxs(futureCurrent);

		// set transforms for the new current page
		futurePage.style.WebkitTransform = 'translate3d(0, 0, 0)';
		futurePage.style.transform = 'translate3d(0, 0, 0)';
		futurePage.style.opacity = 1;
		
	
		// set transforms for the other items in the stack
		for(var i = 0, len = stackPagesIdxs.length; i < len; ++i) {
			var page = pages[stackPagesIdxs[i]];
			page.style.WebkitTransform = 'translate3d(0,100%,0)';
			page.style.transform = 'translate3d(0,100%,0)';
			page.style.WebkitTransitionDelay = '0.8s';
			page.style.TransitionDelay = '0.8s';
		}

		// set current
		if( id ) {
			current = futureCurrent;
		}
		
		// close menu..
		classie.remove(menuCtrl, 'menu-button--open');
		classie.remove(nav, 'pages-nav--open');
		classie.remove(bghead, 'bhck');

		//Transition the content
		onEndTransition(futurePage, function() {
			buildStack();
			classie.remove(stack, 'pages-stack--open');
			isMenuOpen = false;
		});
	}


	function openNextPage() {
	}

	// gets the current stack pages indexes. If any of them is the excludePage then this one is not part of the returned array
	function getStackPagesIdxs(excludePageIdx) {
		var nextStackPageIdx = current + 1 < pagesTotal ? current + 1 : 0,
			nextStackPageIdx_2 = current + 2 < pagesTotal ? current + 2 : 1,
			idxs = [],

			excludeIdx = excludePageIdx || -1;

		if( excludePageIdx != current ) {
			idxs.push(current);
		}
		if( excludePageIdx != nextStackPageIdx ) {
			idxs.push(nextStackPageIdx);
		}
		if( excludePageIdx != nextStackPageIdx_2 ) {
			idxs.push(nextStackPageIdx_2);
		}

		return idxs;
	}

	init();

})(window);