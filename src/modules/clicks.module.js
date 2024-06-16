import { Module } from '../core/module.js';
import { randomColor } from '../utils.js';

export class ClicksModule extends Module {
	constructor() {
		super('clicks', 'Посчитать клики (за 5 секунд)');
    
		this.seconds = 5000;
		this.handleActions();
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
		this.reset();
		this.isCounting = true;

		setTimeout(() => {
			this.isCounting = false;
			this.showScoreMessage();
		}, this.seconds)
	}

	showScoreMessage() {
		const $scoreMessage = document.createElement('p');
		$scoreMessage.className = 'score-message';
		$scoreMessage.textContent = `Time is up, your clicks - ${this.click}, double-clicks - ${this.dblclick}!`;
		$scoreMessage.style.background = randomColor();

		document.body.append($message);

		setTimeout(() => {
			$message.remove();
		}, 3000);
	}
}