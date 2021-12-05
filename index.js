let board = document.getElementById('board');
let inputDir = {x:0,y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const  musicSound = new Audio('music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y:15}
];
let food = {x: 6,y:7};
//Game Function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime -lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(sarr){
//if you bump into yourself
for(let i = 1;i < snakeArr.length;i++){
    if(snakeArr[i].x === snakeArr[0].x &&  snakeArr[i].y === snakeArr[0].y){
        return true;
    }
}
//if you bump into wall
    if(snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0){
    return true;
    }

}
//gameEngine Start
function gameEngine(){
    //part 1: updating the snake array
  if(isCollide(snakeArr)){
      gameOverSound.play();
      musicSound.pause();
      inputDir = {x:0,y:0};
 alert("Game over, press any key to play Again");
 snakeArr = [{x:13,y:15}];
musicSound.play();
score = 0;

}
//if you have eaten the food , increment the score
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    score += 1;
    scoreBox.innerHTML = "score : " + score;
    foodSound.play();
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x,y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x : Math.round(a + (b-1) * Math.random()), y : Math.round(a + (b-1) * Math.random())    }
}

//Moving the snake
for (let i = snakeArr.length - 2; i >= 0; i--) {
   
   snakeArr[i+1] = {...snakeArr[i]};
    
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;



//part 2:Display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e,index) => {
        //display the snake
  snakeElement= document.createElement('div');
  snakeElement.style.gridRowStart = e.y;
  snakeElement.style.gridColumnStart = e.x;
  if(index === 0){
      snakeElement.classList.add('head');
  }else{
    snakeElement.classList.add('snake');
  
  }
  board.appendChild(snakeElement);
        //display the food
        foodElement= document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
      
});
}






//Main Login starts here
let hiscore = localStorage.getItem("hiscrore");
if(hiscore === null){
    localStorage.setItem("hiscrore",JSON.stringify(hiscore));
}
window.requestAnimationFrame(main);

window.addEventListener('keydown',e =>{
inputDir = {x:0,y:1} //start the game
moveSound.play(); 
switch(e.key){
    case "ArrowUp":
       
        inputDir.x = 0;
        inputDir.y = -1;
    break; 
    case "ArrowDown":
       
        inputDir.x = 0;
        inputDir.y = 1;
    break; 
    case "ArrowLeft":
       
        inputDir.x = -1;
        inputDir.y = 0;
    break; 
    case "ArrowRight":
       
        inputDir.x = 1;
        inputDir.y = 0;
    break; 

}
});