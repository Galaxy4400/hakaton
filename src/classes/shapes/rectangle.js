import { Shape } from "./shape.js";

export class Rectangle extends Shape {
	draw() {
		const rectangle = document.createElement('div');

		rectangle.style.cssText = this.getCssText;

		document.body.append(rectangle);
	}
}