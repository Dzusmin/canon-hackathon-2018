var BOOT_STATE = (function()
{
	var STATE = function(){};
	STATE.prototype =
	{
		preload: function()
		{
			GAME.time.advancedTiming = true;
		},
		
		create: function()
		{
			VIDEO = document.getElementById('video');
			CANVAS = document.getElementById('canvas');
			CANVAS_CONTEXT = CANVAS.getContext('2d');
			
			GAME.stage.backgroundColor = '#FF00FF';
			GAME.renderer.renderSession.roundPixels = true;
			GAME.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
			
			GAME_STATUS = STATUS.INITIALIZED;
			GAME.state.start('BOARD_SETUP_STATE');
		}
	};
	GAME.state.add('BOOT_STATE', STATE);
})();