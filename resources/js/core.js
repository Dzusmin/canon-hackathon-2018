var GAME = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

var STATUS =
{
	UNINITIALIZED: 0,
	INITIALIZED: 1,
	CANON: 2,
	SHEEP: 3,
	MONALISA: 4
};
var GAME_STATUS = STATUS.UNINITIALIZED;

var VIDEO = null;
var CANVAS = null;
var CANVAS_CONTEXT = null;
var TRACKER = null;
var TRACKING_TRACK = null;

var GAME_BOARD = null;
var SCALE_FIX = null;