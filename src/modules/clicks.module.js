import { Module } from '../core/module.js';
import { randomColor } from '../utils.js';


export class ClicksModule extends Module {
	constructor() {
		super('clicks', 'Посчитать клики (за 5 секунд)');

		this.countingTime = 5000;

		this.initActions();
	}

	reset() {
		this.single = 0;
		this.double = 0;
		this.isCounting = false;
	}


	initActions() {
		document.addEventListener('mouseup', () => {
			if (!this.isCounting) return;

			this.single++;
		});
		
		document.addEventListener('dblclick', () => {
			if (!this.isCounting) return;

			this.single -= 2;
			this.double++;
		});
	}


	trigger() {
		this.reset();

		this.isCounting = true;

		setTimeout(() => { 
			this.isCounting = false;
			this.showMessage();
		}, this.countingTime);
	}


	stop() {
		this.showMessage();
		this.reset();
	}


	// TODO: Replace on MessageModul
	createMessage() {
		const $message = document.createElement('p');
		$message.className = 'score-message';
		$message.innerHTML = `Одинарные клики: <b>${this.single}</b><br>Двойные клики: <b>${this.double}</b><br>`;
		$message.style.background = randomColor();

		return $message;
	}


	showMessage() {
		const $message = this.createMessage();

		document.body.append($message);

		setTimeout(() => {
			$message.remove();
		}, 3000);
	}
}