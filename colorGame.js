var numSquares = 6; //variable which keeps track how many squares are currently
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// function that runs everything that needs to be run when page opens
init();


function init() {
    //modeButtons eventListeners
    setUpModeButtons();
    // squares color picking
    setUpSquares();
    reset();
};


function setUpModeButtons() {
    //loop through modeButtons (all of them) - modeButtons eventListeners
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected"); // remove selected button ("easy or hard" wiec sie nie podsiwetla ze klikniety)
            modeButtons[1].classList.remove("selected"); // remove selected button ("easy or hard" wiec sie nie podsiwetla ze klikniety)
            this.classList.add("selected"); // dzieki temy selected button czyli ten co klikniety bedzie zawsze podwietlony i tylko on
            //ternary operator - the code is shorter
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6; 
            // if(this.textContent === "Easy") {
            //     numSquares = 3;
            // } else {
            //     numSquares = 6;
            // }
            reset();
        });
    };
};


function setUpSquares() {
    for( var i = 0; i < squares.length; i++) {
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
};


//creating new function because steps we take are present in few places 
function reset() {
    //generating the random colors depending on the numSquares parameter
    colors = generateRandomColors(numSquares);
    // pick a new random colors from arr
    pickedColor = pickColor();
    //change colorDisplay to match pickedColor
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors"; // after showing "Play Again?" we want to show "New Colors" text in the left button (this to w tym przypadku resetButton because we are in the event resetButton listener wiec mozna sie odniesc do resetButton za pomoca this.)
    messageDisplay.textContent = ""; // no text in the span in the middle
    //change colors od squares
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    };
    h1.style.background = "steelblue";
};

// // easy mode button
// easyBtn.addEventListener("click", function() {
//     hardBtn.classList.remove("selected");
//     easyBtn.classList.add("selected");
//     // we want ony 3 squares to display
//     numSquares = 3;
//     //generate new colors ( 3 new colors)
//     colors = generateRandomColors(numSquares);
//     //pick a new pickedColor
//     pickedColor = pickColor();
//     // changing the h1 text displayed color( rgb koloru ktory mamy zgadnac)
//     colorDisplay.textContent = pickedColor;
//     // hiding bottom three squares for easy mode and adding new color for upper 3 squares
//     for(var i = 0; i < squares.length; i++) {
//         //if there is a color at that index, np pierwsze trzy bo nast trzy beda ukryte
//         if(colors[i]) { //if there is
//             squares[i].style.backgroundColor = colors[i]; //changing the color of those 3 sqares
//         } else { // hiding  the bottom 3 squares!!!!!!!!!!!
//             squares[i].style.display = "none";
//         }
//     }
// });

// //hard mode button
// hardBtn.addEventListener("click", function() {
//     hardBtn.classList.add("selected");
//     easyBtn.classList.remove("selected");
//     // we want all the squares to display, so 6 squares
//     numSquares = 6;
//     //generate new colors ( 3 new colors)
//     colors = generateRandomColors(numSquares);
//     //pick a new pickedColor
//     pickedColor = pickColor();
//     // changing the h1 text displayed color( rgb koloru ktory mamy zgadnac)
//     colorDisplay.textContent = pickedColor;
//     // all the squares that have a backgroundColor (czyli wszystkie, bo 6)
//     for(var i = 0; i < squares.length; i++) {
//         squares[i].style.backgroundColor = colors[i]; 
//         squares[i].style.display = "block"; //czyli zadne squares nie sa ukryte
//         }
// });



resetButton.addEventListener("click", function() {
    reset();
});


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

