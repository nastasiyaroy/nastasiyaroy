import { Singleton } from './Singleton.js';

export class PageScroll extends Singleton {
	pageLookElements = [];

	scrollWidth = 0;

	lockCount = 0;

	lockPage = () => {
		this.lockCount += 1;

		if (this.lockCount > 1) {
			return this.scrollWidth;
		}

		this.scrollWidth = window.innerWidth - document.documentElement.clientWidth;
		document.documentElement.classList.add('page--lock');
		this.pageLookElements = [...document.querySelectorAll('[data-fixed]'), document.documentElement];
		this.pageLookElements.forEach((element) => {
			const { paddingRight } = getComputedStyle(element);
			element.style.paddingRight = `${Number.parseFloat(paddingRight) + this.scrollWidth}px`;
		});

		return this.scrollWidth;
	};

	unlockPage = () => {
		this.lockCount -= 1;

		if (this.lockCount >= 1) {
			return;
		}

		document.documentElement.classList.remove('page--lock');
		this.pageLookElements.forEach((element) => {
			const { paddingRight } = getComputedStyle(element);
			element.style.paddingRight = `${Number.parseFloat(paddingRight) - this.scrollWidth}px`;
		});
	};
}
