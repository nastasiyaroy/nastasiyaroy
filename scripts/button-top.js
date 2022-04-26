{
	const arrow = document.querySelector('.button-top');

	// eslint-disable-next-line no-inner-declarations
	function trackScroll() {
		const scrolled = window.pageYOffset;
		const coords = document.documentElement.clientHeight;

		if (scrolled > coords) {
			arrow.classList.add('button-top--show');
		}
		if (scrolled < coords) {
			arrow.classList.remove('button-top--show');
		}
	}

	window.addEventListener('scroll', trackScroll);

	arrow.addEventListener('click', (event) => {
		event.preventDefault();
		// eslint-disable-next-line no-undef
		gsap.to(window, {
			duration: 1,
			scrollTo: { y: arrow.getAttribute('href') },
		});
	});
}
