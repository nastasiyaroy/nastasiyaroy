import { Alert } from './Alert.js';
import { submitForm } from './useForm.js';

{
	const alert = new Alert({
		selector: '#success-alert',
	});

	const form = document.querySelector('.header-form');

	const callback = () => {
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
}
