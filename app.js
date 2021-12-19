import { MobileMenu } from './scripts/MobileMenu.js';
import { BlockSticky } from './scripts/BlockSticky.js';
import { Modal } from './scripts/Modal.js';
import { setVh } from './scripts/utils.js';
import { Alert } from './scripts/Alert.js';

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

document.querySelectorAll('.nav__link').forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault();
		// eslint-disable-next-line no-undef
		gsap.to(window, { duration: 1, scrollTo: { y: link.getAttribute('href'), offsetY: -40 } });
	});
});

const orderForm = () => {
	const alert = new Alert({
		alertSelector: '#success-alert',
	});

	const form = document.querySelector('.order-form');

	const sendForm = async (event) => {
		event.preventDefault();
		try {
			const formData = new FormData(form);
			const response = await fetch('/api/send-form.php', {
				method: 'POST',
				body: formData,
			});
			const result = await response.json();

			if (result.success === 'error') {
				return;
			}

			form.reset();
			orderModal.closeModal();
			setTimeout(() => {
				alert.openModal();
				setTimeout(() => {
					alert.closeModal();
				}, 5000);
			}, 1000);
		} catch (error) {
			console.error(error);
		}
	};

	form.addEventListener('submit', sendForm);
};
orderForm();
