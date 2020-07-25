'use strict';
function startEditor(startData, { canvas }) {
	canvas.addEventListener('mousemove', function (e) {
		let rect = this.getBoundingClientRect();
		let spriteX = Math.floor((e.pageX - this.offsetLeft) * (this.offsetWidth / rect.width / getComputedStyle(this).getPropertyValue('zoom')) - rect.left);
		let spriteY = Math.floor((e.pageY - this.offsetTop) * (this.offsetHeight / rect.height / getComputedStyle(this).getPropertyValue('zoom')) - rect.top);
		let tileX = Math.floor(spriteX / TILE_WIDTH);
		let tileY = Math.floor(spriteY / TILE_HEIGHT);
		console.log(tileX, tileY);
	});
	start(startData);
	canvas.width = level.width * TILE_WIDTH;
	canvas.height = level.height * TILE_HEIGHT;
}