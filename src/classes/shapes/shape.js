import { random, randomColor } from "../../utils.js";

export class Shape {
	constructor(properties) {
		const defaultProperties = {
			width: random(50, 500),
			height: random(50, 500),
			color: randomColor(),
			rotate: random(0, 360),
			x: random(0, window.innerWidth),
			y: random(0, window.innerHeight),
		};

		this.properties = { ...defaultProperties, ...properties };

		this.$element = document.createElement('div');
	}

	draw() {
		throw new Error('Draw method should be implemented');
	}

	get getCssText() {
		return [
			`position: absolute`,
			`translate: -50% -50%`,
			`left: ${this.properties.x}px`,
			`top: ${this.properties.y}px`,
			`width: ${this.properties.width}px`,
			`height: ${this.properties.height}px`,
			`background: ${this.properties.color}`,
			`rotate: ${this.properties.rotate}deg`,
		].join(';');
	}
}