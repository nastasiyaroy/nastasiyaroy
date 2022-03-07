import { createFocusTrap } from '../libs/focus-trap/focus-trap.js';
import { PageScroll } from './PageScroll.js';

const pageScroll = new PageScroll();

export class Modal {
	isOpen = false;

	constructor(options = {}) {
		this.pageScroll = pageScroll;
		this.options = options;
		this.toggleList = [...document.querySelectorAll(this.options.toggleSelector)];
		this.modal = document.querySelector(this.options.modalSelector);
		this.dismissButtons = [
			...this.modal.querySelectorAll(`[data-dismiss="${this.options.modalSelector.slice(1)}"]`),
		];
	}

	run = () => {
		this.toggleList.forEach((toggle) => {
			toggle.addEventListener('click', this.openModal);
		});

		this.modalFocusTrap = createFocusTrap(this.modal, {
			onDeactivate: () => {
				this.closeModal();
			},
			initialFocus: () => this.modal,
		});

		this.dismissButtons.forEach((buttons) => {
			buttons.addEventListener('click', this.modalFocusTrap.deactivate);
		});
	};

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

		this.modal.addEventListener('click', this.modalFocusTrap.deactivate);
		this.modalContent.addEventListener('click', this.modalContentClickHandler);
		this.modalFocusTrap.activate();
		this.isOpen = true;
	};

	closeModal = () => {
		if (!this.isOpen) {
			return;
		}

		this.modal.classList.remove('modal--show');

		const transitionendHandler = () => {
			this.modal.removeEventListener('click', this.modalFocusTrap.deactivate);
			this.modalContent.removeEventListener('click', this.modalContentClickHandler);
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
