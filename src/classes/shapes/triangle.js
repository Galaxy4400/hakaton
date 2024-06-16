import { Shape } from './shape.js';
import { random, randomColor } from '../../utils.js';

export class Triangle extends Shape {
	draw() {
		this.$element.style.cssText = [ 
			this.getCssText, 
			`border-left: ${random(25, 250)}px solid transparent;`,
			`border-right: ${random(25, 250)}px solid transparent;`,
			`border-bottom: ${random(50, 500)}px solid ${randomColor(50, 500)};`,
		].join(';');

		document.body.append(this.$element);

		return this.$element;
	}
}