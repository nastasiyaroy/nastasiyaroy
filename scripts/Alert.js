import { PageScroll } from './PageScroll.js';

const pageScroll = new PageScroll();
export class Alert {
	isOpen = false;

	constructor(options = {}) {
		this.options = options;
		this.modal = document.querySelector(this.options.selector);
		this.pageScroll = pageScroll;
		this.dismissButtons = [...this.modal.querySelectorAll(`[data-dismiss="${this.options.selector.slice(1)}"]`)];
	}

	openModal = () => {
		if (this.isOpen) {
			return;
		}

		const scrollWidth = this.pageScroll.lockPage();

		this.modal.style.paddingRight = `${scrollWidth}px`;
		this.modal.setAttribute('role', 'dialog');

		this.modalContent = this.modal.querySelector('.modal__content');
		this.modal.style.display = 'block';
		this.modal.style.display = getComputedStyle(this.modal).display;
		this.modal.classList.add('modal--show');

		this.modalContent.addEventListener('click', this.modalContentClickHandler);
		this.isOpen = true;
	};

	closeModal = () => {
		if (!this.isOpen) {
			return;
		}

		this.modalContent.removeEventListener('click', this.modalContentClickHandler);
		this.modal.classList.remove('modal--show');

		const transitionendHandler = () => {
			this.modal.style.display = 'none';
			this.modal.style.removeProperty('padding-right');
			this.modal.removeAttribute('role', 'dialog');
			this.isOpen = false;
			this.pageScroll.unlockPage();
		};

		this.modal.addEventListener('transitionend', transitionendHandler, { once: true });
	};

	// eslint-disable-next-line class-methods-use-this
	modalContentClickHandler = (event) => {
		event.stopPropagation();
	};
}
