function mapModeInit() {
	$('body').css('overflow', 'scroll');

	$('#mapMode').fadeIn();
	$('#generateColliders').fadeIn();
	$('#generateModifiers').fadeIn();

	for (let i = 0; i < 10000; i++) {
		let myCell = document.createElement('div');
		myCell.classList.add("cell");
		document.getElementById('map').appendChild(myCell);
	}

	// Controls for building map elements
	$('.cell').click(function() {
		$(this).toggleClass('active');
		// $(this).addClass( prompt("Input one of the following: wall, rock, bush, river " } );
	})
	$('.cell').dblclick(function() {
		$(this).toggleClass('active2');
		$(this).data("courage", prompt("Please specify a value of this modifier. (i.e. 5 or -5)"));
	})
	$(".cell").contextmenu(function() {
		alert("x: " + $(this).offset().left + " , y: " + $(this).offset().top);
	});

	let mapColliders = [];

	function generateCollidersMap() {
		mapColliders = [];

		$('.active').each(function() {
			let y = $(this).offset().top - 50;
			let x = $(this).offset().left;
			let obj = {
				"x": x,
				"y": y
			};
			mapColliders.push(obj);
		});
		console.log(mapColliders);
	}

	let mapModifiers = [];

	function generateModifiersMap() {
		mapModifiers = [];

		$('.active2').each(function() {
			let y = $(this).offset().top - 50;
			let x = $(this).offset().left;
			let mod = $(this).data('courage');
			console.log(mod);
			let obj = {
				"x": x,
				"y": y,
				"mod": mod
			};
			mapModifiers.push(obj);
		});
		console.log(mapModifiers);
	}

	$('#generateColliders').on("click", function(e) {
		e.preventDefault();
		generateCollidersMap();
	});

	$('#generateModifiers').on("click", function(e) {
		e.preventDefault();
		generateModifiersMap();
	});

}

// Character position
let curPosX = 64;
let curPosY = 64;

// Define item inventory
let curItems = {
	"homework": {
		"isCollected": false,
		"isHome": false
	},
	"backpack": {
		"isCollected": false,
		"isHome": false
	},
	"dog": {
		"isCollected": false,
		"isHome": false
	},
	"school": {
		"isCollected": false,
		"isHome": false
	},
	"store": {
		"isCollected": false,
		"isHome": false
	},
	"milk": {
		"isCollected": false,
		"isHome": false
	}
}

// Character size
let charSize = 32;

// Character move speed
let animSpeed = 100;

// Character move boolean
let canMove = true;
let canMoveX = true;
let canMoveY = true;

// Window scroll position indicators
let currViewX = 1;
let currViewY = 1;
let currX = 0;
let currY = 0;


// Window scroll variables
let isLocked = false;
let scrollAdv = window.innerwidth / 2;

// Initial courage
let curCourage = 100;

// Courage interval
let curInterval = 0;

// Speed at which courage drops
let dropSpeed = -5;

// Speed at which courage rises;
let riseSpeed = 10;

// Build a wall
let myWall = document.createElement("div");
myWall.classList.add('wall');

// Define cells that are off limits

