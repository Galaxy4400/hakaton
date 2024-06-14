import { Shape } from "./shape.js";

export class Elips extends Shape {
	draw() {
		const elips = document.createElement('div');

		elips.style.cssText = [ this.getCssText, `border-radius: 50%`].join(';');

		document.body.append(elips);
	}
}