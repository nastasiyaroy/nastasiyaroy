export const submitForm = async (event, callback) => {
	const form = event.target;
	event.preventDefault();

	try {
		const formData = new FormData(form);
		const response = await fetch('/api/send-form.php', {
			method: 'POST',
			body: formData,
		});
		await response.json();

		form.reset();
	} catch (error) {
		console.log(error);
	} finally {
		callback();
	}
};