let colliderCells=[{"x":0,"y":0},{"x":32,"y":0},{"x":64,"y":0},{"x":96,"y":0},{"x":128,"y":0},{"x":160,"y":0},{"x":192,"y":0},{"x":224,"y":0},{"x":256,"y":0},{"x":288,"y":0},{"x":320,"y":0},{"x":352,"y":0},{"x":384,"y":0},{"x":416,"y":0},{"x":448,"y":0},{"x":480,"y":0},{"x":512,"y":0},{"x":544,"y":0},{"x":576,"y":0},{"x":608,"y":0},{"x":640,"y":0},{"x":672,"y":0},{"x":704,"y":0},{"x":736,"y":0},{"x":768,"y":0},{"x":800,"y":0},{"x":832,"y":0},{"x":864,"y":0},{"x":896,"y":0},{"x":928,"y":0},{"x":960,"y":0},{"x":992,"y":0},{"x":1024,"y":0},{"x":1056,"y":0},{"x":1088,"y":0},{"x":1120,"y":0},{"x":1152,"y":0},{"x":1184,"y":0},{"x":1216,"y":0},{"x":1248,"y":0},{"x":1280,"y":0},{"x":1312,"y":0},{"x":1344,"y":0},{"x":1376,"y":0},{"x":1408,"y":0},{"x":1440,"y":0},{"x":1472,"y":0},{"x":1504,"y":0},{"x":1536,"y":0},{"x":1568,"y":0},{"x":1600,"y":0},{"x":1632,"y":0},{"x":1664,"y":0},{"x":1696,"y":0},{"x":1728,"y":0},{"x":1760,"y":0},{"x":1792,"y":0},{"x":1824,"y":0},{"x":1856,"y":0},{"x":1888,"y":0},{"x":1920,"y":0},{"x":0,"y":32},{"x":448,"y":32},{"x":1120,"y":32},{"x":1920,"y":32},{"x":0,"y":64},{"x":448,"y":64},{"x":1120,"y":64},{"x":1920,"y":64},{"x":0,"y":96},{"x":448,"y":96},{"x":1120,"y":96},{"x":1920,"y":96},{"x":0,"y":128},{"x":448,"y":128},{"x":1120,"y":128},{"x":1920,"y":128},{"x":0,"y":160},{"x":448,"y":160},{"x":1120,"y":160},{"x":1920,"y":160},{"x":0,"y":192},{"x":448,"y":192},{"x":1120,"y":192},{"x":1920,"y":192},{"x":0,"y":224},{"x":32,"y":224},{"x":64,"y":224},{"x":96,"y":224},{"x":128,"y":224},{"x":160,"y":224},{"x":192,"y":224},{"x":224,"y":224},{"x":448,"y":224},{"x":1120,"y":224},{"x":1920,"y":224},{"x":0,"y":256},{"x":224,"y":256},{"x":448,"y":256},{"x":1120,"y":256},{"x":1920,"y":256},{"x":0,"y":288},{"x":224,"y":288},{"x":448,"y":288},{"x":1120,"y":288},{"x":1920,"y":288},{"x":0,"y":320},{"x":224,"y":320},{"x":448,"y":320},{"x":1120,"y":320},{"x":1920,"y":320},{"x":0,"y":352},{"x":224,"y":352},{"x":448,"y":352},{"x":1120,"y":352},{"x":1920,"y":352},{"x":0,"y":384},{"x":224,"y":384},{"x":352,"y":384},{"x":384,"y":384},{"x":416,"y":384},{"x":448,"y":384},{"x":480,"y":384},{"x":512,"y":384},{"x":544,"y":384},{"x":576,"y":384},{"x":608,"y":384},{"x":640,"y":384},{"x":672,"y":384},{"x":704,"y":384},{"x":736,"y":384},{"x":768,"y":384},{"x":800,"y":384},{"x":832,"y":384},{"x":864,"y":384},{"x":896,"y":384},{"x":928,"y":384},{"x":960,"y":384},{"x":1088,"y":384},{"x":1120,"y":384},{"x":1152,"y":384},{"x":1184,"y":384},{"x":1216,"y":384},{"x":1248,"y":384},{"x":1920,"y":384},{"x":0,"y":416},{"x":32,"y":416},{"x":160,"y":416},{"x":192,"y":416},{"x":224,"y":416},{"x":544,"y":416},{"x":1920,"y":416},{"x":0,"y":448},{"x":224,"y":448},{"x":544,"y":448},{"x":1920,"y":448},{"x":0,"y":480},{"x":544,"y":480},{"x":1920,"y":480},{"x":0,"y":512},{"x":544,"y":512},{"x":1568,"y":512},{"x":1600,"y":512},{"x":1632,"y":512},{"x":1664,"y":512},{"x":1696,"y":512},{"x":1824,"y":512},{"x":1856,"y":512},{"x":1888,"y":512},{"x":1920,"y":512},{"x":0,"y":544},{"x":544,"y":544},{"x":1568,"y":544},{"x":1920,"y":544},{"x":0,"y":576},{"x":32,"y":576},{"x":64,"y":576},{"x":96,"y":576},{"x":128,"y":576},{"x":160,"y":576},{"x":192,"y":576},{"x":224,"y":576},{"x":544,"y":576},{"x":1568,"y":576},{"x":1920,"y":576},{"x":0,"y":608},{"x":224,"y":608},{"x":544,"y":608},{"x":1568,"y":608},{"x":1920,"y":608},{"x":0,"y":640},{"x":224,"y":640},{"x":256,"y":640},{"x":288,"y":640},{"x":320,"y":640},{"x":352,"y":640},{"x":384,"y":640},{"x":416,"y":640},{"x":544,"y":640},{"x":1568,"y":640},{"x":1920,"y":640},{"x":0,"y":672},{"x":544,"y":672},{"x":1568,"y":672},{"x":1920,"y":672},{"x":0,"y":704},{"x":544,"y":704},{"x":1568,"y":704},{"x":1920,"y":704},{"x":0,"y":736},{"x":544,"y":736},{"x":1568,"y":736},{"x":1920,"y":736},{"x":0,"y":768},{"x":544,"y":768},{"x":1568,"y":768},{"x":1920,"y":768},{"x":0,"y":800},{"x":160,"y":800},{"x":192,"y":800},{"x":224,"y":800},{"x":256,"y":800},{"x":288,"y":800},{"x":320,"y":800},{"x":352,"y":800},{"x":384,"y":800},{"x":416,"y":800},{"x":448,"y":800},{"x":480,"y":800},{"x":512,"y":800},{"x":544,"y":800},{"x":1568,"y":800},{"x":1920,"y":800},{"x":0,"y":832},{"x":992,"y":832},{"x":1024,"y":832},{"x":1056,"y":832},{"x":1088,"y":832},{"x":1120,"y":832},{"x":1152,"y":832},{"x":1184,"y":832},{"x":1216,"y":832},{"x":1248,"y":832},{"x":1280,"y":832},{"x":1312,"y":832},{"x":1344,"y":832},{"x":1376,"y":832},{"x":1408,"y":832},{"x":1440,"y":832},{"x":1472,"y":832},{"x":1504,"y":832},{"x":1536,"y":832},{"x":1568,"y":832},{"x":1920,"y":832},{"x":0,"y":864},{"x":992,"y":864},{"x":1280,"y":864},{"x":1920,"y":864},{"x":0,"y":896},{"x":1280,"y":896},{"x":1920,"y":896},{"x":0,"y":928},{"x":1280,"y":928},{"x":1920,"y":928},{"x":0,"y":960},{"x":1280,"y":960},{"x":1920,"y":960},{"x":0,"y":992},{"x":992,"y":992},{"x":1280,"y":992},{"x":1920,"y":992},{"x":0,"y":1024},{"x":992,"y":1024},{"x":1280,"y":1024},{"x":1920,"y":1024},{"x":0,"y":1056},{"x":768,"y":1056},{"x":800,"y":1056},{"x":832,"y":1056},{"x":864,"y":1056},{"x":896,"y":1056},{"x":928,"y":1056},{"x":960,"y":1056},{"x":992,"y":1056},{"x":1280,"y":1056},{"x":1920,"y":1056},{"x":0,"y":1088},{"x":768,"y":1088},{"x":1280,"y":1088},{"x":1920,"y":1088},{"x":0,"y":1120},{"x":768,"y":1120},{"x":1280,"y":1120},{"x":1920,"y":1120},{"x":0,"y":1152},{"x":672,"y":1152},{"x":704,"y":1152},{"x":736,"y":1152},{"x":768,"y":1152},{"x":1280,"y":1152},{"x":1920,"y":1152},{"x":0,"y":1184},{"x":672,"y":1184},{"x":1280,"y":1184},{"x":1920,"y":1184},{"x":0,"y":1216},{"x":672,"y":1216},{"x":1280,"y":1216},{"x":1920,"y":1216},{"x":0,"y":1248},{"x":32,"y":1248},{"x":64,"y":1248},{"x":96,"y":1248},{"x":128,"y":1248},{"x":160,"y":1248},{"x":192,"y":1248},{"x":224,"y":1248},{"x":256,"y":1248},{"x":288,"y":1248},{"x":320,"y":1248},{"x":352,"y":1248},{"x":384,"y":1248},{"x":416,"y":1248},{"x":448,"y":1248},{"x":480,"y":1248},{"x":512,"y":1248},{"x":544,"y":1248},{"x":576,"y":1248},{"x":608,"y":1248},{"x":640,"y":1248},{"x":672,"y":1248},{"x":704,"y":1248},{"x":736,"y":1248},{"x":768,"y":1248},{"x":800,"y":1248},{"x":832,"y":1248},{"x":864,"y":1248},{"x":896,"y":1248},{"x":928,"y":1248},{"x":960,"y":1248},{"x":992,"y":1248},{"x":1024,"y":1248},{"x":1056,"y":1248},{"x":1088,"y":1248},{"x":1120,"y":1248},{"x":1152,"y":1248},{"x":1184,"y":1248},{"x":1216,"y":1248},{"x":1248,"y":1248},{"x":1280,"y":1248},{"x":1312,"y":1248},{"x":1344,"y":1248},{"x":1376,"y":1248},{"x":1408,"y":1248},{"x":1440,"y":1248},{"x":1472,"y":1248},{"x":1504,"y":1248},{"x":1536,"y":1248},{"x":1568,"y":1248},{"x":1600,"y":1248},{"x":1632,"y":1248},{"x":1664,"y":1248},{"x":1696,"y":1248},{"x":1728,"y":1248},{"x":1760,"y":1248},{"x":1792,"y":1248},{"x":1824,"y":1248},{"x":1856,"y":1248},{"x":1888,"y":1248},{"x":1920,"y":1248},];
let treeCells = [{"x":64,"y":544},{"x":288,"y":672},{"x":416,"y":480},{"x":512,"y":576},{"x":608,"y":768},{"x":608,"y":928},{"x":800,"y":832},{"x":960,"y":768},{"x":544,"y":96},{"x":608,"y":96},{"x":896,"y":96},{"x":960,"y":82},{"x":1024,"y":96},{"x":1216,"y":128},{"x":1280,"y":256},{"x":1344,"y":480},{"x":1664,"y":640},{"x":1632,"y":768},{"x":1856,"y":768},{"x":1760,"y":896},{"x":1440,"y":960},{"x":1568,"y":1024},{"x":1856,"y":1184},{"x":1376,"y":1216},{"x":1408,"y":1152},{"x":1632,"y":1152},{"x":1664,"y":1152},{"x":1696,"y":1216}];
let houseCells = [{"x":32,"y":946},{"x":160,"y":946},{"x":288,"y":946},{"x":1344,"y":114},{"x":288,"y":1074},{"x":416,"y":1074},{"x":544,"y":1074},{"x":608,"y":530},{"x":800,"y":530},{"x":992,"y":530},{"x":1184,"y":530},{"x":704,"y":658},{"x":896,"y":658},{"x":1088,"y":658}];
let houseColliders = [];
let modifierCells = [{
	"x": 1536,
	"y": 448,
	"mod": "5"
}, {
	"x": 1024,
	"y": 544,
	"mod": "5"
}, {
	"x": 768,
	"y": 672,
	"mod": "5"
}, {
	"x": 1600,
	"y": 704,
	"mod": "5"
}, {
	"x": 1728,
	"y": 896,
	"mod": "5"
}, {
	"x": 224,
	"y": 960,
	"mod": "5"
}, {
	"x": 992,
	"y": 1024,
	"mod": "5"
}];
let itemCells = [{
	"x": 960,
	"y": 128,
	"item": "school",
	"isFound": false,
	"img": "images/school.png"
}, {
	"x": 96,
	"y": 288,
	"item": "dog",
	"isFound": false,
	"img": "images/dog.png"
}, {
	"x": 1280,
	"y": 736,
	"item": "homework",
	"isFound": false,
	"img": "images/homework.png"
}, {
	"x": 1344,
	"y": 1120,
	"item": "store",
	"isFound": false,
	"img": "images/store.png"
}, {
	"x": 384,
	"y": 1152,
	"item": "milk",
	"isFound": false,
	"img": "images/milk.png"
}];


