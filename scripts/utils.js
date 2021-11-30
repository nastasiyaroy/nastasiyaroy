export const throttle = (function_, ms) => {
	let isThrottled = false;
	let savedArguments;
	let savedThis;

	function wrapper(...argumentsList) {
		if (isThrottled) {
			savedArguments = argumentsList;
			// eslint-disable-next-line unicorn/no-this-assignment
			savedThis = this;
			return;
		}

		Reflect.apply(function_, this, argumentsList);

		isThrottled = true;

		setTimeout(function f() {
			isThrottled = false;
			if (savedArguments) {
				wrapper.apply(savedThis, savedArguments);
				savedArguments = null;
				savedThis = null;
			}
		}, ms);
	}

	return wrapper;
};
