import { Alert } from '../Alert.js';
import { Modal } from '../Modal.js';
import { submitForm } from '../useForm.js';

const modal = new Modal({
	modalSelector: '#order-modal',
	toggleSelector: '[data-target="#order-modal"]',
});
modal.run();

const alert = new Alert({
	selector: '#success-alert',
});

const form = document.querySelector('.order-form');

const callback = () => {
	modal.closeModal();
	setTimeout(() => {
		alert.openModal();
		setTimeout(() => {
			alert.closeModal();
		}, 5000);
	}, 1000);
};

const submitHandler = async (event) => {
	submitForm(event, callback);
};

form.addEventListener('submit', submitHandler);