// Update map with items not yet found
function loadItems() {
	$('.item').remove();
	for (let i = 0; i < itemCells.length; i++) {
		if (itemCells[i].isFound != true) {
			let myCell = document.createElement('div');
			myCell.classList.add('item');
			myCell.style.left = itemCells[i].x + "px";
			myCell.style.top = itemCells[i].y + "px";
			myCell.style.background = "url('" + itemCells[i].img + "')"
			//myCell.style.border = "1px solid red";
			$('#guide').append(myCell);
			guideHidden = false;
		}
	}
}

function loadHouses() {
	$('.house').remove();
	for (let i = 0; i < houseCells.length; i++) {
		if (houseCells[i].isFound != true) {
			let myCell = document.createElement('div');
			myCell.classList.add('house');
			myCell.style.left = houseCells[i].x + "px";
			myCell.style.top = houseCells[i].y + "px";
			//myCell.style.background = "url('" + houseCells[i].img + "')"
			//myCell.style.border = "1px solid red";
			$('#guide').append(myCell);
			guideHidden = false;
		}
	}
}


function loadColliders() {
	$('#guide').html("");
	$('.wall').remove();
	for (let i = 0; i < colliderCells.length; i++) {
		let myCell = document.createElement('div');
		myCell.classList.add('wall');
		myCell.style.left = colliderCells[i].x + "px";
		myCell.style.top = colliderCells[i].y + "px";
		//myCell.style.border = "1px solid red";
		$('#guide').append(myCell);
	}
}

