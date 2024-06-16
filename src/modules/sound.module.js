import { Module } from '../core/module';
import { random, explosion } from '../utils';
import { ShapeModule } from './shape.module';
import { TimerModule } from './timer.module';

export class SoundModule extends Module {
	constructor() {
		super('sound', 'Произвести случайный звук');

		this.sounds = [
			'https://zvukogram.com/mp3/cats/765/oglushitelnyiy-zvuk-trevogi.mp3',
			'https://zvukogram.com/mp3/p2/2424/voenno-morskoy-signal-trevogi-26737.mp3',
			'https://zvukogram.com/mp3/cats/871/signal-pojarnoy-trevogi.mp3',
			'https://zvukogram.com/mp3/p2/2390/nemetskaya-rech-i-signal-trevogi-26467.mp3',
			'https://zvukogram.com/mp3/cats/765/dlitelnyiy-trevojnyiy-signal.mp3',
		];

		this.isPlay = false;
		this.audio = null;

		this.shapeModule = new ShapeModule();
		this.timerModule = new TimerModule();

		this.soundTime = 10000;
		this.soundTimerId = null;
	}


	trigger() {
		this.isPlay ? this.stop() : this.play();
	}


	play() {
		if (!this.audio) this.initAudio();

		this.isPlay = true;

		this.special();

		this.timerModule.start(this.soundTime);

		this.audio.play();

		this.$element.textContent = 'Остановить воспроизведение звука';

		this.soundTimerId = setTimeout(this.stop.bind(this), this.soundTime);
	}


	stop() {
		this.audio.pause();
		this.audio = null;
		this.$element.textContent = 'Произвести случайный звук';
		this.timerModule.stop();
		this.isPlay = false;
		this.shapeModule.remove();

		clearInterval(this.cpecialIntervalId);
		clearTimeout(this.soundTimerId);

		explosion();
	}


	initAudio() {
		const audioUrl = this.sounds[random(0, this.sounds.length - 1)];
		this.audio = new Audio(audioUrl);
	}


	special() {
		this.cpecialIntervalId = setInterval(this.shapeModule.trigger.bind(this.shapeModule), 300);
	}
}