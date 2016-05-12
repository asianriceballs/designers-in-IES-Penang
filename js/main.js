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
		// the menu on the home page
		menuCtrl2 = document.querySelector('#mnbtn2'),
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

	// event binding
	function initEvents() {
		// menu button click
		menuCtrl.addEventListener('click', toggleMenu);
		// home menu button click
		menuCtrl2.addEventListener('click', toggleMenu);
		
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
		// toggle the menu button
		classie.add(menuCtrl2, 'menu-button--open');
		// reveal the menu
		classie.add(nav, 'pages-nav--open');
		//hide the background of the header
		classie.add(bghead, 'bhck');
		// show the menu
		classie.add(stack, 'hide');
	}

	// closes the menu
	function closeMenu() {
		// same as opening the current page again
		openPage();
	}

	// opens a page
	function openPage(id) {
		// close menu..
		classie.remove(menuCtrl, 'menu-button--open');
		classie.remove(menuCtrl2, 'menu-button--open');
		classie.remove(nav, 'pages-nav--open');
		classie.remove(bghead, 'bhck');
		classie.remove(stack, 'hide');
		isMenuOpen = false;

	}
	
	init();

})(window);