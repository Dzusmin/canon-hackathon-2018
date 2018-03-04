var MONALISA_STATE = (function()
{
	var STATE = function(){};
	//
	var pointerPosition =
	{
		x: 0,
		y: 0
	};
	var playerPointer = null;
	var fakeImage = null;
	var fakeImageMask = null;
	//var bitmapMask = null;
	//var fixedImage = null;
	//
	STATE.prototype =
	{
		preload: function()
		{
			GAME.load.image('monalisa-orginal', 'resources/assets/2d/monalisa-orginal.png');
			GAME.load.image('monalisa-fake', 'resources/assets/2d/monalisa-fake.png');
		},
		
		create: function()
		{
			GAME_STATUS = STATUS.MONALISA;
			
			GAME.stage.backgroundColor = '#FFFFFF';
			GAME.add.sprite(0, 0, 'monalisa-fake');
			
			playerPointer = new Phaser.Physics.Box2D.Body(GAME, null, 10, 10);
			playerPointer.setCircle(20);
			playerPointer.kinematic = true;
			
			fakeImage = GAME.add.sprite(0, 0, 'monalisa-orginal');
			fakeImageMask = GAME.add.graphics(0, 0);
			fakeImageMask.beginFill(0xffffff);
			//fakeImageMask.drawCircle(100, 100, 100);
			fakeImage.mask = fakeImageMask;
			
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
			playerPointer.x = pointerPosition.x;
			playerPointer.y = pointerPosition.y;
			//fakeImageMask.x = pointerPosition.x;
			//fakeImageMask.y = pointerPosition.y;
			fakeImageMask.drawCircle(playerPointer.x, playerPointer.y, 50);
			fakeImageMask.update();
			fakeImage.mask = fakeImageMask;
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
	
	GAME.state.add('MONALISA_STATE', STATE);
	
	return { dispose: dispose };
})();
