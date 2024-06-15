export class Module {
	constructor(type, text) {
		if (!type) {
			throw new Error('Please specify "type" param');
		}

		if (!text) {
			throw new Error('Please specify "text" param');
		}

		this.type = type;
		this.text = text;

		this.init();
	}

	init() {
		const $element = document.createElement('li');
		$element.className = 'menu-item';
		$element.textContent = this.text;
		$element.dataset.type = this.type;
		this.$element = $element;
	}

	trigger() {
		throw new Error(`Trigger method should be implemented in module "${this.type}"`);
	}
}