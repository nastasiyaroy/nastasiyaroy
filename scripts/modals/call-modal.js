import { Modal } from '../Modal.js';

const modal = new Modal({
	modalSelector: '#call-modal',
	toggleSelector: '[data-target="#call-modal"]',
});
modal.run();

const form = document.querySelector('.call-form');

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
		modal.closeModal();
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
