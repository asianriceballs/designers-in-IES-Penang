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
		//Body Tag
		bd = document.getElementsByTagName("body"),
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
		//other items I want to keep an eye on 
		header = document.querySelectorAll('.bp-header'),
		// All the individual dots
		arrow = document.querySelector('.click-to-learn-more'),
		// the grid
		grid = document.querySelector('.grid'),
		// the grid items
		gridItems = [].slice.call(grid.querySelectorAll('.grid__item')),
		// the page ingredients
		ingredients = document.querySelector('#page-ingredients'),
		// Page Ingredients individual ones
		hpg = [].slice.call(ingredients.querySelectorAll('.hpg')),
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
		teamsingle = [].slice.call(team.querySelectorAll('.single')),	
		//the login button
		loginbtn = document.querySelector('.login-btn'),
		// the close button in the login box icon-close
		closebtn = document.querySelector('#iclose'),
		// the close ingredients button
		closeingredients = document.querySelector('.close-ingredients'),
		// click next button
		clicknext = document.querySelector('.click-next'),
		// click prev
		clickprev = document.querySelector('.click-prev'),
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
		//buildStack();
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
				
					if( posIdx !== -1 ) {
						// visible pages in the stack
						page.style.WebkitTransform = 'translate3d(0,100%,0)';
						page.style.transform = 'translate3d(0,100%,0)';
						page.style.transitionDuration = '0.5s';
						page.style.WebkitTransitionDuration= '0.5.s';
					}
					
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
		/*  navigation menu clicks
		navItems.forEach(function(item) {
			// which page to open?
			var pageid = item.getAttribute('href').slice(1);
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				openPage(pageid);
			});
		});*/

		// Clicking the Grid Items and opening the corresponding page
		/*gridItems.forEach(function(item) {
			// which page to open?
			var pageid = item.getAttribute('href').slice(1);
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				og.style.marginLeft ="-100%";
				//openPage(pageid);
			});
		});*/

		// clicking on a page when the menu is open triggers the menu to close again and open the clicked page
		/*pages.forEach(function(page) {
			var pageid = page.getAttribute('id');
			page.addEventListener('click', function(ev) {
				if( isMenuOpen ) {
					ev.preventDefault();
					openPage(pageid);
				}
			});
		});*/

		/*pages.forEach(function(page) {
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
		});*/

		// keyboard navigation events
		/*document.addEventListener( 'keydown', function( ev ) {
			var keyCode = ev.keyCode || ev.which;
			if( keyCode === 40 ) {
				ev.preventDefault();
				openNextPage();
			}
			if( keyCode === 38 ) {
				ev.preventDefault();
				openPreviousPage();
			}
		});*/
		
		//opening the first page
		logo.addEventListener('click', function(ev) {
			var pageid = logo.getAttribute('href').slice(1);
				ev.preventDefault();
				
		});
		
		// the rotating dots
		teamdots.forEach(function(item) {
				tooltip[0].addEventListener('mouseover' , function( ev ) {
					classie.remove (this, 'rtipbk');
					classie.add (this, 'rtip90');
					teamsingle[0].style.display = "inherit";
				});
				
				tooltip[0].addEventListener('mouseout', function(ev) {
					classie.remove (this, 'rtip90');
					classie.add (this, 'rtipbk');
					teamsingle[0].style.display = "none";
				});
				//
				tooltip[1].addEventListener('mouseover' , function( ev ) {
					classie.remove (this, 'rtipbk');
					classie.add (this, 'rtip90');
					teamsingle[1].style.display = "inherit";
				});
				
				tooltip[1].addEventListener('mouseout', function(ev) {
					classie.remove (this, 'rtip90');
					classie.add (this, 'rtipbk');
					teamsingle[1].style.display = "none";
				});
				//
				tooltip[2].addEventListener('mouseover' , function( ev ) {
					classie.remove (this, 'rtipbk');
					classie.add (this, 'rtip90');
					teamsingle[2].style.display = "inherit";
				});
				
				tooltip[2].addEventListener('mouseout', function(ev) {
					classie.remove (this, 'rtip90');
					classie.add (this, 'rtipbk');
					teamsingle[2].style.display = "none";
				});
				//
				tooltip[3].addEventListener('mouseover' , function( ev ) {
					classie.remove (this, 'rtipbk');
					classie.add (this, 'rtip90');
					teamsingle[3].style.display = "inherit";
				});
				
				tooltip[3].addEventListener('mouseout', function(ev) {
					classie.remove (this, 'rtip90');
					classie.add (this, 'rtipbk');
					teamsingle[3].style.display = "none";
				});
				//
				tooltip[4].addEventListener('mouseover' , function( ev ) {
					classie.remove (this, 'rtipbk');
					classie.add (this, 'rtip90');
					teamsingle[4].style.display = "inherit";
				});
				
				tooltip[4].addEventListener('mouseout', function(ev) {
					classie.remove (this, 'rtip90');
					classie.add (this, 'rtipbk');
					teamsingle[4].style.display = "none";
				});
				//
				tooltip[5].addEventListener('mouseover' , function( ev ) {
					classie.remove (this, 'rtipbk');
					classie.add (this, 'rtip90');
					teamsingle[5].style.display = "inherit";
				});
				
				tooltip[5].addEventListener('mouseout', function(ev) {
					classie.remove (this, 'rtip90');
					classie.add (this, 'rtipbk');
					teamsingle[5].style.display = "none";
				});
				//
				tooltip[6].addEventListener('mouseover' , function( ev ) {
					classie.remove (this, 'rtipbk');
					classie.add (this, 'rtip90');
					teamsingle[6].style.display = "inherit";
				});
				
				tooltip[6].addEventListener('mouseout', function(ev) {
					classie.remove (this, 'rtip90');
					classie.add (this, 'rtipbk');
					teamsingle[6].style.display = "none";
				});
				//
				tooltip[7].addEventListener('mouseover' , function( ev ) {
					classie.remove (this, 'rtipbk');
					classie.add (this, 'rtip90');
					teamsingle[7].style.display = "inherit";
				});
				
				tooltip[7].addEventListener('mouseout', function(ev) {
					classie.remove (this, 'rtip90');
					classie.add (this, 'rtipbk');
					teamsingle[7].style.display = "none";
				});
				//
				tooltip[8].addEventListener('mouseover' , function( ev ) {
					classie.remove (this, 'rtipbk');
					classie.add (this, 'rtip90');
					teamsingle[8].style.display = "inherit";
				});
				
				tooltip[8].addEventListener('mouseout', function(ev) {
					classie.remove (this, 'rtip90');
					classie.add (this, 'rtipbk');
					teamsingle[8].style.display = "none";
				});
				//
				tooltip[9].addEventListener('mouseover' , function( ev ) {
					classie.remove (this, 'rtipbk');
					classie.add (this, 'rtip90');
					teamsingle[9].style.display = "inherit";
				});
				
				tooltip[9].addEventListener('mouseout', function(ev) {
					classie.remove (this, 'rtip90');
					classie.add (this, 'rtipbk');
					teamsingle[9].style.display = "none";
				});
				//
				tooltip[10].addEventListener('mouseover' , function( ev ) {
					classie.remove (this, 'rtipbk');
					classie.add (this, 'rtip90');
					teamsingle[10].style.display = "inherit";
				});
				
				tooltip[10].addEventListener('mouseout', function(ev) {
					classie.remove (this, 'rtip90');
					classie.add (this, 'rtipbk');
					teamsingle[10].style.display = "none";
				});
		});
		
		/* loginbutton interaction 
		loginbtn.addEventListener('click', function(ev) {
			classie.add(bghead, 'heightfix');
		});
		/* Close button 
		closebtn.addEventListener('click', function(ev) {
			classie.remove(bghead, 'heightfix');
		});
		*/

		/* Trying the Horizontal Scroll thingy */
		/*ione.addEventListener('click', function(ev) {
			og.style.display = "none";
			ag.style.MarginRight = "0";
			ag.style.display ="inherit";
			classie.remove(closeingredients, 'cdisnone');
			classie.remove(clicknext, 'cdisnone');
			classie.remove(clickprev, 'cdisnone');
		});
		
		itwo.addEventListener('click', function(ev) {
			og.style.display = "none";
			bg.style.MarginRight = "0";
			bg.style.display ="inherit";
			classie.remove(closeingredients, 'cdisnone');
			classie.remove(clicknext, 'cdisnone');
			classie.remove(clickprev, 'cdisnone');
		});
		
		ithree.addEventListener('click', function(ev) {
			og.style.display = "none";
			cg.style.MarginRight = "0";
			cg.style.display ="inherit";
			classie.remove(closeingredients, 'cdisnone');
			classie.remove(clicknext, 'cdisnone');
			classie.remove(clickprev, 'cdisnone');
		});
		
		ifour.addEventListener('click', function(ev) {
			og.style.display = "none";
			dg.style.MarginRight = "0";
			dg.style.display ="inherit";
			classie.remove(closeingredients, 'cdisnone');
			classie.remove(clicknext, 'cdisnone');
			classie.remove(clickprev, 'cdisnone');
		});
		
		closeingredients.addEventListener('click', function(ev) {
			closeIngredients();
		});*/
		
		/*document.addEventListener("mousewheel", mouseWheeling, false);
		document.addEventListener("DOMMouseScroll", mouseWheeling, false);*/
		
		/*function mouseWheeling(e) {
			var scrollDirection = e.wheelDelta || -1 * e.detail;
		 
			if (scrollDirection > 0) {
				openPreviousPage();
			} else {
				openNextPage();
			}
		}*/
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
		// reveal the menu
		classie.add(nav, 'pages-nav--open');
		//hide the background of the header
		classie.add(bghead, 'bhck');

		//classie.add(head, 'hide');

		// now set the page transforms
		var stackPagesIdxs = getStackPagesIdxs();
		//for(var i = 0, len = stackPagesIdxs.length; i < len; ++i) {
			var i;
			var page = pages[stackPagesIdxs[i]];
			page.style.WebkitTransform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50*i) + 'px)'; // -200px, -230px, -260px
			page.style.transform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50*i) + 'px)';
		//}
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
	
		/*var futurePage = id ? document.getElementById(id) : pages[current],
			futureCurrent = pages.indexOf(futurePage),
			stackPagesIdxs = getStackPagesIdxs(futureCurrent);*/

		// set transforms for the new current page
		futurePage.style.WebkitTransform = 'translate3d(0, 0, 0)';
		futurePage.style.transform = 'translate3d(0, 0, 0)';
		futurePage.style.opacity = 1;
		
	
		/* set transforms for the other items in the stack
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
		}*/
		
		// close menu..
		classie.remove(menuCtrl, 'menu-button--open');
		classie.remove(nav, 'pages-nav--open');
		classie.remove(bghead, 'bhck');

		//Transition the content
		onEndTransition(futurePage, function() {
			//buildStack();
			//showArrow();
			//classie.remove(stack, 'pages-stack--open');
			isMenuOpen = false;
		});
	}
	
	
	/*function openPreviousPage() {
		var i = current-1;
		var page = pages[i];
		var pageid = page.getAttribute('id');
		openPage(pageid);
	}*/
	
	/*function openNextIngredient() {
		var i = -1;
		var page = pages[i];
		var pageid = page.getAttribute('id');
		openPage(pageid);
	}*/
	
	/*function closeIngredients () {
		og.style.display = "inherit";
		og.style.marginLeft = "0";
		ag.style.MarginRight = "200%";
		ag.style.display ="none";
		bg.style.MarginRight = "300%";
		bg.style.display ="none";
		cg.style.MarginRight = "400%";
		cg.style.display ="none";
		dg.style.MarginRight = "500%";
		dg.style.display ="none";
		// the close icon 
		classie.add(closeingredients, 'cdisnone');
		classie.add(clicknext, 'cdisnone');
		classie.add(clickprev, 'cdisnone');
	}*/

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