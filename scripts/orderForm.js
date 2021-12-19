{
	const form = document.querySelector('.order-form');

	const formSend = (event) => {
		event.preventDefault();
	};

	form.addEventListener('click', formSend);
}
