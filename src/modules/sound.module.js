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
		this.timer = new TimerModule();

		this.soundTime = 10000;
	}


	trigger() {
		this.toggle() ? this.play() : this.stop();
	}


	play() {
		if (!this.audio) this.initAudio();

			this.special();

			this.timer.start(this.soundTime);

			this.audio.play();

			this.$element.textContent = 'Остановить воспроизведение звука';
	}


	stop() {
		this.audio.pause();
		this.audio = null;
		this.$element.textContent = 'Произвести случайный звук';

		clearInterval(this.interval);

		this.timer.stop();

		this.shapeModule.remove();

		explosion();
	}


	initAudio() {
		const audioUrl = this.sounds[random(0, this.sounds.length - 1)];
		this.audio = new Audio(audioUrl);
	}


	toggle() {
		this.isPlay = !this.isPlay;

		return this.isPlay;
	}


	special() {
		this.interval = setInterval(this.shapeModule.trigger.bind(this.shapeModule), 300);

		setTimeout(this.stop.bind(this), this.soundTime);
	}
}