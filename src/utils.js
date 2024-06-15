export function random(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min));
}

export function randomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[random(0, 15)];
  }
  return color;
}