import {Module} from '../core/module';

export class BackgroundModule extends Module {
	constructor() {
		super('background', 'Изменить бекграунд');
	}

	trigger() {
		console.log('Отрисовка бекграунда');
	}
}