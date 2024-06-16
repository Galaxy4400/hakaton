import {Module} from '../core/module';
import { randomColor } from '../utils';

export class BackgroundModule extends Module {
	constructor() {
		super('background', 'Изменить бекграунд');
	}

	trigger() {
		document.body.style.backgroundColor = randomColor();
	}
}