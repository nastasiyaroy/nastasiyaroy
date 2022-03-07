/* eslint-disable no-undef */
// eslint-disable-next-line import/no-named-as-default
import Swiper from '../libs/swiper/swiper.js';

const swiper0 = new Swiper('.header-swiper', {
	init: false,
	speed: 1000,
	effect: 'fade',
	slidesPerView: 1,
	autoplay: {
		delay: 4000,
	},
});

const swiper1 = new Swiper('.slider--1 .swiper', {
	init: false,
	slidesPerView: 1,
	spaceBetween: 20,
	pagination: {
		el: '.slider--1 .swiper-pagination',
		clickable: true,
		bulletElement: 'button',
		bulletClass: 'swiper-pagination__bullet',
		bulletActiveClass: 'swiper-pagination__bullet--active',
	},
	navigation: {
		nextEl: `.slider--1 .swiper-navigation--next`,
		prevEl: `.slider--1 .swiper-navigation--prev`,
	},
	breakpoints: {
		800: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1200: {
			slidesPerView: 3,
		},
	},
});

const swiper2 = new Swiper('.slider--2 .swiper', {
	init: false,
	slidesPerView: 1,
	spaceBetween: 20,
	pagination: {
		el: '.slider--2 .swiper-pagination',
		clickable: true,
		bulletElement: 'button',
		bulletClass: 'swiper-pagination__bullet',
		bulletActiveClass: 'swiper-pagination__bullet--active',
	},
	navigation: {
		nextEl: `.slider--2 .swiper-navigation--next`,
		prevEl: `.slider--2 .swiper-navigation--prev`,
	},
	breakpoints: {
		// when window width is >= 320px
		// when window width is >= 480px
		800: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		// when window width is >= 640px
		1200: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	},
});

const swiper5 = new Swiper('.slider--5 .swiper', {
	init: false,
	slidesPerView: 1,
	spaceBetween: 20,
	pagination: {
		el: '.slider--5 .swiper-pagination',
		clickable: true,
		bulletElement: 'button',
		bulletClass: 'swiper-pagination__bullet',
		bulletActiveClass: 'swiper-pagination__bullet--active',
	},
	navigation: {
		nextEl: `.slider--5 .swiper-navigation--next`,
		prevEl: `.slider--5 .swiper-navigation--prev`,
	},
	breakpoints: {
		// when window width is >= 320px
		// when window width is >= 480px
		800: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		// when window width is >= 640px
		1200: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	},
});
const swiper4 = new Swiper('.slider--4 .swiper', {
	init: false,
	slidesPerView: 1,
	spaceBetween: 20,
	pagination: {
		el: '.slider--4 .swiper-pagination',
		clickable: true,
		bulletElement: 'button',
		bulletClass: 'swiper-pagination__bullet',
		bulletActiveClass: 'swiper-pagination__bullet--active',
	},
	navigation: {
		nextEl: `.slider--4 .swiper-navigation--next`,
		prevEl: `.slider--4 .swiper-navigation--prev`,
	},
	breakpoints: {
		// when window width is >= 320px
		// when window width is >= 480px
		800: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		// when window width is >= 640px
		1200: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	},
});

const swiper3 = new Swiper('.slider--3 .swiper', {
	init: false,
	slidesPerView: 1,
	spaceBetween: 20,
	pagination: {
		el: '.slider--3 .swiper-pagination',
		clickable: true,
		bulletElement: 'button',
		bulletClass: 'swiper-pagination__bullet',
		bulletActiveClass: 'swiper-pagination__bullet--active',
	},
	navigation: {
		nextEl: `.slider--3 .swiper-navigation--next`,
		prevEl: `.slider--3 .swiper-navigation--prev`,
	},
	breakpoints: {
		// when window width is >= 320px
		// when window width is >= 480px
		580: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		// when window width is >= 640px
		850: {
			slidesPerView: 3,
			spaceBetween: 40,
		},
		1150: {
			slidesPerView: 4,
			spaceBetween: 50,
		},
		1300: {
			slidesPerView: 5,
			spaceBetween: 60,
		},
	},
});

const swiper7 = new Swiper('.slider--unknown .swiper', {
	init: false,
	slidesPerView: 1,
	spaceBetween: 20,
	pagination: {
		el: '.slider--unknown .swiper-pagination',
		clickable: true,
		bulletElement: 'button',
		bulletClass: 'swiper-pagination__bullet',
		bulletActiveClass: 'swiper-pagination__bullet--active',
	},
	navigation: {
		nextEl: `.slider--unknown .swiper-navigation--next`,
		prevEl: `.slider--unknown .swiper-navigation--prev`,
	},
	breakpoints: {
		800: {
			slidesPerView: 1,
			spaceBetween: 30,
		},
		1200: {
			slidesPerView: 1,
		},
	},
});

const sliders = [swiper0, swiper1, swiper2, swiper4, swiper3, swiper5, swiper7];
sliders.forEach((slider) => {
	slider.init();
});