function loadModifiers() {
	$('.modifier').remove();
	for (let i = 0; i < modifierCells.length; i++) {
		let myCell = document.createElement('div');
		myCell.classList.add('modifier');
		myCell.style.left = modifierCells[i].x + "px";
		myCell.style.top = modifierCells[i].y + "px";
		//myCell.style.border = "1px solid red";
		$('#guide').append(myCell);
	}
}

function loadTrees() {
	$('.tree').remove();
	for (let i = 0; i < treeCells.length; i++) {
		let myCell = document.createElement('div');
		myCell.classList.add('tree');
		myCell.style.left = treeCells[i].x + "px";
		myCell.style.top = treeCells[i].y + "px";
		//myCell.style.border = "1px solid red";
		$('#guide').append(myCell);
	}
}

// Add audio element
let gameAudio = document.createElement("audio");

// Character move controls
$(document).ready(function() {
	// Set welcome message on console.
	$('#console').html("Welcome! Your courage level will drop as you explore the map and bring items home. Return home to rebuild courage!");

	setTimeout(function() {
		// Reset window scroll position
		$(window).scrollLeft(0);
		$(window).scrollTop(0);

		// Show map layers
		loadColliders();
		loadModifiers();
		loadItems();
		loadTrees();
		loadHouses();
		$('#guide').fadeIn();

		// Add audio track
		gameAudio.setAttribute("type", "audio/ogg");
		//gameAudio.setAttribute('autoplay', 'autoplay');
		gameAudio.src = "audio/gametime.oggvorbis.ogg";
		gameAudio.load();
		document.getElementsByTagName('body')[0].appendChild(gameAudio);
	}, 100);

	// Build Mode controls
	$('#mapMode').on("click", function(e) {
		e.preventDefault();
		mapModeInit();
	});

	// Setup map controls
	$('#mapOverlay').hide();

	// Map hidden variable
	let guideHidden = true;

	$('#viewGuide').on("click", function(e) {
		e.preventDefault();
		//$('#mapOverlay').fadeIn();

		if (guideHidden == true) {
			loadColliders();
			loadModifiers();
			loadItems();
			loadHouses()
		}
	});

	$('#closeGuide').on("click", function(e) {
		e.preventDefault();
		$('#mapOverlay').fadeOut();
	});


	// Set character size
	$('#character').css("width", charSize + "px");
	$('#character').css("height", charSize + "px");

	// Set character position
	$('#character').css("top", curPosY + "px");
	$('#character').css("left", curPosX + "px");


	// Set courage 
	$('#courage').css('width', curCourage + "%");


	// Start courage level timer
	setInterval(function() {
		
		if (curCourage <= 0) {
			// if at home
			if (curPosX == 64 && curPosY == 64) {
				curCourage += curInterval;
				$('#courage').animate({
					"width": curCourage + "%"
				}, 500);
			} else {
				// if not at home
				curCourage = -1;
			}
		}
		else if (curCourage > 100) {
			curCourage = 100;
		} else {
			curCourage += curInterval;
			
			if(curCourage >= 100) {
				curCourage = 100;
			}
			
			$('#courage').animate({
				"width": curCourage + "%"
			}, 500);
		}
	}, 1000);


	// increase courage when home
	function checkHome() {
		if (curPosX == 64 && curPosY == 64) {
			// Controls drop speed
			curInterval = riseSpeed;
			
			// deathWall kill
			//if ( $("#deathWall").length != 0 ) {
			//	$("#deathWall").fadeOut(500);
			//	$("#deathWall").remove();
			//}
			
			for (key in curItems) {
				if (curItems.hasOwnProperty(key)) {
					if (curItems[key].isCollected == true) {
						curItems[key].isHome = true;
						//console.log("you brought it home!");
						$('#console').html('You brought home a ' + key + "! Your courage will now last longer!");
						$('#invHome').append($('#invBag').html())
						$('#invBag').html("");
						//console.log(curItems[key]);
					}
				}
			}
			// Allow player to access map
			//$("#viewGuide").fadeIn();
			//$('body').css('zoom','.25');
		} else {
			// Controls rise speed
			curInterval = dropSpeed;
		}

		let myItem = "";

		for (key in curItems) {
			if (curItems.hasOwnProperty(key)) {
				if (curItems[key].isCollected == true) {
					//console.log(curItems[key]);
					if (curPosX == 64 && curPosY == 64) {
						curItems[key].isHome = true;
						myItem = key;
					}
				}
			}
		}
		
	// console alert
	$('#console').on("change", function(){
		$(this).css("color", "red");
	});
	
	}

	$(document).on("keydown", function(e) {

		// Optional Setting : Courage decreases with moves
		//curCourage -= 1;
		//$('#courage').css('width',curCourage +"%")

		//// Loser message    
		//if (curCourage <= -1) {
		//	var promise = document.querySelector('audio').pause();
		//	if (promise !== undefined) {
		//		promise.then(_ => {
		//			// Autoplay started!
		//		}).catch(error => {
		//			// Autoplay was prevented.
		//			// Show a "Play" button so that user can start playback.
		//		});
		//	}
		//	$(document).off();
		//	$('#character').fadeOut();
		//	$('#console').html("Game over! You lost.");
		//}
		
		// Alternate ending
		if (curCourage <= -1) {
			if ( $("#deathWall").length == 0 ) {
				let deathWallWidth = 100;
				let deathWall = document.createElement('div');
				deathWall.id = "deathWall";
				deathWall.style.position = "absolute";
				deathWall.style.top = 0;
				deathWall.style.left = deathWallWidth+"vw";
				deathWall.style.bottom = 0;
				deathWall.style.right = 0;
				//deathWall.style.backgroundColor = "red";
				deathWall.style.transition = ".125s ease all";
				document.getElementById('map').appendChild(deathWall);
				
				let deathWallInterval = setInterval( function(){
					deathWallWidth -= 5;
					deathWall.style.left = deathWallWidth+"vw";

					if ( $("#deathWall").length != 0 ) {
						if (curPosX == 64 && curPosY == 64) {
							$("#deathWall").fadeOut(500);
							$("#deathWall").remove();
							clearInterval(deathWallInterval);
							}
						
						if (curPosX >= ($('#deathWall').offset().left+50)) {
							$('#console').html("Game over! You lost.");
							$(document).off();
							$('#character').fadeOut();
							deathWallWidth = -40;
							deathWall.style.left = deathWallWidth+"vw";
							clearInterval(deathWallInterval);
						}
						
						if ( deathWallWidth == 0 ){
							$('#console').html("Game over! You lost.");
							$(document).off();
							$('#character').fadeOut();
							clearInterval(deathWallInterval);
						}
					}
				}, 500);
				
				
			}
		}

		// Play game audio
		var promise = document.querySelector('audio').play();
		if (promise !== undefined) {
			promise.then(_ => {
				// Autoplay started!
			}).catch(error => {
				// Autoplay was prevented.
				// Show a "Play" button so that user can start playback.
			});
		}

		// Test if character can move to destination cell
		function checkMove(n) {
			let newPosX = 0;
			let newPosY = 0;

			if (n == "+x") {
				newPosX = curPosX + charSize;
			} else if (n == "-x") {
				newPosX = curPosX - charSize;
			} else {
				newPosX = curPosX;
			}
			if (n == "+y") {
				newPosY = curPosY + charSize;
			} else if (n == "-y") {
				newPosY = curPosY - charSize;
			} else {
				newPosY = curPosY;
			}

			//console.log(newPosX);
			//console.log(newPosY);

			for (let i = 0; i < itemCells.length; i++) {
				// Test coordinates
				if (itemCells[i].x == newPosX && itemCells[i].y == newPosY) {
					if (itemCells[i].isFound != true) {
						//console.log("you found an item!");
						$('#console').html('You collected a ' + itemCells[i].item + "! Return home for a courage boost.");
						let myItem = itemCells[i].item;
						//console.log(myItem);
						curItems[myItem].isCollected = true;
						itemCells[i].isFound = true;
						loadItems();
						// add item to bag
						let invItem = document.createElement('img');
						invItem.src = itemCells[i].img;
						invItem.classList.add('collected');
						document.getElementById('invBag').appendChild(invItem);
					}
				}
			}

			var isTrue = true;
			for (let i = 0; i < colliderCells.length; i++) {
				// Test coordinates
				if (colliderCells[i].x == newPosX && colliderCells[i].y == newPosY) {
					//console.log("collision!");
					isTrue = false;
				}
			}
			
			for (let i = 0; i < treeCells.length; i++) {
				// Test coordinates
				if (treeCells[i].x == newPosX && treeCells[i].y == newPosY) {
					//console.log("collision!");
					isTrue = false;
				}
			}
			return isTrue;
		}

		// Handle modifiers
		function handleModifiers() {
			for (let i = 0; i < modifierCells.length; i++) {
				// Test coordinates
				if (modifierCells[i].x == curPosX && modifierCells[i].y == curPosY) {
					curCourage += parseInt(modifierCells[i].mod);
					$('#console').html("You received a +" + modifierCells[i].mod + " courage boost!")
					//console.log('mod did happen');
					$("#courage").animate(function() {
						width: curCourage
					}, animSpeed, function() {
						// Animation complete.
						$('#console').html("You received a +" + modifierCells[i].mod + " courage boost!")
						//console.log('mod did happen, current courage:' + curCourage);

						//console.log(modifierCells);
						modifierCells.splice(i, 1);
						//console.log(modifierCells);

						loadModifiers();
					});
				}
			}
		}


		// Move character    
		switch (e.which) {
			case 37: // left
				e.preventDefault();

				// Check if cell is blocked
				if (checkMove("-x")) {

					// Character movement
					if (curPosX >= charSize) {
						curPosX -= charSize;
						$('#character').css("background", "url(images/WlkLft1.png)");
						$('#character').animate({
							left: curPosX
						}, animSpeed, function() {
							// Animation complete.
							checkHome();
							handleModifiers();
						});
					}

					// Window scroll
					if (isLocked == false) {
					if ((curPosX - window.scrollX) < (window.innerWidth / 2)) {
						isLocked = true;
						let curView = window.scrollX;
						let newView = curView - (window.innerWidth / 2);
						$('html, body').animate({
							"scrollLeft": newView
						}, 500, function() { isLocked = false });
						currViewX -= 1;
						//console.log(currViewX);
					}
				}
				}
				break;

			case 38: // up
				e.preventDefault();

				// Check if cell is blocked
				if (checkMove("-y")) {

					// Character movement
					if (curPosY >= charSize) {
						curPosY -= charSize;
						$('#character').css("background", "url(images/WlkFwd1.png)");
						$('#character').animate({
							top: curPosY
						}, animSpeed, function() {
							// Animation complete.
							checkHome();
							handleModifiers();
						});
					}

					// Window scroll
					if (isLocked == false) {
					if ((curPosY - window.scrollY) < (window.innerHeight / 2)) {
						isLocked = true;
						let curView = window.scrollY;
						let newView = curView - (window.innerHeight / 3);
						$('html, body').animate({
							"scrollTop": newView
						}, 500, function() { isLocked = false });
						currViewY -= 1;
						//console.log(currViewY);
					}
				}
				}
				break;

			case 39: // right
				//console.log(e);
				e.preventDefault();

				// Check if cell is blocked
				if (checkMove("+x")) {

					// Character movement
					if (curPosX >= 0) {
						curPosX += charSize;
						$('#character').css("background", "url(images/WlkRgt1.png)");
						$('#character').animate({
							left: curPosX
						}, animSpeed, function() {
							// Animation complete.
							checkHome();
							handleModifiers();
						});
					}

					// Window scroll
					if (isLocked == false) {
					if ((curPosX - window.scrollX) > (window.innerWidth / 2)) {
						isLocked = true;
						let curView = window.scrollX;
						let newView = curView + (window.innerWidth / 2);
						$('html, body').animate({
							"scrollLeft": newView
						}, 500, function() { isLocked = false });
						currViewX += 1;
						//console.log(currViewX);
					}

				}
				}
				break;

			case 40: // down
				e.preventDefault();

				// Check if cell is blocked
				if (checkMove("+y")) {

					// Character movement
					if (curPosX >= 0) {
						curPosY += charSize;
						$('#character').css("background", "url(images/WlkBk1.png)");
						$('#character').animate({
							top: curPosY
						}, animSpeed, function() {
							// Animation complete.
							checkHome();
							handleModifiers();
						});
					}

					// Window scroll
					if (isLocked == false) {
						if ((curPosY - window.scrollY) > (window.innerHeight / 2)) {
							let curView = window.scrollY;
							isLocked = true;
							let newView = curView + (window.innerHeight / 3);
							$('html, body').animate({
								"scrollTop": newView
							}, 500, function() { isLocked = false });
							currViewY += 1;
							//console.log(currViewY);
						}
					}
				}
				break;

			default:
				return; // exit this handler for other keys
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	});

});