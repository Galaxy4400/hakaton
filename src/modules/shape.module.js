import {Module} from '../core/module'

export class ShapeModule extends Module {
	constructor() {
		super('shape', 'Создать случайную фигуру');
	}

	trigger() {
		console.log('Создание случайной фигуры');
	}
}