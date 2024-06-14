export function random(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function randomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[random(0, 15)];
  }
  return color;
}