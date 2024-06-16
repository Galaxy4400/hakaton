import { Shape } from "./shape.js";

export class Rectangle extends Shape {
	draw() {
		this.$element.style.cssText = this.getCssText;

		document.body.append(this.$element);

		return this.$element;
	}
}