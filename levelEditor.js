'use strict';
let mouse = {
	spritePos: { x: 0, y: 0 },
	tilePos: { x: 0, y: 0 },
	buttons: 0,
};
function startEditor(startData, { canvas, zoomIn, zoomOut, }) {
	let selectctx,
		currentTile;
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
		mouse.spritePos.x = Math.floor((e.pageX - rect.left) * canvas.width / canvas.offsetWidth);
		mouse.spritePos.y = Math.floor((e.pageY - rect.top) * canvas.height / canvas.offsetHeight);
		mouse.tilePos.x = Math.floor(mouse.spritePos.x / TILE_WIDTH);
		mouse.tilePos.y = Math.floor(mouse.spritePos.y / TILE_HEIGHT);
		interact();
		updateSelectCanvas();
		draw(false);
	});
	canvas.addEventListener('mousedown', e => {
		mouse.buttons = e.buttons;
		interact();
		draw(false);
	});
	canvas.addEventListener('mouseup', e => {
		mouse.buttons = e.buttons;
	});
	function updateSelectCanvas() {
		selectctx.fillStyle = '#00ffff60';

		selectctx.clearRect(
			0,
			0,
			level.width * TILE_WIDTH,
			level.height * TILE_HEIGHT,
		);

		selectctx.fillRect(
			mouse.tilePos.x * TILE_WIDTH,
			mouse.tilePos.y * TILE_HEIGHT,
			TILE_WIDTH,
			TILE_HEIGHT,
		);
	};
	function interact() {
		if (mouse.buttons & 1 && currentTile != undefined) {
			sScript.setTile(
				mouse.tilePos.x,
				mouse.tilePos.y,
				currentTile
			);
		}
	}
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
	level.onAssetsLoaded(function () {
		setTimeout(() => {
			for (let e of Array.from(startData.tile.children))
				e.addEventListener('click', () => {
					currentTile = e.dataset.tile;
					Array.from(document.getElementById('tile').children).forEach(e => e.classList.remove('selected'));
					e.classList.add('selected');
				});
		}, 0);
		draw(false);
	});
}