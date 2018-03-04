var SHEEP_STATE = (function()
{
	var STATE = function(){};
	//
	var pointerPosition =
	{
		x: 0,
		y: 0
	};
	
	var sheep = null;
	var playerPointer = null;
	//
	STATE.prototype =
	{
		preload: function()
		{
			GAME.load.image('background-template', 'resources/assets/2d/background-template.png');
		},
		
		create: function()
		{
			GAME.stage.backgroundColor = '#FFFFFF';
			GAME.add.sprite(0, 0, 'background-template');
			
			GAME.physics.startSystem(Phaser.Physics.BOX2D);
			GAME.physics.box2d.setBoundsToWorld();
			
			sheep = GAME.add.sprite(50, 50);
			GAME.physics.box2d.enable(sheep);
			sheep.body.setCircle(30);
			
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
		},
		
		update: function()
		{
			if(true) // sheep widzi pointerPosition
			{
				GAME.physics.arcade.moveToXY(sheep, pointerPosition.x, pointerPosition.y, 60, 400);
			}
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
	
	GAME.state.add('SHEEP_STATE', STATE);
	
	return { dispose: dispose };
})();