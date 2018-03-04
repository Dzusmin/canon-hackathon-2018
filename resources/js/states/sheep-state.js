var SHEEP_STATE = (function()
{
	var STATE = function(){};
	//
	var pointerPosition =
	{
		x: 0,
		y: 0
	};

	// var sheep = [];
	var sheepGroup = null;
	var playerPointer = null;
	var wolf = null;
	// var wolfGroup = null;
	// var bmpText = null;
	// var startSheepAmount = 0;

	//
	STATE.prototype =
	{
		preload: function()
		{
			GAME.load.image('sheep-background', 'resources/assets/2d/sheep-background.png');
			GAME.load.image('sheep', 'resources/assets/2d/sheep.png');
			GAME.load.image('wolf', 'resources/assets/2d/wolf.png');
		},

		create: function()
		{
			GAME_STATUS = STATUS.SHEEP;

			GAME.stage.backgroundColor = '#FFFFFF';
			GAME.add.sprite(0, 0, 'sheep-background');

			GAME.physics.startSystem(Phaser.Physics.BOX2D);
			GAME.physics.box2d.setBoundsToWorld();

			// kolizje statyczne
			var staticCollisions = GAME.add.sprite(0,0);
			GAME.physics.box2d.enable(staticCollisions);
			staticCollisions.body.static = true;
			staticCollisions.body.clearFixtures();

			staticCollisions.body.addEdge(399, 237, 534, 110);
			staticCollisions.body.addEdge(534, 110, 596, 157);
			staticCollisions.body.addEdge(596, 157, 577, 207);
			staticCollisions.body.addEdge(577, 207, 634, 290);
			staticCollisions.body.addEdge(634, 290, 578, 383);
			staticCollisions.body.addEdge(578, 383, 457, 363);
			staticCollisions.body.addEdge(457, 363, 399, 237);

			staticCollisions.body.addEdge(581, 600, 689, 506);
			staticCollisions.body.addEdge(689, 506, 800, 523);

			staticCollisions.body.addEdge(0, 330, 115, 307);
			staticCollisions.body.addEdge(115, 307, 197, 439);
			staticCollisions.body.addEdge(197, 439, 321, 473);
			staticCollisions.body.addEdge(321, 473, 363, 600);
			//

			sheepGroup = GAME.add.group();
			// owce
			for(var i = 0; i < 50; i++)
			{
				var tmpSheep = GAME.add.sprite(GAME.world.randomX, GAME.world.randomY, 'sheep');
				tmpSheep.anchor.setTo(0.5);

				GAME.physics.box2d.enable(tmpSheep);
				tmpSheep.body.setCircle(23);
				tmpSheep.body.setCollisionCategory(2);
				sheepGroup.add(tmpSheep);
				// sheep.push(tmpSheep);
			}

			playerPointer = new Phaser.Physics.Box2D.Body(GAME, null, 10, 10);
			playerPointer.setCircle(20);
			playerPointer.kinematic = true;

			TRACKER = new tracking.ColorTracker('red');
			TRACKING_TRACK = tracking.track('#video', TRACKER, { camera: true });
			TRACKER.on('track', function(event)
			{
				CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
				event.data.forEach(function(rect)
				{
					if (rect.color === 'custom')
					{
						rect.color = TRACKER.customColor;
					}
					CANVAS_CONTEXT.strokeStyle = rect.color;
					CANVAS_CONTEXT.strokeRect(rect.x, rect.y, rect.width, rect.height);

					pointerPosition.x = (rect.x * SCALE_FIX.x) + ((rect.width * SCALE_FIX.x) / 2);
					if(pointerPosition.x < 0) pointerPosition.x = 0;
					else if(pointerPosition.x > 800) pointerPosition.x = 800;
					pointerPosition.y = (rect.y * SCALE_FIX.y) + ((rect.height * SCALE_FIX.y) / 2);
					if(pointerPosition.y < 0) pointerPosition.y = 0;
					else if(pointerPosition.y > 800) pointerPosition.y = 800;
				});
			});
      GAME.time.events.add(Phaser.Timer.SECOND * 2, this.fadeWolf, this);
		},

		update: function()
		{
		  // bmpText.text = startSheepAmount + '/' + sheep.length;
			playerPointer.x = pointerPosition.x;
			playerPointer.y = pointerPosition.y;
      sheepGroup.forEach(function (sheepObj) {
        GAME.physics.arcade.moveToXY(sheepObj, pointerPosition.x, pointerPosition.y, 50, 600);
      });
			// GAME.physics.arcade.overlap(sheepGroup, wolf, this.woolfVsSheepCollisionHandler, null, this);
		},

		render: function()
		{
			GAME.debug.box2dWorld();
			// bmpText = GAME.add.bitmapText(10, 10, 'carrier_command', startSheepAmount + '/' + startSheepAmount,34);
			GAME.debug.text('FPS: ' + (GAME.time.fps || 'FPS: --'), 10, 20, '#00FF00');

		},

    fadeWolf: function () {
      var wolf = GAME.add.sprite(200, 200, 'wolf');
      wolf.anchor.setTo(0.5);

      GAME.physics.box2d.enable(wolf);
      wolf.body.setCircle(23);

      wolf.body.setCategoryContactCallback(2, this.woolfVsSheepCollisionHandler, this);
    },

    woolfVsSheepCollisionHandler: function(body1, body2, f1, f2, begin) {
			if(!begin){
				return;
			}
      body2.sprite.loadTexture('wolf', 0);
      body2.destroy();
    }
	};

	var dispose = function()
	{
		TRACKING_TRACK.stop();
		TRACKER = null;
		TRACKING_TRACK = null;
	};

	GAME.state.add('SHEEP_STATE', STATE);

	return { dispose: dispose };
})();
