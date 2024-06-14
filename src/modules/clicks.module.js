import {Module} from '../core/module';

export class ClicksModule extends Module {
	constructor() {
		super('clicks', 'Посчитать количество кликов');
	}

	trigger() {
		console.log('Подсчёт кликов');
	}
}