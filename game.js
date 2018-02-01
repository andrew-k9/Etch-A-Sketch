/*******************************************************************
*
*	Author: 		andrew-k9
*
*	Name: 			game.js
*   Description: 	Creates an Etch-A-Sketch board and updates it
*					uppon mouse-over and button events
*
*	Date Created: 	29-01-2018
*
*********************************************************************/

//
// Global Variables for size of the grid and color of the etch-a-sketch line
// COLOR can be a function for the "rainbow" implementation
const SIZE_GRID = 560;
var COLOR = 'black'

//
// 
const container = document.querySelector('#container');
let temp = init(16);
const buttons = document.querySelectorAll('button');

if(temp === false){
	alert('Unexpected error');
}

/************************************************************************
*
*	function: 		 init()
*
*   Description: 	 Initializes the board with as many divs as the user
*					 inputs or is default.
*
*	@param {integer} size - the Size of the 
*
*	Returns;		 boolean false when an error occurs
*
*********************************************************************/
function init(size){
	let respond = true;

	// create the size of the boxes that get colored in
	let box = SIZE_GRID / size;
	container.innerHTML = " ";
	COLOR = 'black';

	// set the attributes of the container
	// I have no idea why the div needs to be there, but the editable field breaks w/out it ¯\_(ツ)_/¯ 
	const div = document.createElement('div'); 
	container.setAttribute('style', `width: ${SIZE_GRID}px; height: ${SIZE_GRID}px; background-color:lightgray`);

	// add size^2 ammount of 
	for(let i = 0; i < (size * size); ++i){
		const div = document.createElement('div');
		div.setAttribute('style',`box-sizing: border-box; display: inline-block; width: ${box}px; height: ${box}px; color: lightgray`);
		container.appendChild(div);
	}
	// add mouseover listeners to the divs
	const divs = document.querySelectorAll('div');
	divs.forEach((div) =>{ 
		div.onmouseover = function () {
			if(div.style.color === 'lightgray'){
				// case for when COLOR is a function
				if(typeof COLOR != 'string'){
					div.style.backgroundColor = COLOR();
					div.style.color = COLOR();
				}else{
					div.style.backgroundColor = COLOR;
					div.style.color = COLOR;
				}
			}
		};
	});

	return(respond);
}

/************************************************************************
*
*	function: 		 randColor()
*
*   Description: 	 makes a random integer value for rgb() css function
*
*	Returns:		 random integer 1 <= val <= 256
*
*********************************************************************/
function randColor(){
	return Math.floor(Math.random() * 255 + 1);
}

// evevent listeners for functions
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {

  	// 
    switch(button.id){
    	case '0':
    		COLOR = 'orange';
    		break;
    	case '1':
    		COLOR = 'green';
    		break;
    	case '2':
    		COLOR = 'yellow';
    		break;
    	case '3':
    		COLOR = 'purple';
    		break;
    	case '4':
    		COLOR = 'pink';
    		break;
    	case '5':
    		// For the "rainbow" portion of the project
    		COLOR = function(){
    			return( `rgb(${randColor()},${randColor()},${randColor()})`);
    		};
    		break;
    	case '6':
    		let ans = parseInt(prompt("Side of new Etch-A-Sketch",16));

    		if(isNaN(ans)){
    			ans = 16;
    		} else if(ans < 4 || ans > 90){
    			alert('min / max exceded... Default selected');
    			ans = 16;
    		} else if(ans % 2 != 0){
    			--ans;
    		} 

    		init(ans);
    		break;
    	default:
    		break;
    }

  });
});

