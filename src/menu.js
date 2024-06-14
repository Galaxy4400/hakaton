import { Menu } from './core/menu'
import { BackgroundModule } from './modules/background.module.js';
import { ClicksModule } from './modules/clicks.module.js';
import { ShapeModule } from './modules/shape.module.js';

export class ContextMenu extends Menu {
	#modules;

	constructor(selectior) {
		super(selectior);

		this.#modules = [
			new BackgroundModule(),
			new ClicksModule(),
			new ShapeModule(),
		];

		this.init();
	}


	init() {
		this.open();
		this.close();
		this.modules();
	}


	open() {
		document.body.addEventListener('contextmenu', event => {
			event.preventDefault();

			if (!this.#modules.length) return;

			this.setCoordinates(event.x, event.y);

			this.$element.classList.add('open');
		});
	}


	close() {
		this.$element.classList.remove('open');
	}


	modules() {
		this.#modules.forEach(this.add.bind(this));
	}


	add(module) {
		this.$element.insertAdjacentHTML('beforeend', module.toHTML());
	}


	setCoordinates(x, y) {
		this.$element.style.left = `${x}px`;
		this.$element.style.top = `${y}px`;
	}
}