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

export function explosion() {
	document.body.insertAdjacentHTML('beforeend', `
		<div class="video">
			<iframe src="https://www.youtube.com/embed/BfR344Gzjng?si=KimXjd9M6NhhEWCp&autoplay=1&controls=0" allow="autoplay;" frameborder="0"></iframe>
		</div>
	`);

	setTimeout(() => document.querySelector('.video').remove(), 3000);
}