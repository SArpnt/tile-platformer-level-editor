'use strict';
let mousePos = {
	sprite: { x: 0, y: 0 },
	tile: { x: 0, y: 0 },
};
function startEditor(startData, { canvas, zoomIn, zoomOut, }) {
	let selectctx;
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
		mousePos.sprite.x = Math.floor((e.pageX - rect.left) * canvas.width / canvas.offsetWidth);
		mousePos.sprite.y = Math.floor((e.pageY - rect.top) * canvas.height / canvas.offsetHeight);
		mousePos.tile.x = Math.floor(mousePos.sprite.x / TILE_WIDTH);
		mousePos.tile.y = Math.floor(mousePos.sprite.y / TILE_HEIGHT);
		updateSelectCanvas();
		draw(false);
	});
	function updateSelectCanvas() {
		selectctx.fillStyle = '#00ffff60';

		selectctx.clearRect(
			0,
			0,
			level.width * TILE_WIDTH,
			level.height * TILE_HEIGHT,
		);

		let hoveredRect = level.compressed.tiles.length - level.compressed.tiles.slice().reverse().findIndex(e =>
			mousePos.tile.x >= e.x &&
			mousePos.tile.x <= (e.xe || e.x) &&
			mousePos.tile.y >= e.y &&
			mousePos.tile.y <= (e.ye || e.y)
		) - 1;

		for (let i in level.compressed.tiles) {
			let rect = level.compressed.tiles[i],
				ye = typeof rect.ye != 'undefined' ? rect.ye : rect.y,
				xe = typeof rect.xe != 'undefined' ? rect.xe : rect.x;

			if (i == hoveredRect)
				selectctx.fillRect(
					rect.x * TILE_WIDTH,
					rect.y * TILE_HEIGHT,
					(xe + 1 - rect.x) * TILE_WIDTH,
					(ye + 1 - rect.y) * TILE_HEIGHT,
				);
			else
				selectctx.clearRect(
					rect.x * TILE_WIDTH,
					rect.y * TILE_HEIGHT,
					(xe + 1 - rect.x) * TILE_WIDTH,
					(ye + 1 - rect.y) * TILE_HEIGHT,
				);
		}
	};
	let o = copyTiles;
	copyTiles = function (ox, oy) {
		o(...arguments);
		ctx.drawImage(
			selectctx.canvas,
			ox,
			oy,
		);
	};
	start(startData);
	canvas.width = level.width * TILE_WIDTH;
	canvas.height = level.height * TILE_HEIGHT;
	selectctx = new OffscreenCanvas(level.width * TILE_WIDTH, level.height * TILE_HEIGHT).getContext('2d');
	level.onAssetsLoaded(_=>draw(false))
}