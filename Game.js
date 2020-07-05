class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    runner1 = createSprite(100,200);
    runner1.addImage("R1",runner1_img);
    runner2 = createSprite(300,200);
    runner2.addImage("R2",runner2_img);
    runner3 = createSprite(500,200);
    runner3.addImage("R3",runner3_img);
    runner4 = createSprite(700,200);
    runner4.addImage("R4",runner4_img);
    runners = [runner1, runner2, runner3, runner4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    //player.getRunnersAtEnd();
    
    if(allPlayers !== undefined){

      background(ground_img);
      image(track_img,-480,0,displayWidth,displayHeight);
      //var display_position = 400;
      
      //index of the array
      var index = 0;

      //x and y position of the runners
      var x = -350;
      var y = -60;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the runners a little away from each other in x direction
        y = y + 180;
        //use data form the database to display the runners in y direction
        x = 30+allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;

        if (index === player.index){
          runners[index - 1].shapeColor = "red";
          camera.position.x = x;
          camera.position.y = displayHeight/2;
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance>300){
      gameState=2;
      player.rank+=1;
      Player.updateRunnerssAtEnd(player.rank);
      textSize(20);
      text("Well Done! Your rank is "+player.rank,200,200);
    }


    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
