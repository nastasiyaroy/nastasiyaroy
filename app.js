import { MobileMenu } from './scripts/MobileMenu.js';
import { BlockSticky } from './scripts/BlockSticky.js';
import { Modal } from './scripts/Modal.js';

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

const modal = new Modal();
modal.run();
