var numSquares = 6; //variable which keeps track how many squares are currently
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

// easy mode button
easyBtn.addEventListener("click", function() {
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    // we want ony 3 squares to display
    numSquares = 3;
    //generate new colors ( 3 new colors)
    colors = generateRandomColors(numSquares);
    //pick a new pickedColor
    pickedColor = pickColor();
    // changing the h1 text displayed color( rgb koloru ktory mamy zgadnac)
    colorDisplay.textContent = pickedColor;
    // hiding bottom three squares for easy mode and adding new color for upper 3 squares
    for(var i = 0; i < squares.length; i++) {
        //if there is a color at that index, np pierwsze trzy bo nast trzy beda ukryte
        if(colors[i]) { //if there is
            squares[i].style.backgroundColor = colors[i]; //changing the color of those 3 sqares
        } else { // hiding  the bottom 3 squares!!!!!!!!!!!
            squares[i].style.display = "none";
        }
    }
});

//hard mode button
hardBtn.addEventListener("click", function() {
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    // we want all the squares to display, so 6 squares
    numSquares = 6;
    //generate new colors ( 3 new colors)
    colors = generateRandomColors(numSquares);
    //pick a new pickedColor
    pickedColor = pickColor();
    // changing the h1 text displayed color( rgb koloru ktory mamy zgadnac)
    colorDisplay.textContent = pickedColor;
    // all the squares that have a backgroundColor (czyli wszystkie, bo 6)
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i]; 
        squares[i].style.display = "block"; //czyli zadne squares nie sa ukryte
        }
});

colorDisplay.textContent = pickedColor;

resetButton.addEventListener("click", function() {
    // when clicked on that button we need to generate new colors
    colors = generateRandomColors(numSquares);
    // pick a new random colors from arr
    pickedColor = pickColor();
    //change colorDisplay to match pickedColor
    colorDisplay.textContent = pickedColor;

    this.textContent = "New Colors"; // after showing "Play Again?" we want to show "New Colors" text in the left button (this to w tym przypadku resetButton because we are in the event resetButton listener wiec mozna sie odniesc do resetButton za pomoca this.)
    messageDisplay.textContent = ""; // no text in the span in the middle
    //change colors od squares
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    };
    h1.style.background = "steelblue";
});



for( var i = 0; i < squares.length; i++) {
    //add initial colors to squares
    squares[i].style.backgroundColor = colors[i];
    //add click listener to squares
    squares[i].addEventListener("click", function () {
        //grab color of clicked square
        var clickedColor = this.style.backgroundColor;
        //compare color to pickedColor, checking if user picked the right color
        if(clickedColor === pickedColor) {
            messageDisplay.textContent = "Correct !!"; 
            resetButton.textContent = "Play Again?";
            changeColors(clickedColor);
            h1.style.backgroundColor = clickedColor;
        } else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    });
}


function changeColors(color) {
    //loop through all squares 
    for(var i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.backgroundColor = color;
    }
};


function pickColor () {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

function generateRandomColors(num) {
    //make an array
    var arr = [];
    //repeat num times ( albo 3 albo 6 zaleznie czy easy mode czy hard)
    for(var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return that array
    return arr;
};

function randomColor() {
    //pick a 'red' from 0 -255 - random red shade 
    var r = Math.floor(Math.random() * 256);
    //pick 'green' from 0 -255 = random green shade 
    var g = Math.floor(Math.random() * 256);
    //pick a blue from 0-255 = random blue shade 
    var b = Math.floor(Math.random() * 256);
    // "rgb(r, g, b)" = ukladamy tak jak rgb plus przecinki
    return "rgb(" + r + ", " + g + ", " + b + ")"; //that will generate one random color
};

