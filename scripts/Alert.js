import { PageScroll } from './PageScroll.js';

export class Alert {
	constructor(options = {}) {
		this.options = options;
		this.isOpen = false;
		this.modal = document.querySelector(this.options.alertSelector);
		this.pageScroll = new PageScroll();
	}

	openModal = () => {
		if (this.isOpen) {
			return;
		}

		const scrollWidth = this.pageScroll.lockPage();

		this.modal.style.paddingRight = `${scrollWidth}px`;
		this.modal.setAttribute('role', 'dialog');

		this.dismissButtons = [
			...this.modal.querySelectorAll(`[data-dismiss="${this.options.alertSelector.slice(1)}"]`),
		];
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
			this.modal.removeEventListener('transitionend', transitionendHandler);
			this.modal.style.removeProperty('padding-right');
			this.modal.removeAttribute('role', 'dialog');
			this.isOpen = false;
			this.pageScroll.unlockPage();
		};

		this.modal.addEventListener('transitionend', transitionendHandler);
	};

	// eslint-disable-next-line class-methods-use-this
	modalContentClickHandler = (event) => {
		event.stopPropagation();
	};
}
