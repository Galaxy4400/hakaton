import { Timer } from '../classes/timer/timer';
import { Module } from '../core/module';
import { randomColor } from '../utils';

export class ClicksModule extends Module {
	constructor() {
		super('clicks', 'Посчитать клики (за 5 секунд)');

		this.time = 5;
	}

	trigger() {
		let click = -1;
		let time = this.time;
		const timer = new Timer(time);

		const startCheck = setInterval(() => {
			--time;

			if (time === 0) {
				clearInterval(startCheck);
				this.showScoreMessage(click);
			}
		}, 1000);

		document.body.addEventListener('click', () => {
			++click;
			startCheck;
		});
	}

	showScoreMessage(score) {
		const $scoreMessage = document.createElement('p');
		$scoreMessage.className = 'score-message';
		$scoreMessage.textContent = `Time is up, your score is ${score}!`;
		$scoreMessage.style.background = randomColor();

		document.body.appendChild($scoreMessage);

		setTimeout(() => {
			$scoreMessage.remove();
		}, 3000);
	}
}