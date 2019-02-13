// Map Creation Mode
function mapModeInit() {
	$('body').css('overflow', 'scroll');

	$('#mapMode').fadeIn();
	$('#mapTools').fadeIn();

	for (let i = 0; i < 10000; i++) {
		let myCell = document.createElement('div');
		myCell.classList.add("cell");
		document.getElementById('editor').appendChild(myCell);
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
			let y = $(this).offset().top - 60;
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
			let y = $(this).offset().top - 60;
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



// Character Variables

	// Character start position
	let origPosX = 64;
	let origPosY = 64;
	
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
		"report card": {
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
		},
		"rocks": {
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


// Game Variables
	
	// Initial courage
	let curCourage = 100;
	
	// Initial mod points
	let modPoints = 0;
	
	// Courage interval
	let curInterval = 0;

	// Speed at which courage drops
	let dropSpeed = -4;
	
	// Speed at which courage rises;
	let riseSpeed = 10;
	
	// Window scroll variables
	let currX = 0;
	let currY = 0;
	let isLocked = false;

	
// Array of cell coordinates for cells that are off limits
let colliderCells=[{"x":0,"y":0},{"x":32,"y":0},{"x":64,"y":0},{"x":96,"y":0},{"x":128,"y":0},{"x":160,"y":0},{"x":192,"y":0},{"x":224,"y":0},{"x":256,"y":0},{"x":288,"y":0},{"x":320,"y":0},{"x":352,"y":0},{"x":384,"y":0},{"x":416,"y":0},{"x":448,"y":0},{"x":480,"y":0},{"x":512,"y":0},{"x":544,"y":0},{"x":576,"y":0},{"x":608,"y":0},{"x":640,"y":0},{"x":672,"y":0},{"x":704,"y":0},{"x":736,"y":0},{"x":768,"y":0},{"x":800,"y":0},{"x":832,"y":0},{"x":864,"y":0},{"x":896,"y":0},{"x":928,"y":0},{"x":960,"y":0},{"x":992,"y":0},{"x":1024,"y":0},{"x":1056,"y":0},{"x":1088,"y":0},{"x":1120,"y":0},{"x":1152,"y":0},{"x":1184,"y":0},{"x":1216,"y":0},{"x":1248,"y":0},{"x":1280,"y":0},{"x":1312,"y":0},{"x":1344,"y":0},{"x":1376,"y":0},{"x":1408,"y":0},{"x":1440,"y":0},{"x":1472,"y":0},{"x":1504,"y":0},{"x":1536,"y":0},{"x":1568,"y":0},{"x":1600,"y":0},{"x":1632,"y":0},{"x":1664,"y":0},{"x":1696,"y":0},{"x":1728,"y":0},{"x":1760,"y":0},{"x":1792,"y":0},{"x":1824,"y":0},{"x":1856,"y":0},{"x":1888,"y":0},{"x":1920,"y":0},{"x":0,"y":32},{"x":448,"y":32},{"x":1120,"y":32},{"x":1920,"y":32},{"x":0,"y":64},{"x":448,"y":64},{"x":1120,"y":64},{"x":1920,"y":64},{"x":0,"y":96},{"x":448,"y":96},{"x":1120,"y":96},{"x":1920,"y":96},{"x":0,"y":128},{"x":448,"y":128},{"x":1120,"y":128},{"x":1920,"y":128},{"x":0,"y":160},{"x":448,"y":160},{"x":1120,"y":160},{"x":1920,"y":160},{"x":0,"y":192},{"x":448,"y":192},{"x":1120,"y":192},{"x":1920,"y":192},{"x":0,"y":224},{"x":32,"y":224},{"x":64,"y":224},{"x":96,"y":224},{"x":128,"y":224},{"x":160,"y":224},{"x":192,"y":224},{"x":224,"y":224},{"x":448,"y":224},{"x":1120,"y":224},{"x":1920,"y":224},{"x":0,"y":256},{"x":224,"y":256},{"x":448,"y":256},{"x":1120,"y":256},{"x":1920,"y":256},{"x":0,"y":288},{"x":224,"y":288},{"x":448,"y":288},{"x":1120,"y":288},{"x":1920,"y":288},{"x":0,"y":320},{"x":224,"y":320},{"x":448,"y":320},{"x":1120,"y":320},{"x":1920,"y":320},{"x":0,"y":352},{"x":224,"y":352},{"x":448,"y":352},{"x":1120,"y":352},{"x":1920,"y":352},{"x":0,"y":384},{"x":224,"y":384},{"x":352,"y":384},{"x":384,"y":384},{"x":416,"y":384},{"x":448,"y":384},{"x":480,"y":384},{"x":512,"y":384},{"x":544,"y":384},{"x":576,"y":384},{"x":608,"y":384},{"x":640,"y":384},{"x":672,"y":384},{"x":704,"y":384},{"x":736,"y":384},{"x":768,"y":384},{"x":800,"y":384},{"x":832,"y":384},{"x":864,"y":384},{"x":896,"y":384},{"x":928,"y":384},{"x":960,"y":384},{"x":1088,"y":384},{"x":1120,"y":384},{"x":1152,"y":384},{"x":1184,"y":384},{"x":1216,"y":384},{"x":1248,"y":384},{"x":1920,"y":384},{"x":0,"y":416},{"x":32,"y":416},{"x":160,"y":416},{"x":192,"y":416},{"x":224,"y":416},{"x":544,"y":416},{"x":1920,"y":416},{"x":0,"y":448},{"x":224,"y":448},{"x":544,"y":448},{"x":1920,"y":448},{"x":0,"y":480},{"x":544,"y":480},{"x":1920,"y":480},{"x":0,"y":512},{"x":544,"y":512},{"x":1568,"y":512},{"x":1600,"y":512},{"x":1632,"y":512},{"x":1664,"y":512},{"x":1696,"y":512},{"x":1824,"y":512},{"x":1856,"y":512},{"x":1888,"y":512},{"x":1920,"y":512},{"x":0,"y":544},{"x":544,"y":544},{"x":1568,"y":544},{"x":1920,"y":544},{"x":0,"y":576},{"x":32,"y":576},{"x":64,"y":576},{"x":96,"y":576},{"x":128,"y":576},{"x":160,"y":576},{"x":192,"y":576},{"x":224,"y":576},{"x":544,"y":576},{"x":1568,"y":576},{"x":1920,"y":576},{"x":0,"y":608},{"x":224,"y":608},{"x":544,"y":608},{"x":1568,"y":608},{"x":1920,"y":608},{"x":0,"y":640},{"x":224,"y":640},{"x":256,"y":640},{"x":288,"y":640},{"x":320,"y":640},{"x":352,"y":640},{"x":384,"y":640},{"x":416,"y":640},{"x":544,"y":640},{"x":1568,"y":640},{"x":1920,"y":640},{"x":0,"y":672},{"x":544,"y":672},{"x":1568,"y":672},{"x":1920,"y":672},{"x":0,"y":704},{"x":544,"y":704},{"x":1568,"y":704},{"x":1920,"y":704},{"x":0,"y":736},{"x":544,"y":736},{"x":1568,"y":736},{"x":1920,"y":736},{"x":0,"y":768},{"x":544,"y":768},{"x":1568,"y":768},{"x":1920,"y":768},{"x":0,"y":800},{"x":160,"y":800},{"x":192,"y":800},{"x":224,"y":800},{"x":256,"y":800},{"x":288,"y":800},{"x":320,"y":800},{"x":352,"y":800},{"x":384,"y":800},{"x":416,"y":800},{"x":448,"y":800},{"x":480,"y":800},{"x":512,"y":800},{"x":544,"y":800},{"x":1568,"y":800},{"x":1920,"y":800},{"x":0,"y":832},{"x":992,"y":832},{"x":1024,"y":832},{"x":1056,"y":832},{"x":1088,"y":832},{"x":1120,"y":832},{"x":1152,"y":832},{"x":1184,"y":832},{"x":1216,"y":832},{"x":1248,"y":832},{"x":1280,"y":832},{"x":1312,"y":832},{"x":1344,"y":832},{"x":1376,"y":832},{"x":1408,"y":832},{"x":1440,"y":832},{"x":1472,"y":832},{"x":1504,"y":832},{"x":1536,"y":832},{"x":1568,"y":832},{"x":1920,"y":832},{"x":0,"y":864},{"x":992,"y":864},{"x":1280,"y":864},{"x":1920,"y":864},{"x":0,"y":896},{"x":1280,"y":896},{"x":1920,"y":896},{"x":0,"y":928},{"x":1280,"y":928},{"x":1920,"y":928},{"x":0,"y":960},{"x":1280,"y":960},{"x":1920,"y":960},{"x":0,"y":992},{"x":992,"y":992},{"x":1280,"y":992},{"x":1920,"y":992},{"x":0,"y":1024},{"x":992,"y":1024},{"x":1280,"y":1024},{"x":1920,"y":1024},{"x":0,"y":1056},{"x":768,"y":1056},{"x":800,"y":1056},{"x":832,"y":1056},{"x":864,"y":1056},{"x":896,"y":1056},{"x":928,"y":1056},{"x":960,"y":1056},{"x":992,"y":1056},{"x":1280,"y":1056},{"x":1920,"y":1056},{"x":0,"y":1088},{"x":768,"y":1088},{"x":1280,"y":1088},{"x":1920,"y":1088},{"x":0,"y":1120},{"x":768,"y":1120},{"x":1280,"y":1120},{"x":1920,"y":1120},{"x":0,"y":1152},{"x":672,"y":1152},{"x":704,"y":1152},{"x":736,"y":1152},{"x":768,"y":1152},{"x":1280,"y":1152},{"x":1920,"y":1152},{"x":0,"y":1184},{"x":672,"y":1184},{"x":1280,"y":1184},{"x":1920,"y":1184},{"x":0,"y":1216},{"x":672,"y":1216},{"x":1280,"y":1216},{"x":1920,"y":1216},{"x":0,"y":1248},{"x":32,"y":1248},{"x":64,"y":1248},{"x":96,"y":1248},{"x":128,"y":1248},{"x":160,"y":1248},{"x":192,"y":1248},{"x":224,"y":1248},{"x":256,"y":1248},{"x":288,"y":1248},{"x":320,"y":1248},{"x":352,"y":1248},{"x":384,"y":1248},{"x":416,"y":1248},{"x":448,"y":1248},{"x":480,"y":1248},{"x":512,"y":1248},{"x":544,"y":1248},{"x":576,"y":1248},{"x":608,"y":1248},{"x":640,"y":1248},{"x":672,"y":1248},{"x":704,"y":1248},{"x":736,"y":1248},{"x":768,"y":1248},{"x":800,"y":1248},{"x":832,"y":1248},{"x":864,"y":1248},{"x":896,"y":1248},{"x":928,"y":1248},{"x":960,"y":1248},{"x":992,"y":1248},{"x":1024,"y":1248},{"x":1056,"y":1248},{"x":1088,"y":1248},{"x":1120,"y":1248},{"x":1152,"y":1248},{"x":1184,"y":1248},{"x":1216,"y":1248},{"x":1248,"y":1248},{"x":1280,"y":1248},{"x":1312,"y":1248},{"x":1344,"y":1248},{"x":1376,"y":1248},{"x":1408,"y":1248},{"x":1440,"y":1248},{"x":1472,"y":1248},{"x":1504,"y":1248},{"x":1536,"y":1248},{"x":1568,"y":1248},{"x":1600,"y":1248},{"x":1632,"y":1248},{"x":1664,"y":1248},{"x":1696,"y":1248},{"x":1728,"y":1248},{"x":1760,"y":1248},{"x":1792,"y":1248},{"x":1824,"y":1248},{"x":1856,"y":1248},{"x":1888,"y":1248},{"x":1920,"y":1248},];
let wallCells=[{"x":0,"y":0},{"x":32,"y":0},{"x":64,"y":0},{"x":96,"y":0},{"x":128,"y":0},{"x":160,"y":0},{"x":192,"y":0},{"x":224,"y":0},{"x":256,"y":0},{"x":288,"y":0},{"x":320,"y":0},{"x":352,"y":0},{"x":384,"y":0},{"x":416,"y":0},{"x":448,"y":0},{"x":480,"y":0},{"x":512,"y":0},{"x":544,"y":0},{"x":576,"y":0},{"x":608,"y":0},{"x":640,"y":0},{"x":672,"y":0},{"x":704,"y":0},{"x":736,"y":0},{"x":768,"y":0},{"x":800,"y":0},{"x":832,"y":0},{"x":864,"y":0},{"x":896,"y":0},{"x":928,"y":0},{"x":960,"y":0},{"x":992,"y":0},{"x":1024,"y":0},{"x":1056,"y":0},{"x":1088,"y":0},{"x":1120,"y":0},{"x":1152,"y":0},{"x":1184,"y":0},{"x":1216,"y":0},{"x":1248,"y":0},{"x":1280,"y":0},{"x":1312,"y":0},{"x":1344,"y":0},{"x":1376,"y":0},{"x":1408,"y":0},{"x":1440,"y":0},{"x":1472,"y":0},{"x":1504,"y":0},{"x":1536,"y":0},{"x":1568,"y":0},{"x":1600,"y":0},{"x":1632,"y":0},{"x":1664,"y":0},{"x":1696,"y":0},{"x":1728,"y":0},{"x":1760,"y":0},{"x":1792,"y":0},{"x":1824,"y":0},{"x":1856,"y":0},{"x":1888,"y":0},{"x":1920,"y":0},{"x":0,"y":32},{"x":448,"y":32},{"x":1120,"y":32},{"x":1920,"y":32},{"x":0,"y":64},{"x":448,"y":64},{"x":1120,"y":64},{"x":1920,"y":64},{"x":0,"y":96},{"x":448,"y":96},{"x":1120,"y":96},{"x":1920,"y":96},{"x":0,"y":128},{"x":448,"y":128},{"x":1120,"y":128},{"x":1920,"y":128},{"x":0,"y":160},{"x":448,"y":160},{"x":1120,"y":160},{"x":1920,"y":160},{"x":0,"y":192},{"x":448,"y":192},{"x":1120,"y":192},{"x":1920,"y":192},{"x":0,"y":224},{"x":32,"y":224},{"x":64,"y":224},{"x":96,"y":224},{"x":128,"y":224},{"x":160,"y":224},{"x":192,"y":224},{"x":224,"y":224},{"x":448,"y":224},{"x":1120,"y":224},{"x":1920,"y":224},{"x":0,"y":256},{"x":224,"y":256},{"x":448,"y":256},{"x":1120,"y":256},{"x":1920,"y":256},{"x":0,"y":288},{"x":224,"y":288},{"x":448,"y":288},{"x":1120,"y":288},{"x":1920,"y":288},{"x":0,"y":320},{"x":224,"y":320},{"x":448,"y":320},{"x":1120,"y":320},{"x":1920,"y":320},{"x":0,"y":352},{"x":224,"y":352},{"x":448,"y":352},{"x":1120,"y":352},{"x":1920,"y":352},{"x":0,"y":384},{"x":224,"y":384},{"x":352,"y":384},{"x":384,"y":384},{"x":416,"y":384},{"x":448,"y":384},{"x":480,"y":384},{"x":512,"y":384},{"x":544,"y":384},{"x":576,"y":384},{"x":608,"y":384},{"x":640,"y":384},{"x":672,"y":384},{"x":704,"y":384},{"x":736,"y":384},{"x":768,"y":384},{"x":800,"y":384},{"x":832,"y":384},{"x":864,"y":384},{"x":896,"y":384},{"x":928,"y":384},{"x":960,"y":384},{"x":1088,"y":384},{"x":1120,"y":384},{"x":1152,"y":384},{"x":1184,"y":384},{"x":1216,"y":384},{"x":1248,"y":384},{"x":1920,"y":384},{"x":0,"y":416},{"x":32,"y":416},{"x":160,"y":416},{"x":192,"y":416},{"x":224,"y":416},{"x":544,"y":416},{"x":1920,"y":416},{"x":0,"y":448},{"x":224,"y":448},{"x":544,"y":448},{"x":1920,"y":448},{"x":0,"y":480},{"x":544,"y":480},{"x":1920,"y":480},{"x":0,"y":512},{"x":544,"y":512},{"x":1568,"y":512},{"x":1600,"y":512},{"x":1632,"y":512},{"x":1664,"y":512},{"x":1696,"y":512},{"x":1824,"y":512},{"x":1856,"y":512},{"x":1888,"y":512},{"x":1920,"y":512},{"x":0,"y":544},{"x":544,"y":544},{"x":1568,"y":544},{"x":1920,"y":544},{"x":0,"y":576},{"x":32,"y":576},{"x":64,"y":576},{"x":96,"y":576},{"x":128,"y":576},{"x":160,"y":576},{"x":192,"y":576},{"x":224,"y":576},{"x":544,"y":576},{"x":1568,"y":576},{"x":1920,"y":576},{"x":0,"y":608},{"x":224,"y":608},{"x":544,"y":608},{"x":1568,"y":608},{"x":1920,"y":608},{"x":0,"y":640},{"x":224,"y":640},{"x":256,"y":640},{"x":288,"y":640},{"x":320,"y":640},{"x":352,"y":640},{"x":384,"y":640},{"x":416,"y":640},{"x":544,"y":640},{"x":1568,"y":640},{"x":1920,"y":640},{"x":0,"y":672},{"x":544,"y":672},{"x":1568,"y":672},{"x":1920,"y":672},{"x":0,"y":704},{"x":544,"y":704},{"x":1568,"y":704},{"x":1920,"y":704},{"x":0,"y":736},{"x":544,"y":736},{"x":1568,"y":736},{"x":1920,"y":736},{"x":0,"y":768},{"x":544,"y":768},{"x":1568,"y":768},{"x":1920,"y":768},{"x":0,"y":800},{"x":160,"y":800},{"x":192,"y":800},{"x":224,"y":800},{"x":256,"y":800},{"x":288,"y":800},{"x":320,"y":800},{"x":352,"y":800},{"x":384,"y":800},{"x":416,"y":800},{"x":448,"y":800},{"x":480,"y":800},{"x":512,"y":800},{"x":544,"y":800},{"x":1568,"y":800},{"x":1920,"y":800},{"x":0,"y":832},{"x":992,"y":832},{"x":1024,"y":832},{"x":1056,"y":832},{"x":1088,"y":832},{"x":1120,"y":832},{"x":1152,"y":832},{"x":1184,"y":832},{"x":1216,"y":832},{"x":1248,"y":832},{"x":1280,"y":832},{"x":1312,"y":832},{"x":1344,"y":832},{"x":1376,"y":832},{"x":1408,"y":832},{"x":1440,"y":832},{"x":1472,"y":832},{"x":1504,"y":832},{"x":1536,"y":832},{"x":1568,"y":832},{"x":1920,"y":832},{"x":0,"y":864},{"x":992,"y":864},{"x":1280,"y":864},{"x":1920,"y":864},{"x":0,"y":896},{"x":1280,"y":896},{"x":1920,"y":896},{"x":0,"y":928},{"x":1280,"y":928},{"x":1920,"y":928},{"x":0,"y":960},{"x":1280,"y":960},{"x":1920,"y":960},{"x":0,"y":992},{"x":992,"y":992},{"x":1280,"y":992},{"x":1920,"y":992},{"x":0,"y":1024},{"x":992,"y":1024},{"x":1280,"y":1024},{"x":1920,"y":1024},{"x":0,"y":1056},{"x":768,"y":1056},{"x":800,"y":1056},{"x":832,"y":1056},{"x":864,"y":1056},{"x":896,"y":1056},{"x":928,"y":1056},{"x":960,"y":1056},{"x":992,"y":1056},{"x":1280,"y":1056},{"x":1920,"y":1056},{"x":0,"y":1088},{"x":768,"y":1088},{"x":1280,"y":1088},{"x":1920,"y":1088},{"x":0,"y":1120},{"x":768,"y":1120},{"x":1280,"y":1120},{"x":1920,"y":1120},{"x":0,"y":1152},{"x":672,"y":1152},{"x":704,"y":1152},{"x":736,"y":1152},{"x":768,"y":1152},{"x":1280,"y":1152},{"x":1920,"y":1152},{"x":0,"y":1184},{"x":672,"y":1184},{"x":1280,"y":1184},{"x":1920,"y":1184},{"x":0,"y":1216},{"x":672,"y":1216},{"x":1280,"y":1216},{"x":1920,"y":1216},{"x":0,"y":1248},{"x":32,"y":1248},{"x":64,"y":1248},{"x":96,"y":1248},{"x":128,"y":1248},{"x":160,"y":1248},{"x":192,"y":1248},{"x":224,"y":1248},{"x":256,"y":1248},{"x":288,"y":1248},{"x":320,"y":1248},{"x":352,"y":1248},{"x":384,"y":1248},{"x":416,"y":1248},{"x":448,"y":1248},{"x":480,"y":1248},{"x":512,"y":1248},{"x":544,"y":1248},{"x":576,"y":1248},{"x":608,"y":1248},{"x":640,"y":1248},{"x":672,"y":1248},{"x":704,"y":1248},{"x":736,"y":1248},{"x":768,"y":1248},{"x":800,"y":1248},{"x":832,"y":1248},{"x":864,"y":1248},{"x":896,"y":1248},{"x":928,"y":1248},{"x":960,"y":1248},{"x":992,"y":1248},{"x":1024,"y":1248},{"x":1056,"y":1248},{"x":1088,"y":1248},{"x":1120,"y":1248},{"x":1152,"y":1248},{"x":1184,"y":1248},{"x":1216,"y":1248},{"x":1248,"y":1248},{"x":1280,"y":1248},{"x":1312,"y":1248},{"x":1344,"y":1248},{"x":1376,"y":1248},{"x":1408,"y":1248},{"x":1440,"y":1248},{"x":1472,"y":1248},{"x":1504,"y":1248},{"x":1536,"y":1248},{"x":1568,"y":1248},{"x":1600,"y":1248},{"x":1632,"y":1248},{"x":1664,"y":1248},{"x":1696,"y":1248},{"x":1728,"y":1248},{"x":1760,"y":1248},{"x":1792,"y":1248},{"x":1824,"y":1248},{"x":1856,"y":1248},{"x":1888,"y":1248},{"x":1920,"y":1248},];

// Array of cell coordinates for cells that contain trees
let treeCells = [{"x":64,"y":544},{"x":288,"y":672},{"x":416,"y":480},{"x":512,"y":576},{"x":608,"y":768},{"x":608,"y":928},{"x":800,"y":832},{"x":960,"y":768},{"x":544,"y":96},{"x":608,"y":96},{"x":896,"y":96},{"x":960,"y":82},{"x":1024,"y":96},{"x":1216,"y":128},{"x":1280,"y":256},{"x":1344,"y":480},{"x":1664,"y":640},{"x":1632,"y":768},{"x":1856,"y":768},{"x":1760,"y":896},{"x":1440,"y":960},{"x":1568,"y":1024},{"x":1856,"y":1184},{"x":1376,"y":1216},{"x":1408,"y":1152},{"x":1632,"y":1152},{"x":1664,"y":1152},{"x":1696,"y":1216}];

// Array of cell coordinates for cells that contain houses
let houseCells = [{"x":1344,"y":96},{"x":608,"y":512},{"x":800,"y":512},{"x":992,"y":512},{"x":1184,"y":512},{"x":704,"y":640},{"x":896,"y":640},{"x":1088,"y":640},{"x":32,"y":928},{"x":160,"y":928},{"x":288,"y":928},{"x":288,"y":1056},{"x":416,"y":1056},{"x":544,"y":1056}];

// Array of cell coordinates for cells that are off limites due to houese, which occupy more than one cell graphically
let houseColliderCells = [{"x":1344,"y":96},{"x":1376,"y":96},{"x":1408,"y":96},{"x":1344,"y":128},{"x":1408,"y":128},{"x":608,"y":512},{"x":640,"y":512},{"x":672,"y":512},{"x":800,"y":512},{"x":832,"y":512},{"x":864,"y":512},{"x":992,"y":512},{"x":1024,"y":512},{"x":1056,"y":512},{"x":1184,"y":512},{"x":1216,"y":512},{"x":1248,"y":512},{"x":608,"y":544},{"x":672,"y":544},{"x":800,"y":544},{"x":864,"y":544},{"x":992,"y":544},{"x":1056,"y":544},{"x":1184,"y":544},{"x":1248,"y":544},{"x":704,"y":640},{"x":736,"y":640},{"x":768,"y":640},{"x":896,"y":640},{"x":928,"y":640},{"x":960,"y":640},{"x":1088,"y":640},{"x":1120,"y":640},{"x":1152,"y":640},{"x":704,"y":672},{"x":768,"y":672},{"x":896,"y":672},{"x":960,"y":672},{"x":1088,"y":672},{"x":1152,"y":672},{"x":32,"y":928},{"x":64,"y":928},{"x":96,"y":928},{"x":160,"y":928},{"x":192,"y":928},{"x":224,"y":928},{"x":288,"y":928},{"x":320,"y":928},{"x":352,"y":928},{"x":32,"y":960},{"x":96,"y":960},{"x":160,"y":960},{"x":224,"y":960},{"x":288,"y":960},{"x":352,"y":960},{"x":288,"y":1056},{"x":320,"y":1056},{"x":352,"y":1056},{"x":416,"y":1056},{"x":448,"y":1056},{"x":480,"y":1056},{"x":544,"y":1056},{"x":576,"y":1056},{"x":608,"y":1056},{"x":288,"y":1088},{"x":352,"y":1088},{"x":416,"y":1088},{"x":480,"y":1088},{"x":544,"y":1088},{"x":608,"y":1088},{"x":640,"y":544},{"x":832,"y":544},{"x":1216,"y":544},{"x":736,"y":672},{"x":928,"y":672},{"x":1120,"y":672},{"x":64,"y":960},{"x":192,"y":960},{"x":320,"y":1088},{"x":448,"y":1088},{"x":32,"y":32},{"x":64,"y":32},{"x":96,"y":32},{"x":32,"y":64},{"x":96,"y":64}];

// Array of cell coordinates for cells that contain modifiers
let modifierCells = [{"x":384,"y":64,"mod":"10"},{"x":576,"y":64,"mod":"40"},{"x":1184,"y":64,"mod":"10"},{"x":1856,"y":64,"mod":"40"},{"x":1376,"y":128,"mod":"25"},{"x":512,"y":320,"mod":"50"},{"x":1184,"y":320,"mod":"30"},{"x":32,"y":544,"mod":"50"},{"x":1024,"y":544,"mod":"50"},{"x":1600,"y":704,"mod":"30"},{"x":480,"y":736,"mod":"10"},{"x":1504,"y":768,"mod":"60"},{"x":1344,"y":896,"mod":"20"},{"x":1728,"y":896,"mod":"10"},{"x":320,"y":960,"mod":"20"},{"x":576,"y":1088,"mod":"5"},{"x":64,"y":1184,"mod":"20"},{"x":1216,"y":1184,"mod":"60"}];

// Array of cell coordinates for cells that contain enemies
let enemyCells = [{"x":1216,"y":64,"mod":"-10"},{"x":1824,"y":64,"mod":"-10"},{"x":576,"y":96,"mod":"-10"},{"x":1184,"y":96,"mod":"-10"},{"x":1216,"y":96,"mod":"-10"},{"x":1824,"y":96,"mod":"-10"},{"x":1856,"y":96,"mod":"-10"},{"x":1184,"y":128,"mod":"-10"},{"x":1184,"y":160,"mod":"-10"},{"x":1344,"y":160,"mod":"-10"},{"x":1408,"y":160,"mod":"-10"},{"x":1184,"y":192,"mod":"-10"},{"x":1344,"y":192,"mod":"-10"},{"x":1408,"y":192,"mod":"-10"},{"x":1184,"y":224,"mod":"-10"},{"x":1344,"y":224,"mod":"-10"},{"x":1408,"y":224,"mod":"-10"},{"x":1184,"y":256,"mod":"-10"},{"x":512,"y":288,"mod":"-10"},{"x":544,"y":288,"mod":"-10"},{"x":1184,"y":288,"mod":"-10"},{"x":1216,"y":288,"mod":"-10"},{"x":544,"y":320,"mod":"-10"},{"x":1216,"y":320,"mod":"-10"},{"x":1152,"y":352,"mod":"-10"},{"x":1184,"y":352,"mod":"-10"},{"x":1216,"y":352,"mod":"-10"},{"x":288,"y":384,"mod":"-10"},{"x":1024,"y":384,"mod":"-10"},{"x":96,"y":416,"mod":"-10"},{"x":1600,"y":672,"mod":"-10"},{"x":1632,"y":672,"mod":"-10"},{"x":448,"y":704,"mod":"-10"},{"x":480,"y":704,"mod":"-10"},{"x":512,"y":704,"mod":"-10"},{"x":1248,"y":704,"mod":"-10"},{"x":1280,"y":704,"mod":"-10"},{"x":1312,"y":704,"mod":"-10"},{"x":1632,"y":704,"mod":"-10"},{"x":1248,"y":736,"mod":"-10"},{"x":1312,"y":736,"mod":"-10"},{"x":1632,"y":736,"mod":"-10"},{"x":672,"y":768,"mod":"-10"},{"x":32,"y":800,"mod":"-10"},{"x":64,"y":800,"mod":"-10"},{"x":128,"y":800,"mod":"-10"},{"x":672,"y":832,"mod":"-10"},{"x":1696,"y":864,"mod":"-10"},{"x":1728,"y":864,"mod":"-10"},{"x":672,"y":896,"mod":"-10"},{"x":1376,"y":896,"mod":"-10"},{"x":1696,"y":896,"mod":"-10"},{"x":992,"y":928,"mod":"-10"},{"x":1344,"y":928,"mod":"-10"},{"x":1376,"y":928,"mod":"-10"},{"x":672,"y":960,"mod":"-10"},{"x":672,"y":1024,"mod":"-10"},{"x":1312,"y":1088,"mod":"-10"},{"x":1344,"y":1088,"mod":"-10"},{"x":1376,"y":1088,"mod":"-10"},{"x":1312,"y":1120,"mod":"-10"},{"x":1376,"y":1120,"mod":"-10"},{"x":64,"y":1152,"mod":"-10"},{"x":96,"y":1152,"mod":"-10"},{"x":1184,"y":1152,"mod":"-10"},{"x":1216,"y":1152,"mod":"-10"},{"x":96,"y":1184,"mod":"-10"},{"x":1184,"y":1184,"mod":"-10"}];

// Array of cell coordinates and properties for game objects
let itemCells = [{
	"x": 640,
	"y": 1088,
	"item": "report card",
	"isFound": false,
	"img": "images/homework.png"
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
	"img": "images/bag.png"
}, {
	"x": 1344,
	"y": 1120,
	"item": "store",
	"isFound": false,
	"img": "images/ingredients.png"
}, {
	"x": 1696,
	"y": 160,
	"item": "milk",
	"isFound": false,
	"img": "images/milk.png"
}, {
	"x": 768,
	"y": 224,
	"item": "rocks",
	"isFound": false,
	"img": "images/rocks.png"
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

function loadElement(n,elAr) {
	// Remove any existing instances of element
	$("." + n).remove();
	
	// Reload elements from array
	for (let i = 0; i < elAr.length; i++) {
		if (elAr[i].isFound != true) {
			let myCell = document.createElement('div');
			myCell.classList.add(n);
			myCell.style.left = elAr[i].x + "px";
			myCell.style.top = elAr[i].y + "px";
			$('#guide').append(myCell);
		}
	}
}

function loadMapElements() {
	loadElement("house",houseCells);
	loadElement("tree",treeCells);
	loadElement("wall",wallCells);
	loadElement("modifier",modifierCells);
	loadElement("enemy",enemyCells);
	loadItems();
}


// Add audio elements
let gameAudio = document.createElement("audio");
let playGameAudio = true;

let soundEffectModifier = document.createElement("audio");
soundEffectModifier.classList.add('soundEffectModifier');
let soundEffectEnemy = document.createElement("audio");
let soundEffectItem = document.createElement("audio");
let soundEffectHome = document.createElement("audio");
let soundEffectLose = document.createElement("audio");

function gameAudioInit() {
	if (playGameAudio == true) {
		var promise = document.querySelector('audio').play();
		if (promise !== undefined) {
			promise.then(_ => {
				// Autoplay started!
			}).catch(error => {
				// Autoplay was prevented.
				// Show a "Play" button so that user can start playback.
			});
		}
	}
}

function loadSoundEffect(n) {
	let newSound = document.createElement("audio");
	newSound.id = n;
	newSound.src = "audio/" + n + ".oggvorbis.ogg"
	document.getElementsByTagName('body')[0].appendChild(newSound);
}

function playSoundEffect(n) {
	if (playGameAudio == true) {
		var promise = document.getElementById(n).play();
		if (promise !== undefined) {
			promise.then(_ => {
				// Autoplay started!
			}).catch(error => {
				// Autoplay was prevented.
				// Show a "Play" button so that user can start playback.
			});
		}
	}	
}

function stopSoundEffect(n) {
	if (playGameAudio == true) {
		var promise = document.getElementById(n).pause();
		if (promise !== undefined) {
			promise.then(_ => {
				// Autoplay started!
			}).catch(error => {
				// Autoplay was prevented.
				// Show a "Play" button so that user can start playback.
			});
		}
	}	
}

function loadSoundEffects() {
	//loadSoundEffect('deathRattle');
	//loadSoundEffect('beepbox');
	//loadSoundEffect('intro');
}

function toggleAudio() {
	if (playGameAudio == true) {
		playGameAudio = false;
		gameAudio.pause();
		$('#audioToggle').html('<i class="fas fa-volume-up"></i>');
	} else {
		playGameAudio = true;
		gameAudioInit();
		$('#audioToggle').html('<i class="fas fa-volume-mute"></i>');
	}
	
}

$('#audioToggle').click(function(){
	toggleAudio();
});

// Character move controls
$(document).ready(function() {
	
	// window size
	var size = [480,440];
	$(window).resize(function(){
		window.resizeTo(size[0],size[1]);
	});
	
	// Disable scrolling.
	$(document).bind(
      'touchmove',
          function(e) {
            e.preventDefault();
          }
	);
	
	loadSoundEffects();
	
	// start game
	$('#startGame').click(function(){
		$('#newGame').fadeOut();
	});

	// Set welcome message on console.
	$('#console').html("Welcome! Your courage level will drop as you explore the map and bring items home. Return home to rebuild courage!");
	
	// Controls
	$('#controlLeft').on('click press', function(){
		jQuery.event.trigger({ type : 'keydown', which : 37 });
	});
	
	$('#controlRight').on('click press', function(){
		jQuery.event.trigger({ type : 'keydown', which : 39 });
	});
	
	$('#controlUp').on('click press', function(){
		jQuery.event.trigger({ type : 'keydown', which : 38 });
	});
	
	$('#controlDown').on('click press', function(){
		jQuery.event.trigger({ type : 'keydown', which : 40 });
	});
	
	setTimeout(function() {
		//playSoundEffect('intro');
		
		// Reset window scroll position
		$(window).scrollLeft(0);
		$(window).scrollTop(0);

		// Show map layers
		loadMapElements();
		$('#guide').fadeIn();
		
		// Preload images
		var images = [];
		function preload() {
			for (var i = 0; i < arguments.length; i++) {
				images[i] = new Image();
				images[i].src = preload.arguments[i];
			}
		}
		
		//-- usage --//
		preload(
			"images/WlkFwd1.png",
			"images/WlkFwd2.png",
			"images/WlkLft1.png",
			"images/WlkLft2.png",
			"images/WlkRgt1.png",
			"images/WlkRht2.png",
			"images/WlkBk1.png",
			"images/WlkBk2.png",
			"images/deathwall.png"
		)

		// Add audio track
		gameAudio.setAttribute("type", "audio/ogg");
		//gameAudio.setAttribute('autoplay', 'autoplay');
		gameAudio.src = "audio/gametime.oggvorbis.ogg";
		gameAudio.load();
		document.getElementsByTagName('body')[0].appendChild(gameAudio);
	}, 500);

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
			loadMapElements();
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
			if (curPosX == origPosX && curPosY == origPosY) {
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
		// Test if current position matches original position
		if (curPosX == origPosX && curPosY == origPosY) {
			// Make courage increase
			curInterval = riseSpeed;
			
			// Handle collected items
			for (key in curItems) {
				if (curItems.hasOwnProperty(key)) {
					if (curItems[key].isCollected == true) {
						curItems[key].isHome = true;
						$('#console').html('You brought home ' + key + "! Your courage will now last longer!");
						$('#invHome').append($('#invBag').html())
						$('#invBag').html("");
					}
				}
			}
		} else {
			// Make courage decrease
			curInterval = dropSpeed;
		}
		
		let myItem = "";
		
		// Also handles collected items
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
		$('#console').on("change", function() {
			$(this).css("color", "red");
		});
	
	}

	
	// Deathwall ending
	function deathWall() {
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
				deathWall.style.transition = ".125s ease all";
				document.getElementById('map').appendChild(deathWall);
				
				let deathWallInterval = setInterval( function(){
					deathWallWidth -= 5;
					deathWall.style.left = deathWallWidth+"vw";
					
					$('#character').css("animation", "crying .5s infinite");

					if ( $("#deathWall").length != 0 ) {
						if (curPosX == 64 && curPosY == 64) {
							deathWallWidth = 100;
							$("#deathWall").fadeOut(500, function(){ $("#deathWall").remove(); });
							
							clearInterval(deathWallInterval);
							$('#character').css("background", "url(images/WlkBk1.png)");
							$('#character').css("animation", "none");
							}
							
						if (curCourage >= 1) {
							deathWallWidth = 100;
							$("#deathWall").fadeOut(500, function(){ $("#deathWall").remove(); });
							clearInterval(deathWallInterval);
							$('#character').css("background", "url(images/WlkBk1.png)");
							$('#character').css("animation", "none");
							}
						
						if (curPosX >= ($('#deathWall').offset().left+50)) {
							$('#console').html("Game over! You lost.");
							$(document).off();
							$('#character').fadeOut();
							deathWallWidth = -40;
							deathWall.style.left = deathWallWidth+"vw";
							clearInterval(deathWallInterval);
							//playSoundEffect('deathRattle');
						}
						
						if ( deathWallWidth == 0 ){
							$('#console').html("Game over! You lost.");
							$(document).off();
							$('#character').fadeOut();
							clearInterval(deathWallInterval);
							//playSoundEffect('deathRattle');
						}
					}
				}, 500);
				
			}
		}
	}
	
	// Handle keyboard input for game controls
	$(document).on("keydown", function(e) {	
		deathWall();
		

		// Play game audio
		gameAudioInit();
		

		// Test if character can move to destination cell
		function checkMove(n) {
			let newPosX = 0;
			let newPosY = 0;
			
			// Use argument to determine new X position
			if (n == "+x") {
				newPosX = curPosX + charSize;
			} else if (n == "-x") {
				newPosX = curPosX - charSize;
			} else {
				newPosX = curPosX;
			}
			
			// Use argument to determine new Y position
			if (n == "+y") {
				newPosY = curPosY + charSize;
			} else if (n == "-y") {
				newPosY = curPosY - charSize;
			} else {
				newPosY = curPosY;
			}

		
			// Variable which returns to character move controller
			var isTrue = true;
			
			// Reusable function to compare new position to collider lists
			function detectCollision(elAr) {
				for (let i = 0; i < elAr.length; i++) {
					// Test coordinates
					if (elAr[i].x == newPosX && elAr[i].y == newPosY) {
						isTrue = false;
					}
				}
			}
			
			function testCollision() {
				detectCollision(colliderCells);
				detectCollision(treeCells);
				detectCollision(houseColliderCells);
			}
			
			testCollision();
			
			return isTrue;
		}
		
		// Handle collectable items
		function handleItems() {
			for (let i = 0; i < itemCells.length; i++) {
				// Test coordinates
				if (itemCells[i].x == curPosX && itemCells[i].y == curPosY) {
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
		}

		// Handle modifiers
		function handleModifiers() {
			for (let i = 0; i < modifierCells.length; i++) {
				// Test coordinates
				if (modifierCells[i].x == curPosX && modifierCells[i].y == curPosY) {
					curCourage += parseInt(modifierCells[i].mod);
					modPoints += parseInt(modifierCells[i].mod);
					$('#invMod').html(modPoints);
					$('#console').html("You received a +" + modifierCells[i].mod + " courage boost!")
					$("#courage").animate(function() {
						width: curCourage
					}, animSpeed, function() {
						// Animation complete.
						$('#console').html("You received a +" + modifierCells[i].mod + " courage boost!")
						// Remove modifier from list
						modifierCells.splice(i, 1);
						// Update modifiers from list
						loadElement("modifier",modifierCells);
					});
				}
			}
		}
		
		// Handle modifiers
		function handleEnemies() {
			for (let i = 0; i < enemyCells.length; i++) {
				if (enemyCells[i].x == curPosX && enemyCells[i].y == curPosY) {
					curCourage += parseInt(enemyCells[i].mod);
					modPoints += parseInt(enemyCells[i].mod);
					$('#invMod').html(modPoints);
					$('#console').html("You've been attacked! You lost " + enemyCells[i].mod + " courage!")
					$("#courage").animate(function() {
						width: curCourage
					}, animSpeed, function() {
						// Animation complete.
						$('#console').html("You've been attacked! You lost " + enemyCells[i].mod + " courage!")
						enemyCells.splice(i, 1);
						loadElement("enemy",enemyCells);
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
							handleEnemies();
							handleItems();
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
							handleEnemies();
							handleItems();
						});
					}

					// Window scroll
					if (isLocked == false) {
					if ((curPosY - window.scrollY) < (window.innerHeight / 2)) {
						isLocked = true;
						let curView = window.scrollY;
						let newView = curView - ((window.innerHeight / 3) - 50);
						$('html, body').animate({
							"scrollTop": newView
						}, 500, function() { isLocked = false });
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
							handleEnemies();
							handleItems();
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
							handleEnemies();
							handleItems();
						});
					}

					// Window scroll
					if (isLocked == false) {
						if ((curPosY - window.scrollY) > ( (window.innerHeight / 2) - 30 ) ) {
							let curView = window.scrollY;
							isLocked = true;
							let newView = curView + ((window.innerHeight / 3) + 50);
							$('html, body').animate({
								"scrollTop": newView
							}, 500, function() { isLocked = false });
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