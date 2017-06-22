
var gameObject = function(playerData) {

	var game = {
	}

	function initialize() {
		game.engine = new Phaser.Game(1024, 576, Phaser.AUTO, '', { preload: preload, create: create, update: update });
	}


	function preload() {
		game.engine.load.image('sky', '/js/gameFront/assets/sky.png');
		game.engine.load.image('ground', '/js/gameFront/assets/platform.png');
		game.engine.load.image('star', '/js/gameFront/assets/star.png');
		game.engine.load.spritesheet('dude', '/js/gameFront/assets/dude.png', 32, 48);
	}

	function create() {

		game.engine.physics.startSystem(Phaser.Physics.ARCADE);
		    //  A simple background for our game
	    game.engine.add.sprite(0, 0, 'sky');

	    //  The platforms group contains the ground and the 2 ledges we can jump on
	    platforms = game.engine.add.group();

	    //  We will enable physics for any object that is created in this group
	    platforms.enableBody = true;

	    // Here we create the ground.
	    var ground = platforms.create(0, game.engine.world.height - 64, 'ground');

	    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	    ground.scale.setTo(2, 2);

	    //  This stops it from falling away when you jump on it
	    ground.body.immovable = true;

	    //  Now let's create two ledges
	    var ledge = platforms.create(400, 400, 'ground');

	    ledge.body.immovable = true;

	    ledge2 = platforms.create(-150, 250, 'ground');

	    ledge2.body.immovable = true;

	    var spawnX = game.engine.world.width/100;
	    var spawnY = game.engine.world.height - 150;
/*
	    for(var i = 0; i < game.players.length; i++){

	    	var spawnX = game.engine.world.width/100;
	    	var spawnY = game.engine.world.height - 150;

	    	if(i == 1){
	    		spawnX = spawnX * 97;
	    	}

	    	player = game.engine.add.sprite(spawnX, spawnY, 'dude');

		    //  We need to enable physics on the player
		    game.engine.physics.arcade.enable(player);

		    //  Player physics properties. Give the little guy a slight bounce.
		    player.body.bounce.y = 0.2;
		    player.body.gravity.y = 300;
		    player.body.collideWorldBounds = true;

		    //  Our two animations, walking left and right.
		    player.animations.add('left', [0, 1, 2, 3], 10, true);
		    player.animations.add('right', [5, 6, 7, 8], 10, true);
		    game.players[i].x = spawnX;
		    game.players[i].y = spawnY;

		    var playerID = game.players[i]._id;

		    console.log(playerID);
		    game.playerID = player;
		    console.log(game.playerID);
	    };
	    */

	    player1 = game.engine.add.sprite(spawnX, spawnY, 'dude');

		//  We need to enable physics on the player
		game.engine.physics.arcade.enable(player1);

		    //  Player physics properties. Give the little guy a slight bounce.
		player1.body.bounce.y = 0.2;
		player1.body.gravity.y = 300;
		player1.body.collideWorldBounds = true;

		    //  Our two animations, walking left and right.
		player1.animations.add('left', [0, 1, 2, 3], 10, true);
		player1.animations.add('right', [5, 6, 7, 8], 10, true);

		game[playerData.player1] = player1;

		player2 = game.engine.add.sprite(spawnX * 97, spawnY, 'dude');

		//  We need to enable physics on the player
		game.engine.physics.arcade.enable(player2);

		    //  Player physics properties. Give the little guy a slight bounce.
		player2.body.bounce.y = 0.2;
		player2.body.gravity.y = 300;
		player2.body.collideWorldBounds = true;

		    //  Our two animations, walking left and right.
		player2.animations.add('left', [0, 1, 2, 3], 10, true);
		player2.animations.add('right', [5, 6, 7, 8], 10, true);

		game[playerData.player2] = player2;
	}


	function update() {

		/*
		if(game.players.length != 0){

			var hitPlatform = game.engine.physics.arcade.collide(player, platforms);
			cursors = game.engine.input.keyboard.createCursorKeys();

			    //  Reset the players velocity (movement)
		    player.body.velocity.x = 0;

		    if (cursors.left.isDown)
		    {
		        //  Move to the left
		        player.body.velocity.x = -150;

		        player.animations.play('left');
		    }
		    else if (cursors.right.isDown)
		    {
		        //  Move to the right
		        player.body.velocity.x = 150;

		        player.animations.play('right');
		    }
		    else
		    {
		        //  Stand still
		        player.animations.stop();

		        player.frame = 4;
		    }

		    //  Allow the player to jump if they are touching the ground.
		    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
		    {
		        player.body.velocity.y = -350;
		    }
		}
		
		*/
	    
	}

	initialize();



/*
	function initializeGame(gameObject) {
		socket.emit('Create Game', gameObject);
	};

  initializeGame(game);

  socket.on('Game Approved', function (data) {
  	game = data;
  });

  

  this.addNewPlayer = function(player){
  			
  		if(player.playerData.id == 0){

  			player1 = game.engine.add.sprite(game.engine.world.width/100, game.engine.world.height - 150, 'dude');

		    //  We need to enable physics on the player
		    game.engine.physics.arcade.enable(player1);

		    //  Player physics properties. Give the little guy a slight bounce.
		    player1.body.bounce.y = 0.2;
		    player1.body.gravity.y = 300;
		    player1.body.collideWorldBounds = true;

		    //  Our two animations, walking left and right.
		    player1.animations.add('left', [0, 1, 2, 3], 10, true);
		    player1.animations.add('right', [5, 6, 7, 8], 10, true);

		    game.players.push(player.playerSocket.id);
		    game[player.playerSocket.id] = player1;
		 }

		  if(player.playerData.id == 1){
  			player2 = game.engine.add.sprite(game.engine.world.width/100 * 98, game.engine.world.height - 150, 'dude');

		    //  We need to enable physics on the player
		    game.engine.physics.arcade.enable(player2);

		    //  Player physics properties. Give the little guy a slight bounce.
		    player2.body.bounce.y = 0.2;
		    player2.body.gravity.y = 300;
		    player2.body.collideWorldBounds = true;

		    //  Our two animations, walking left and right.
		    player2.animations.add('left', [0, 1, 2, 3], 10, true);
		    player2.animations.add('right', [5, 6, 7, 8], 10, true);

			game.players.push(player.playerSocket.id);
		    game[player.playerSocket.id] = player2;
		 }
  }

*/

 this.moveLeft = function(userID){

 	console.log(userID);
 	var pawn = game[userID];

	pawn.body.velocity.x = -150;

	pawn.animations.play('left');

  }
	
 this.stopLeft = function(userID){

	var pawn = game[userID];

	pawn.body.velocity.x = 0;
	pawn.animations.stop();
    pawn.frame = 4;

  }

 this.moveRight = function(userID){

	var pawn = game[userID];

	pawn.body.velocity.x = 150;

	pawn.animations.play('right');

  }
	this.stopRight = function(userID)
 {
	var pawn = game[userID];

	pawn.body.velocity.x = 0;
	pawn.animations.stop();
    pawn.frame = 4;

  }





}

