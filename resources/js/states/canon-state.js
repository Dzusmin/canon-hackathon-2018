var CANON_STATE = (function()
{
	var STATE = function(){};
	//
	var logos = [];
	//
	STATE.prototype =
	{
		preload: function()
		{
			GAME.load.image('canon-logo', 'resources/assets/2d/canon-logo.png');
		},
		
		create: function()
		{
			GAME_STATUS = STATUS.CANON;
			
			GAME.stage.backgroundColor = '#fff';
			
			GAME.physics.startSystem(Phaser.Physics.BOX2D);
			GAME.physics.box2d.gravity.y = 400;
			
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
			
			// canon logo
			for(var i = 0; i < 5; i++)
			{
				var canonLogo = GAME.add.sprite(GAME.world.randomX, -40*(i+1), 'canon-logo');
				GAME.physics.box2d.enable(canonLogo);
				logos.push(canonLogo);
			}
		},
		
		update: function()
		{
			logos.forEach(function(logo, index) {
				if (logo.y > 650){
					logo.destroy();
					logos.splice(index, 1);

          var canonLogo = GAME.add.sprite(GAME.world.randomX, -40, 'canon-logo');
          GAME.physics.box2d.enable(canonLogo);
          logos.push(canonLogo);
				}
      });
		},
		
		render: function()
		{
			GAME.debug.box2dWorld();
			GAME.debug.text('FPS: ' + (GAME.time.fps || 'FPS: --'), 10, 20, '#00FF00');
		}
	};
	
	GAME.state.add('CANON_STATE', STATE);
})();
