'use strict';
TILE_WIDTH = 16;
TILE_HEIGHT = 16;

levelData = {
	width: 27,
	height: 15,
	assets: [0, 1],
	sprites: [
		['Player', 64, 160],
		['Enemy', 96, 160],
	],
	tiles: [
		[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 2, 2, 2, 2, 2, 2, 2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0, 0, 0, 0, 0],
	]
};

tile = [
	{
		name: 'empty',
		img: [1, 0, 0],
	},
	{
		name: 'dirt',
		img: [1, 2, 1],
		collide: false,
	},
	{
		name: 'floor',
		img: [1, 2, 0],
		collide: {
			up: true,
			down: false,
			left: false,
			right: false
		}
	},
	{
		name: 'ceiling',
		img: [1, 2, 2],
		collide: {
			up: false,
			down: true,
			left: false,
			right: false
		}
	},
	{
		name: 'Rwall',
		img: [1, 3, 1],
		collide: {
			up: false,
			down: false,
			left: false,
			right: true
		}
	},
	{
		name: 'Lwall',
		img: [1, 1, 1],
		collide: {
			up: false,
			down: false,
			left: true,
			right: false
		}
	},
	{
		name: 'RUcorner',
		img: [1, 3, 0],
		collide: {
			up: true,
			down: false,
			left: false,
			right: true
		}
	},
	{
		name: 'LUcorner',
		img: [1, 1, 0],
		collide: {
			up: true,
			down: false,
			left: true,
			right: false
		}
	},
	{
		name: 'RDcorner',
		img: [1, 3, 2],
		collide: {
			up: false,
			down: true,
			left: false,
			right: true
		}
	},
	{
		name: 'LDcorner',
		img: [1, 1, 2],
		collide: {
			up: false,
			down: true,
			left: true,
			right: false
		}
	},
	{
		name: 'bumpBox',
		img: [1, 0, 1],
		collide: true,
		onCollide(side, pos) {
			if (side == 'down') {
				sScript.setTile(pos.x, pos.y, 0, false);
				cSprites.push(new sprite.tile.Bump(pos.x, pos.y, 10, side));
			}
		}
	}
];

sprite = {
	Player: class {
		constructor(x, y) {
			this.pos = {
				x: x,
				y: y,
				xv: 0,
				yv: 0,
				collisions: {
					up: false,
					down: false,
					left: false,
					right: false
				},
				hitboxes: [
					new sScript.hitbox.Rect(0, 0, 16, 16),
				],
			};
			this.scrollState = 0; // 1 is right
			this.img = [0, 0, 0, 16, 16];
		}

		update(sN) {
			this.pos.last = Object.assign({}, this.pos);
			delete this.pos.last.last;
			this.pos = sScript.move(this.pos, keyInput);
			this.pos = sScript.collide(this.pos);

			{
				if ((() => {
					switch (this.scrollState) { // reset scrolling when changing direction partly
						case 1:
							return this.pos.xv < 0;
						case -1:
							return this.pos.xv > 0;
						default:
							return false;
					}
				})()) this.scrollState = 0;

				let i = this.pos.x + scrollX; // player relative to camera

				if (i > ((this.scrollState == 1) ? 120 : 232)) // past scroll border
					this.scroll(1, 120);
				else if (i < ((this.scrollState == -1) ? 184 : 72))
					this.scroll(-1, 184);
			}
			cSprites.push(new sprite.particle.Star(this.pos.x + 4, this.pos.y + 12));
		}

		scroll(state, a) {
			this.scrollState = state;

			scrollX += ( // scroll camera to final position based on movement
				(a - this.pos.x - scrollX) // final camera position
					> 0 ? Math.max : Math.min)(this.pos.xv * -2.5, 0);

			if ( // jitter fix
				state == 1 ?
					this.pos.x + scrollX < a :
					this.pos.x + scrollX > a
			)
				scrollX = a - this.pos.x;
		}
	},
	Enemy: class {
		constructor(x, y) {
			this.pos = {
				x: x,
				y: y,
				xv: 0,
				yv: 0,
				collisions: {
					up: false,
					down: false,
					left: false,
					right: false
				},
				hitboxes: [
					new sScript.hitbox.Rect(0, 0, 16, 16),
				],
			};
			this.dir = true; // true = right
			this.img = [0, 16, 0, 16, 16];
		}

		update(sN) {
			this.pos.last = Object.assign({}, this.pos);
			delete this.pos.last.last;
			this.pos = sScript.move(this.pos,
				{ up: false, down: false, left: !this.dir, right: this.dir, sprint: false }
			);

			this.pos = sScript.collide(this.pos);
			if (this.pos.collisions.right || this.pos.collisions.left)
				this.dir = !this.dir;
		}
	},
	particle: {
		Star: class {
			constructor(x, y) {
				this.pos = {
					x: x,
					y: y,
				};
				this.timer = 0;
				this.img = [0, 32, 0, 8, 8];
			}
			update(sN) {
				if (this.timer >= 5) {
					cSprites.splice(sN, 1);
					return;
				}
				//this.img.style = "opacity:" + (1 - (this.timer / 10))
				this.timer++;
			}
		}
	},
	tile: {
		Bump: class {
			constructor(x, y, t, side) {
				this.pos = {
					tx: x,
					ty: y,
					x: x * TILE_WIDTH,
					y: y * TILE_HEIGHT,
					sy: y * TILE_HEIGHT,
					yv: -1.5
				};
				this.tile = t;
				this.side = side;
				let i = tile[t].img;
				this.img = [i[0], i[1] * TILE_WIDTH, i[2] * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT];
			}
			update(sN) {
				var p = this.pos;
				p.y += p.yv;
				p.yv += 0.2;
				if (p.y == p.sy) {
					sScript.setTile(p.tx, p.ty, this.tile, false);
					cSprites.splice(sN, 1);
				}
			}
		}
	}
};