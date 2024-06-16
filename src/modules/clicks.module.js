import { Module } from '../core/module.js';
import { MessageModule } from './message.module.js';
import { TimerModule } from './timer.module.js';

export class ClicksModule extends Module {
	constructor() {
		super('clicks', 'Посчитать клики (за 5 секунд)');
    
		this.seconds = 5000;
		this.handleActions();

		this.timer = new TimerModule();
		this.message = new MessageModule();
	}

	reset() {
		this.click = 0;
		this.dblclick = 0;
		this.isCounting = false;		
	}

	handleActions() {
		document.body.addEventListener('mousedown', () => {
			if (!this.isCounting) return;

			this.click++;
		})

		document.body.addEventListener('dblclick', () => {
			if (!this.isCounting) return;

			this.click -= 2;
			this.dblclick++;
		})
	}

	trigger() {
		if (this.isCounting) return;
		this.$element.classList.add('disable');

		this.timer.start(this.seconds);

		this.reset();
		this.isCounting = true;

		setTimeout(() => {
			this.isCounting = false;
			this.message.showMessage(`Time is up, your clicks - ${this.click}, double-clicks - ${this.dblclick}!`);
			this.$element.classList.remove('disable');
		}, this.seconds)
	}
}