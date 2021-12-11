import { createFocusTrap } from '../libs/focus-trap.js';
import { lockPage, unlockPage } from './utils.js';

export class Modal {
	constructor() {
		this.isOpen = false;
		this.toggleList = [...document.querySelectorAll('[data-toggle="modal"]')];
	}

	run = () => {
		this.toggleList.forEach((toggle) => {
			toggle.addEventListener('click', this.openModal);
		});
	};

	openModal = (event) => {
		if (this.isOpen) {
			return;
		}

		const scrollWidth = lockPage();
		const { target } = event;
		const modalSelector = target.dataset.target;

		this.modal = document.querySelector(modalSelector);
		this.modal.style.paddingRight = `${scrollWidth}px`;
		this.modal.setAttribute('role', 'dialog');
		this.modalFocusTrap = createFocusTrap(this.modal, {
			onDeactivate: () => {
				this.closeModal();
			},
		});
		this.dismissButtons = [...this.modal.querySelectorAll(`[data-dismiss="${modalSelector.slice(1)}"]`)];
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
			this.modal = null;
			this.modalFocusTrap = null;
			this.dismissButtons = null;
			this.isOpen = false;
			unlockPage();
		};

		this.modal.addEventListener('transitionend', transitionendHandler);
	};

	// eslint-disable-next-line class-methods-use-this
	modalContentClickHandler = (event) => {
		event.stopPropagation();
	};
}
