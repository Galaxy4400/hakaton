import { Module } from '../core/module.js';
import { random } from '../utils.js';
import { Elips } from '../classes/shapes/elips.js';
import { Rectangle } from '../classes/shapes/rectangle.js';
import { Triangle } from '../classes/shapes/triangle.js';


export class ShapeModule extends Module {
	constructor() {
		super('shape', 'Создать случайную фигуру');

		this.shapes = [];
	}

	trigger() {
		let figure = null;

		switch (random(1, 3)) {
			case 1: {
				figure = new Rectangle();
				break;
			}

			case 2: {
				figure = new Elips();
				break;
			}
			
			case 3: {
				figure = new Triangle({
					width: 0, 
					height: 0,
					color: 'transparent',
				});
				break;
			}
		}

		this.shapes.push(figure.draw());
	}


	remove() {
		this.shapes.forEach(shape => shape.remove());
	}
}