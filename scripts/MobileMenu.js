import { createFocusTrap } from '../libs/focus-trap/focus-trap.js';
import { PageScroll } from './PageScroll.js';

const pageScroll = new PageScroll();

export class MobileMenu {
	isOpen = false;

	constructor(selector) {
		this.menuWrapper = document.querySelector(selector);
		this.menuButtonOpen = this.menuWrapper.querySelector('.nav__burger');
		this.menuButtonClose = this.menuWrapper.querySelector('.nav__close');
		this.menuListWrapper = this.menuWrapper.querySelector('.nav__list-wrapper');
		this.menuLinks = this.menuWrapper.querySelectorAll('.nav__link');
		this.pageScroll = pageScroll;
	}

	run = () => {
		this.menuFocusTrap = createFocusTrap(this.menuListWrapper, {
			onDeactivate: () => {
				this.closeMenu();
			},
			initialFocus: () => this.menuListWrapper,
		});
		this.menuButtonOpen.addEventListener('click', this.openMenu);
		this.menuButtonClose.addEventListener('click', this.menuFocusTrap.deactivate);
		this.menuLinks.forEach((link) => {
			link.addEventListener('click', (event) => {
				event.preventDefault();
				this.menuFocusTrap.deactivate();
			});
		});
	};

	openMenu = () => {
		if (this.isOpen) {
			return;
		}

		this.pageScroll.lockPage();
		this.menuWrapper.classList.add('nav--open');
		this.menuFocusTrap.activate();
		this.isOpen = true;
	};

	closeMenu = () => {
		if (!this.isOpen) {
			return;
		}

		const transitionendHandler = (event) => {
			if (!event.target.classList.contains('nav__list-wrapper')) {
				return;
			}
			this.menuListWrapper.removeEventListener('transitionend', transitionendHandler);

			this.isOpen = false;
			this.pageScroll.unlockPage();
		};

		this.menuListWrapper.addEventListener('transitionend', transitionendHandler);
		this.menuWrapper.classList.remove('nav--open');
	};
}
