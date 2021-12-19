export class Singleton {
	constructor() {
		if (Singleton.instance) {
			// eslint-disable-next-line no-constructor-return
			return Singleton.instance;
		}

		Singleton.instance = this;

		// eslint-disable-next-line no-constructor-return
		return this;
	}
}
