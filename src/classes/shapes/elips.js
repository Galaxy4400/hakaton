import { Shape } from "./shape.js";

export class Elips extends Shape {
	draw() {
		this.$element.style.cssText = [ this.getCssText, `border-radius: 50%`].join(';');

		document.body.append(this.$element);
	}
}