var LAST_STATE = (function()
{
	var STATE = function(){};
	//
	var pointerPosition =
	{
		x: 0,
		y: 0
	};
	var playerPointer = null;

	//
	STATE.prototype =
	{
		preload: function()
		{
		},

		create: function()
		{
			GAME_STATUS = STATUS.LAST;

			GAME.stage.backgroundColor = '#FFFFFF';
			//GAME.add.sprite(0, 0, 'sheep-background');

			GAME.physics.startSystem(Phaser.Physics.BOX2D);
			GAME.physics.box2d.gravity.y = 100;
			GAME.physics.box2d.setBoundsToWorld();

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
					pointerPosition.x = (rect.x * SCALE_FIX.x) + ((rect.width * SCALE_FIX.x) / 2);
					if(pointerPosition.x < 0) pointerPosition.x = 0;
					else if(pointerPosition.x > 800) pointerPosition.x = 800;
					pointerPosition.y = (rect.y * SCALE_FIX.y) + ((rect.height * SCALE_FIX.y) / 2);
					if(pointerPosition.y < 0) pointerPosition.y = 0;
					else if(pointerPosition.y > 800) pointerPosition.y = 800;
				});
			});
		},

		update: function()
		{
			playerPointer.x = pointerPosition.x;
			playerPointer.y = pointerPosition.y;
		},

		render: function()
		{
			GAME.debug.box2dWorld();
			GAME.debug.text('FPS: ' + (GAME.time.fps || 'FPS: --'), 10, 20, '#00FF00');

		}
	};

	var dispose = function()
	{
		TRACKING_TRACK.stop();
		TRACKER = null;
		TRACKING_TRACK = null;
	};

	GAME.state.add('LAST_STATE', STATE);

	return { dispose: dispose };
})();