var numSquares=6;
var colors=[]; 
var pickedColor; 
var squares=document.querySelectorAll(".square"); //defines squares from html
var colorDisplay=document.querySelector("#colorDisplay"); //will letus display picked color RGB
var messageDisplay=document.querySelector("#message"); //displays correct or try again
var h1=document.querySelector("h1"); //will let us change h1 color to be picked color when clicked
var resetButton=document.querySelector("#reset"); //resets board
var modeButtons=document.querySelectorAll(".mode");

init();

function init() {
	setupModeButtons();
	setupSquares();
	reset(); 
}

resetButton.addEventListener("click", function(){
	reset();
});

function setupModeButtons() {
	//mode button event listeners
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function () {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent==="Easy"?numSquares=3:numSquares=6;
			reset();
		});
	}
}

function setupSquares() {
	//squares event listener
	for(var i=0; i<squares.length; i++){
		squares[i].addEventListener("click", function(){
			var clickedColor=this.style.background;
			if(clickedColor===pickedColor){
				messageDisplay.textContent="Correct!";
				resetButton.textContent="Play again?";
				changeColors(clickedColor);
				h1.style.background=clickedColor;
			}
			else{
					this.style.background="#232323";
					messageDisplay.textContent="Try Again";
				}
		});
	}
}
function reset() {
	colors=generateRandomColors(numSquares);
	pickedColor=pickColor(); //picks new winning color
	colorDisplay.textContent=pickedColor;
	h1.style.background="steelblue";
	messageDisplay.textContent="";
	resetButton.textContent="New Colors";
	for(var i=0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.display="block";
			squares[i].style.background=colors[i];
		}
		else{squares[i].style.display="none";}
	}
}

//to make all squares match pickedColor if you guess correctly
function changeColors(color){
	for(var i=0; i<colors.length; i++){
		squares[i].style.background=color;
	}
}

function pickColor(){
	var random=Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr=[];
	for(var i=0; i<num; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r= Math.floor(Math.random()*256);
	var g= Math.floor(Math.random()*256);
	var b= Math.floor(Math.random()*256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}