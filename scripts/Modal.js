import { createFocusTrap } from '../libs/focus-trap/focus-trap.js';
import { PageScroll } from './PageScroll.js';

export class Modal {
	constructor(options = {}) {
		this.options = options;
		this.isOpen = false;
		this.toggleList = options?.toggleSelector ? [...document.querySelectorAll(this.options.toggleSelector)] : [];
		this.modal = document.querySelector(this.options.modalSelector);
		this.pageScroll = new PageScroll();
	}

	run = () => {
		this.toggleList.forEach((toggle) => {
			toggle.addEventListener('click', this.openModal.bind(this, toggle.dataset.target));
		});
	};

	openModal = () => {
		if (this.isOpen) {
			return;
		}

		this.modalFocusTrap = createFocusTrap(this.modal, {
			onDeactivate: () => {
				this.closeModal();
			},
		});

		const scrollWidth = this.pageScroll.lockPage();

		this.modal.style.paddingRight = `${scrollWidth}px`;
		this.modal.setAttribute('role', 'dialog');

		this.dismissButtons = [
			...this.modal.querySelectorAll(`[data-dismiss="${this.options.modalSelector.slice(1)}"]`),
		];
		this.modalContent = this.modal.querySelector('.modal__content');
		this.modal.style.display = 'block';
		this.modal.style.display = getComputedStyle(this.modal).display;
		this.modal.classList.add('modal--show');

		this.dismissButtons.forEach((buttons) => {
			buttons.addEventListener('click', this.modalFocusTrap.deactivate);
		});

		this.modal.addEventListener('click', this.modalFocusTrap.deactivate);
		this.modalContent.addEventListener('click', this.modalContentClickHandler);
		this.modalFocusTrap.activate();
		this.isOpen = true;
	};

	closeModal = () => {
		if (!this.isOpen) {
			return;
		}

		this.dismissButtons.forEach((buttons) => {
			buttons.removeEventListener('click', this.modalFocusTrap.deactivate);
		});

		this.modal.removeEventListener('click', this.modalFocusTrap.deactivate);
		this.modalContent.removeEventListener('click', this.modalContentClickHandler);
		this.modal.classList.remove('modal--show');

		const transitionendHandler = () => {
			this.modal.style.display = 'none';
			this.modal.removeEventListener('transitionend', transitionendHandler);
			this.modal.style.removeProperty('padding-right');
			this.modal.removeAttribute('role', 'dialog');
			this.isOpen = false;
			this.modalFocusTrap = null;
			this.pageScroll.unlockPage();
		};

		this.modal.addEventListener('transitionend', transitionendHandler);
	};

	// eslint-disable-next-line class-methods-use-this
	modalContentClickHandler = (event) => {
		event.stopPropagation();
	};
}
