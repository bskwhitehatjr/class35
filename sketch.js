var database,position;

function setup()
{
  // Get a reference to the database service (to setup a database )
  database = firebase.database();


  createCanvas(500,500);

  Ball = createSprite(250,250,20,20);
  Ball.shapeColor = "red";

  //READ DATA FROM DATABASE
  var BallPosition = database.ref('ball/position');
  BallPosition.on("value", readPosition);

   //.ref() is used to refer about data base value we care about
  //.on() creates a listener which keeps listening to the changes in database
}

function draw()
{
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,1);
    }
    drawSprites();
  
}
//STORE / WRITE IN DATABASE 
function writePosition(x,y)
{
  //.set() is used to set the values in database 
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data)
{
  //.val() to extract values from data and store  in var position
  position = data.val();
  console.log(position.x);
  Ball.x = position.x;
  Ball.y = position.y;
}


