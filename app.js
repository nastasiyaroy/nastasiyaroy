import { MobileMenu } from './scripts/MobileMenu.js';
import { BlockSticky } from './scripts/BlockSticky.js';
import { setVh } from './scripts/utils.js';
import './scripts/button-top.js';
import './scripts/header-form.js';
import './scripts/submenu.js';
import './scripts/sliders.js';
import './scripts/modals/order-modal.js';
import './scripts/modals/price-modal.js';
import './scripts/modals/calc-modal.js';
import './scripts/modals/call-modal.js';

setVh();

const mobileMenu = new MobileMenu('.nav');
mobileMenu.run();
const mobileMenuSticky = new MobileMenu('.nav--sticky');
mobileMenuSticky.run();

const headerTopSticky = new BlockSticky({
	selector: '.header__top--sticky',
	classShow: 'header__top--show',
	offset: 170,
	throttle: 5,
});

headerTopSticky.run();

document.querySelectorAll('.nav__link').forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault();
		const header = document.querySelector('.header__top--sticky');
		// eslint-disable-next-line no-undef
		gsap.to(window, {
			duration: 1,
			scrollTo: { y: link.getAttribute('href'), offsetY: header.clientHeight - 20 },
		});
	});
});
