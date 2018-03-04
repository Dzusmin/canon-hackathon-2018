var BOARD_SETUP_STATE = (function()
{
	var STATE = function(){};
	STATE.prototype =
	{
		create: function()
		{
			TRACKER = new tracking.ColorTracker('magenta');
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
					GAME_BOARD = rect;
				});				
			});
		}
	};
	
	var dispose = function()
	{
		TRACKING_TRACK.stop();
		TRACKER = null;
		TRACKING_TRACK = null;
	};
	
	GAME.state.add('BOARD_SETUP_STATE', STATE);
	
	return { dispose: dispose };
})();