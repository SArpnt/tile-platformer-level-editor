'use strict';
function startEditor(startData, { canvas, zoomIn, zoomOut, }) {
	{ // zoom
		let zLevels = [.25, .5, 1, 2, 3, 4, 5, 6, 7, 8];
		let z = 2;
		zoomIn.addEventListener('click', () => {
			if (z + 1 < zLevels.length) z++;
			updateZoom(zLevels[z]);
		});
		zoomOut.addEventListener('click', () => {
			if (z - 1 >= 0) z--;
			updateZoom(zLevels[z]);
		});
		function updateZoom(z) {
			canvas.style.width = canvas.width * z;
			canvas.style.height = canvas.height * z;
		}
	}
	canvas.addEventListener('mousemove', e => {
		let rect = canvas.getBoundingClientRect();
		let spriteX = Math.floor((e.pageX - canvas.offsetLeft) * (canvas.offsetWidth / rect.width / getComputedStyle(canvas).getPropertyValue('zoom')) - rect.left);
		let spriteY = Math.floor((e.pageY - canvas.offsetTop) * (canvas.offsetHeight / rect.height / getComputedStyle(canvas).getPropertyValue('zoom')) - rect.top);
		let tileX = Math.floor(spriteX / TILE_WIDTH);
		let tileY = Math.floor(spriteY / TILE_HEIGHT);
		console.log(tileX, tileY);
	});
	start(startData);
	canvas.width = level.width * TILE_WIDTH;
	canvas.height = level.height * TILE_HEIGHT;
}