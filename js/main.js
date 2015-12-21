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
		// All the list elements
		liItems = [].slice.call(dotnav.querySelectorAll('li')),
		// All the individual dots
		sideNavItems = [].slice.call(dotnav.querySelectorAll('.dNav')),
		//other items I want to keep an eye on 
		header = document.querySelectorAll('.bp-header'),
		// All the individual dots
		arrow = document.querySelector('.click-to-learn-more'),
		// the grid
		grid = document.querySelector('.grid'),
		// the grid items
		gridItems = [].slice.call(grid.querySelectorAll('.grid__item')),
		//the logo
		logo = document.querySelector('#logo'),
		// the header
		bghead = document.querySelector('.header'),
		//the dot in the team section 
		team = document.querySelector('.team'),
		// team dots
		teamdots = [].slice.call(team.querySelectorAll('.team-dot')),
		// tooltip dot
		tooltip = document.querySelectorAll('.tooltip-dot'),
		// the close button in the login box icon-close
		teamsingle = [].slice.call(team.querySelectorAll('.team-dot.single')),	
		//the login button
		loginbtn = document.querySelector('.login-btn'),
		// the close button in the login box icon-close
		closebtn = document.querySelector('.icon-close'),
		og = document.querySelector('#og'),
		ag = document.querySelector('#oneg'),
		bg = document.querySelector('#twog'),
		cg = document.querySelector('#threeg'),
		dg = document.querySelector('#fourg'),
		//ingredients
		ione = document.querySelector('#ingredient1'),
		itwo = document.querySelector('#ingredient2'),
		ithree = document.querySelector('#ingredient3'),
		ifour = document.querySelector('#ingredient4'),
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

			if( current !== i ) {
				classie.add(page, 'page--inactive');
				header[i].style.display ="none";
				
					if( posIdx !== -1 ) {
						// visible pages in the stack
						page.style.WebkitTransform = 'translate3d(0,100%,0)';
						page.style.transform = 'translate3d(0,100%,0)';
						page.style.transitionDuration = '0.5s';
						page.style.WebkitTransitionDuration= '0.5.s';
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
					page.style.transitionDuration = '0.5s';
					page.style.WebkitTransitionDuration= '0.5.s';
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
			var i = current;
			var page = pages[i];
			var pg = page.getAttribute('id');
			var dt = item.getAttribute('href').slice(1);
			// which page to open?
			var pageid = item.getAttribute('href').slice(1);
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				openPage(pageid);
			});
			
			if (pg == dt) {
				classie.add(item, 'current');
			}
			else {
				classie.remove(item, 'current');
			}
		});

		// Clicking the Grid Items and opening the corresponding page
		gridItems.forEach(function(item) {
			// which page to open?
			var pageid = item.getAttribute('href').slice(1);
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				classie.remove(item,'fadeInRight');
				classie.add(item,'fadeOutLeft');
				//openPage(pageid);
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

		pages.forEach(function(page) {
			var pageid = page.getAttribute('id');
			
			var item = arrow;

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
				openNextPage();
			}
			if( keyCode === 38 ) {
				ev.preventDefault();
				openPreviousPage();
			}
		});
		
		//opening the first page
		logo.addEventListener('click', function(ev) {
			var pageid = logo.getAttribute('href').slice(1);
				ev.preventDefault();
				openPage(pageid);
		});

		// Click on Down arrow
		arrow.addEventListener('click', function( ev ) {
			ev.preventDefault();
			openNextPage();
		});
		
		// the rotating dots
		teamdots.forEach(function(item) {
			for(var i = 0; i < 11; ++i) {
				tooltip[i].addEventListener('mouseover' , function( ev ) {
					classie.remove (this, 'rtipbk');
					classie.add (this, 'rtip90');
				});
				
				tooltip[i].addEventListener('mouseout', function(ev) {
					classie.remove (this, 'rtip90');
					classie.add (this, 'rtipbk');
				});
			}
		});
		
		/* Close button */
		closebtn.addEventListener('click', function(ev) {
			bghead.style.height = '5em';
		});
		
		/* loginbutton interaction */
		loginbtn.addEventListener('click', function(ev) {
			bghead.style.height = '100%';
		});
		
		/* Trying the Horizontal Scroll thingy */
			
		ione.addEventListener('click', function(ev) {
			og.style.display = "none";
			ag.style.MarginRight = "0";
			ag.style.display ="inherit";
		});
		
		itwo.addEventListener('click', function(ev) {
			og.style.display = "none";
			bg.style.MarginRight = "0";
			bg.style.display ="inherit";
		});
		
		ithree.addEventListener('click', function(ev) {
			og.style.display = "none";
			cg.style.MarginRight = "0";
			cg.style.display ="inherit";
		});
		
		ifour.addEventListener('click', function(ev) {
			og.style.display = "none";
			dg.style.MarginRight = "0";
			dg.style.display ="inherit";
		});
		
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
		classie.add(menuCtrl, 'menu-button--open');
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

	function openAnim(id) {
		// now set the page transforms
		var stackPagesIdxs = getStackPagesIdxs();
		for(var i = 0, len = stackPagesIdxs.length; i < len; ++i) {
			var page = pages[stackPagesIdxs[i]];
			page.style.WebkitTransform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50*i) + 'px)'; // -200px, -230px, -260px
			page.style.transform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50*i) + 'px)';
			/*
			-webkit-transition-duration: '1.2s';
    		transition-duration: '1.2s'; */
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

		openAnim();
	
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
		var i = current+1;
		var page = pages[i];
		var pageid = page.getAttribute('id');
		openPage(pageid);
	}
	
	function openPreviousPage() {
		var i = current-1;
		var page = pages[i];
		var pageid = page.getAttribute('id');
		openPage(pageid);
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