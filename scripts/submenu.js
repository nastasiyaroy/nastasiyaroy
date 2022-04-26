{
	const buttonList = document.querySelectorAll('.nav__item-toggle');

	const bodyClickHandler = (event) => {
		event.stopPropagation();
		hideSubmenu();
	};

	const showSubmenu = (event) => {
		event.stopPropagation();
		const button = event.target;
		const parent = button.closest('.nav__item');
		const submenu = parent.querySelector('.submenu');
		submenu.classList.add('submenu--show');
		document.addEventListener('click', bodyClickHandler);
	};

	const hideSubmenu = () => {
		const submenuList = document.querySelectorAll('.submenu--show');
		submenuList.forEach((submenu) => {
			submenu.classList.remove('submenu--show');
		});
		document.removeEventListener('click', bodyClickHandler);
	};

	const toggleMenu = (event) => {
		const button = event.target;
		const parent = button.closest('.nav__item');
		const submenu = parent.querySelector('.submenu');

		if (submenu.classList.contains('submenu--show')) {
			hideSubmenu(event);
		} else {
			showSubmenu(event);
		}
	};

	buttonList.forEach((button) => {
		button.addEventListener('click', toggleMenu);
	});
}
