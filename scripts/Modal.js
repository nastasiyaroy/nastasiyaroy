import { createFocusTrap } from '../libs/focus-trap.js';

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

		const { target } = event;
		const modalSelector = target.dataset.target;
		this.modal = document.querySelector(modalSelector);
		this.modalFocusTrap = createFocusTrap(this.modal, {
			onDeactivate: () => {
				this.closeModal();
			},
		});
		this.dismissButtons = [...this.modal.querySelectorAll('[data-dismiss="modal"]')];
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
			buttons.removeEventListener('click', this.closeModal);
		});
		this.modal.removeEventListener('click', this.modalOverlayClickHandler);
		this.modalContent.removeEventListener('click', this.modalContentClickHandler);
		this.modal.classList.remove('modal--show');

		const transitionendHandler = () => {
			this.modal.style.display = 'none';
			this.modal.removeEventListener('transitionend', transitionendHandler);
			this.modal = null;
			this.modalFocusTrap = null;
			this.isOpen = false;
		};

		this.modal.addEventListener('transitionend', transitionendHandler);
	};

	modalOverlayClickHandler = () => {
		this.closeModal();
	};

	// eslint-disable-next-line class-methods-use-this
	modalContentClickHandler = (event) => {
		event.stopPropagation();
	};
}
