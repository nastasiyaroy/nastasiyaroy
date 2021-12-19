import { MobileMenu } from './scripts/MobileMenu.js';
import { BlockSticky } from './scripts/BlockSticky.js';
import { Modal } from './scripts/Modal.js';
import { setVh } from './scripts/utils.js';
import './scripts/orderForm.js';

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

const orderModal = new Modal({
	modalSelector: '#order-modal',
	toggleSelector: '[data-toggle="modal"]',
});
orderModal.run();

const successModal = new Modal({
	modalSelector: '#success-modal',
});
successModal.run();

document.querySelectorAll('.nav__link').forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault();
		// eslint-disable-next-line no-undef
		gsap.to(window, { duration: 1, scrollTo: { y: link.getAttribute('href'), offsetY: -40 } });
	});
});
