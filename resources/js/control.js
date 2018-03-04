window.onload = function()
{
	document.addEventListener("keyup", function(keyEvent)
	{
		switch(keyEvent.keyCode)
		{
			case 70: // F -> fullscreen
				(function()
				{
					if(GAME.scale.isFullScreen)
					{
						GAME.scale.stopFullScreen();
					}
					else
					{
						GAME.scale.startFullScreen(false);
					}
				})();
				break;
			case 13: // Enter -> change state
				if(GAME_STATUS == STATUS.INITIALIZED)
				{
					if(GAME_BOARD == null)
					{
						alert('Nie wykryto ekranu gry');
						break;
					}
					
					SCALE_FIX =
					{
						x: 800 / GAME_BOARD.width,
						y: 600 / GAME_BOARD.height
					};
					
					if(SCALE_FIX.x > 1.7 || SCALE_FIX.y > 1.7)
					{
						alert('Skala jest poza skalą');
						break;
					}
					
					VIDEO.setAttribute('style', 'top: 600px;');
					CANVAS.setAttribute('style', 'top: 600px;');
					BOARD_SETUP_STATE.dispose();
					
					GAME.state.start('CANON_STATE');
					break;
				}
				if(GAME_STATUS == STATUS.CANON)
				{
					GAME.state.start('SHEEP_STATE');
					break;
				}
				break;
			default:
				console.log(keyEvent.which);
		}	
	}, false);
};