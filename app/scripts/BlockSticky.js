import { throttle } from './utils.js';

export class BlockSticky {
	constructor(options = {}) {
		this.options = options;
	}

	run = () => {
		this.block = document.querySelector(this.options.selector);
		window.addEventListener('scroll', throttle(this.scrollHandler, this.options.throttle), {
			passive: true,
		});
		this.scrollHandler();
	};

	scrollHandler = () => {
		const { offset, classShow } = this.options;

		if (window.pageYOffset > offset) {
			this.block.classList.add(classShow);
		} else if (this.block.classList.contains(classShow)) {
			this.block.classList.remove(classShow);
		}
	};
}
