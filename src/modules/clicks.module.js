import { Module } from '../core/module';
import { randomColor } from '../utils';

export class ClicksModule extends Module {
	constructor() {
		super('clicks', 'Посчитать клики (за 5 секунд)');
	}

	trigger() {
		let timer = 5;
		let click = -1;

		const startCheck = setInterval(() => {
			--timer;

			if (timer === 0) {
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
		const scoreMessage = document.createElement('p');
		scoreMessage.className = 'score-message';
		scoreMessage.textContent = `Time is up, your score is ${score}!`;
		scoreMessage.style.background = randomColor();

		document.body.appendChild(scoreMessage);

		setTimeout(() => {
			scoreMessage.remove();
		}, 3000);
	}
}