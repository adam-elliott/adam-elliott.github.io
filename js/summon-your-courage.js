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
let curPosX = 32;
let curPosY = 32;

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

let scrollAdv = window.innerwidth / 2;

// Initial courage
let curCourage = 100;

// Courage interval
let curInterval = 0;

// Speed at which courage drops
let dropSpeed = -2;

// Speed at which courage rises;
let riseSpeed = 10;

// Build a wall
let myWall = document.createElement("div");
myWall.classList.add('wall');

// Define cells that are off limits

let colliderCells=[{"x":0,"y":0},{"x":32,"y":0},{"x":64,"y":0},{"x":96,"y":0},{"x":128,"y":0},{"x":160,"y":0},{"x":192,"y":0},{"x":224,"y":0},{"x":256,"y":0},{"x":288,"y":0},{"x":320,"y":0},{"x":352,"y":0},{"x":384,"y":0},{"x":416,"y":0},{"x":448,"y":0},{"x":480,"y":0},{"x":512,"y":0},{"x":544,"y":0},{"x":576,"y":0},{"x":608,"y":0},{"x":640,"y":0},{"x":672,"y":0},{"x":704,"y":0},{"x":736,"y":0},{"x":768,"y":0},{"x":800,"y":0},{"x":832,"y":0},{"x":864,"y":0},{"x":896,"y":0},{"x":928,"y":0},{"x":960,"y":0},{"x":992,"y":0},{"x":1024,"y":0},{"x":1056,"y":0},{"x":1088,"y":0},{"x":1120,"y":0},{"x":1152,"y":0},{"x":1184,"y":0},{"x":1216,"y":0},{"x":1248,"y":0},{"x":1280,"y":0},{"x":1312,"y":0},{"x":1344,"y":0},{"x":1376,"y":0},{"x":1408,"y":0},{"x":1440,"y":0},{"x":1472,"y":0},{"x":1504,"y":0},{"x":1536,"y":0},{"x":1568,"y":0},{"x":1600,"y":0},{"x":1632,"y":0},{"x":1664,"y":0},{"x":1696,"y":0},{"x":1728,"y":0},{"x":1760,"y":0},{"x":1792,"y":0},{"x":1824,"y":0},{"x":1856,"y":0},{"x":1888,"y":0},{"x":1920,"y":0},{"x":1952,"y":0},{"x":1984,"y":0},{"x":2016,"y":0},{"x":2048,"y":0},{"x":2080,"y":0},{"x":2112,"y":0},{"x":2144,"y":0},{"x":2176,"y":0},{"x":2208,"y":0},{"x":2240,"y":0},{"x":2272,"y":0},{"x":2304,"y":0},{"x":2336,"y":0},{"x":2368,"y":0},{"x":2400,"y":0},{"x":2432,"y":0},{"x":2464,"y":0},{"x":2496,"y":0},{"x":2528,"y":0},{"x":2560,"y":0},{"x":2592,"y":0},{"x":2624,"y":0},{"x":2656,"y":0},{"x":2688,"y":0},{"x":2720,"y":0},{"x":2752,"y":0},{"x":2784,"y":0},{"x":2816,"y":0},{"x":2848,"y":0},{"x":2880,"y":0},{"x":2912,"y":0},{"x":2944,"y":0},{"x":2976,"y":0},{"x":3008,"y":0},{"x":3040,"y":0},{"x":3072,"y":0},{"x":3104,"y":0},{"x":3136,"y":0},{"x":3168,"y":0},{"x":0,"y":32},{"x":448,"y":32},{"x":864,"y":32},{"x":896,"y":32},{"x":928,"y":32},{"x":960,"y":32},{"x":992,"y":32},{"x":1024,"y":32},{"x":1056,"y":32},{"x":1120,"y":32},{"x":1792,"y":32},{"x":3168,"y":32},{"x":0,"y":64},{"x":448,"y":64},{"x":864,"y":64},{"x":896,"y":64},{"x":928,"y":64},{"x":960,"y":64},{"x":992,"y":64},{"x":1024,"y":64},{"x":1056,"y":64},{"x":1120,"y":64},{"x":1792,"y":64},{"x":3168,"y":64},{"x":0,"y":96},{"x":448,"y":96},{"x":864,"y":96},{"x":896,"y":96},{"x":928,"y":96},{"x":960,"y":96},{"x":992,"y":96},{"x":1024,"y":96},{"x":1056,"y":96},{"x":1120,"y":96},{"x":1792,"y":96},{"x":3168,"y":96},{"x":0,"y":128},{"x":448,"y":128},{"x":928,"y":128},{"x":992,"y":128},{"x":1120,"y":128},{"x":1792,"y":128},{"x":3168,"y":128},{"x":0,"y":160},{"x":448,"y":160},{"x":1120,"y":160},{"x":1792,"y":160},{"x":3168,"y":160},{"x":0,"y":192},{"x":448,"y":192},{"x":1120,"y":192},{"x":1792,"y":192},{"x":3168,"y":192},{"x":0,"y":224},{"x":32,"y":224},{"x":64,"y":224},{"x":96,"y":224},{"x":128,"y":224},{"x":160,"y":224},{"x":192,"y":224},{"x":224,"y":224},{"x":448,"y":224},{"x":1120,"y":224},{"x":1344,"y":224},{"x":1376,"y":224},{"x":1408,"y":224},{"x":1440,"y":224},{"x":1472,"y":224},{"x":1504,"y":224},{"x":1536,"y":224},{"x":1792,"y":224},{"x":3168,"y":224},{"x":0,"y":256},{"x":224,"y":256},{"x":448,"y":256},{"x":1120,"y":256},{"x":1344,"y":256},{"x":1536,"y":256},{"x":1792,"y":256},{"x":3168,"y":256},{"x":0,"y":288},{"x":224,"y":288},{"x":448,"y":288},{"x":1120,"y":288},{"x":1344,"y":288},{"x":1536,"y":288},{"x":1792,"y":288},{"x":3168,"y":288},{"x":0,"y":320},{"x":224,"y":320},{"x":448,"y":320},{"x":1120,"y":320},{"x":1216,"y":320},{"x":1344,"y":320},{"x":1536,"y":320},{"x":1792,"y":320},{"x":3168,"y":320},{"x":0,"y":352},{"x":224,"y":352},{"x":448,"y":352},{"x":1120,"y":352},{"x":1344,"y":352},{"x":1536,"y":352},{"x":1632,"y":352},{"x":1664,"y":352},{"x":1696,"y":352},{"x":1728,"y":352},{"x":1760,"y":352},{"x":1792,"y":352},{"x":3168,"y":352},{"x":0,"y":384},{"x":224,"y":384},{"x":448,"y":384},{"x":1120,"y":384},{"x":1344,"y":384},{"x":1792,"y":384},{"x":3168,"y":384},{"x":0,"y":416},{"x":224,"y":416},{"x":448,"y":416},{"x":1120,"y":416},{"x":1344,"y":416},{"x":1792,"y":416},{"x":3168,"y":416},{"x":0,"y":448},{"x":32,"y":448},{"x":160,"y":448},{"x":192,"y":448},{"x":224,"y":448},{"x":352,"y":448},{"x":384,"y":448},{"x":416,"y":448},{"x":448,"y":448},{"x":480,"y":448},{"x":512,"y":448},{"x":544,"y":448},{"x":576,"y":448},{"x":608,"y":448},{"x":640,"y":448},{"x":672,"y":448},{"x":704,"y":448},{"x":736,"y":448},{"x":768,"y":448},{"x":800,"y":448},{"x":832,"y":448},{"x":864,"y":448},{"x":896,"y":448},{"x":928,"y":448},{"x":960,"y":448},{"x":1088,"y":448},{"x":1120,"y":448},{"x":1152,"y":448},{"x":1184,"y":448},{"x":1216,"y":448},{"x":1248,"y":448},{"x":1280,"y":448},{"x":1312,"y":448},{"x":1344,"y":448},{"x":1792,"y":448},{"x":3168,"y":448},{"x":0,"y":480},{"x":224,"y":480},{"x":512,"y":480},{"x":640,"y":480},{"x":1792,"y":480},{"x":3168,"y":480},{"x":0,"y":512},{"x":224,"y":512},{"x":512,"y":512},{"x":640,"y":512},{"x":1792,"y":512},{"x":3168,"y":512},{"x":0,"y":544},{"x":224,"y":544},{"x":640,"y":544},{"x":1440,"y":544},{"x":1472,"y":544},{"x":1504,"y":544},{"x":1536,"y":544},{"x":1568,"y":544},{"x":1600,"y":544},{"x":1632,"y":544},{"x":1664,"y":544},{"x":1696,"y":544},{"x":1728,"y":544},{"x":1760,"y":544},{"x":1792,"y":544},{"x":1824,"y":544},{"x":1856,"y":544},{"x":1888,"y":544},{"x":1920,"y":544},{"x":1952,"y":544},{"x":1984,"y":544},{"x":2016,"y":544},{"x":2048,"y":544},{"x":2080,"y":544},{"x":2112,"y":544},{"x":2144,"y":544},{"x":2176,"y":544},{"x":2208,"y":544},{"x":2240,"y":544},{"x":2272,"y":544},{"x":2304,"y":544},{"x":2336,"y":544},{"x":2368,"y":544},{"x":2400,"y":544},{"x":2432,"y":544},{"x":2464,"y":544},{"x":2496,"y":544},{"x":2528,"y":544},{"x":2560,"y":544},{"x":2592,"y":544},{"x":2624,"y":544},{"x":2656,"y":544},{"x":2688,"y":544},{"x":2720,"y":544},{"x":2752,"y":544},{"x":2784,"y":544},{"x":2816,"y":544},{"x":2848,"y":544},{"x":2880,"y":544},{"x":2912,"y":544},{"x":3168,"y":544},{"x":0,"y":576},{"x":224,"y":576},{"x":640,"y":576},{"x":1440,"y":576},{"x":1792,"y":576},{"x":1984,"y":576},{"x":2400,"y":576},{"x":2912,"y":576},{"x":3168,"y":576},{"x":0,"y":608},{"x":224,"y":608},{"x":640,"y":608},{"x":1440,"y":608},{"x":1792,"y":608},{"x":1984,"y":608},{"x":2400,"y":608},{"x":2912,"y":608},{"x":3168,"y":608},{"x":0,"y":640},{"x":224,"y":640},{"x":512,"y":640},{"x":640,"y":640},{"x":1440,"y":640},{"x":1792,"y":640},{"x":1984,"y":640},{"x":2400,"y":640},{"x":2912,"y":640},{"x":3168,"y":640},{"x":0,"y":672},{"x":224,"y":672},{"x":256,"y":672},{"x":288,"y":672},{"x":320,"y":672},{"x":352,"y":672},{"x":384,"y":672},{"x":512,"y":672},{"x":640,"y":672},{"x":1440,"y":672},{"x":1792,"y":672},{"x":1984,"y":672},{"x":2400,"y":672},{"x":2912,"y":672},{"x":3168,"y":672},{"x":0,"y":704},{"x":512,"y":704},{"x":640,"y":704},{"x":1440,"y":704},{"x":1792,"y":704},{"x":1984,"y":704},{"x":2400,"y":704},{"x":2912,"y":704},{"x":3168,"y":704},{"x":0,"y":736},{"x":512,"y":736},{"x":640,"y":736},{"x":1440,"y":736},{"x":1792,"y":736},{"x":1984,"y":736},{"x":2400,"y":736},{"x":2592,"y":736},{"x":2624,"y":736},{"x":2656,"y":736},{"x":2688,"y":736},{"x":2720,"y":736},{"x":2752,"y":736},{"x":2912,"y":736},{"x":3168,"y":736},{"x":0,"y":768},{"x":512,"y":768},{"x":640,"y":768},{"x":1440,"y":768},{"x":1792,"y":768},{"x":1984,"y":768},{"x":2400,"y":768},{"x":2592,"y":768},{"x":2752,"y":768},{"x":2912,"y":768},{"x":3168,"y":768},{"x":0,"y":800},{"x":512,"y":800},{"x":640,"y":800},{"x":1440,"y":800},{"x":1792,"y":800},{"x":1984,"y":800},{"x":2400,"y":800},{"x":2592,"y":800},{"x":2752,"y":800},{"x":2912,"y":800},{"x":3168,"y":800},{"x":0,"y":832},{"x":512,"y":832},{"x":640,"y":832},{"x":1440,"y":832},{"x":1792,"y":832},{"x":1984,"y":832},{"x":2400,"y":832},{"x":2592,"y":832},{"x":2656,"y":832},{"x":2752,"y":832},{"x":2912,"y":832},{"x":3168,"y":832},{"x":0,"y":864},{"x":32,"y":864},{"x":64,"y":864},{"x":192,"y":864},{"x":224,"y":864},{"x":256,"y":864},{"x":288,"y":864},{"x":320,"y":864},{"x":352,"y":864},{"x":384,"y":864},{"x":416,"y":864},{"x":448,"y":864},{"x":480,"y":864},{"x":512,"y":864},{"x":640,"y":864},{"x":672,"y":864},{"x":704,"y":864},{"x":736,"y":864},{"x":768,"y":864},{"x":896,"y":864},{"x":928,"y":864},{"x":960,"y":864},{"x":992,"y":864},{"x":1024,"y":864},{"x":1056,"y":864},{"x":1088,"y":864},{"x":1120,"y":864},{"x":1152,"y":864},{"x":1184,"y":864},{"x":1216,"y":864},{"x":1248,"y":864},{"x":1280,"y":864},{"x":1312,"y":864},{"x":1344,"y":864},{"x":1376,"y":864},{"x":1408,"y":864},{"x":1440,"y":864},{"x":1792,"y":864},{"x":1984,"y":864},{"x":2400,"y":864},{"x":2592,"y":864},{"x":2752,"y":864},{"x":2912,"y":864},{"x":3168,"y":864},{"x":0,"y":896},{"x":512,"y":896},{"x":1152,"y":896},{"x":1792,"y":896},{"x":1984,"y":896},{"x":2400,"y":896},{"x":2592,"y":896},{"x":2912,"y":896},{"x":3168,"y":896},{"x":0,"y":928},{"x":512,"y":928},{"x":1152,"y":928},{"x":1792,"y":928},{"x":1984,"y":928},{"x":2400,"y":928},{"x":2592,"y":928},{"x":2912,"y":928},{"x":3168,"y":928},{"x":0,"y":960},{"x":512,"y":960},{"x":1152,"y":960},{"x":1792,"y":960},{"x":1984,"y":960},{"x":2400,"y":960},{"x":2592,"y":960},{"x":2912,"y":960},{"x":3168,"y":960},{"x":0,"y":992},{"x":512,"y":992},{"x":1152,"y":992},{"x":1792,"y":992},{"x":1984,"y":992},{"x":2400,"y":992},{"x":2592,"y":992},{"x":2912,"y":992},{"x":3168,"y":992},{"x":0,"y":1024},{"x":512,"y":1024},{"x":1152,"y":1024},{"x":1792,"y":1024},{"x":1984,"y":1024},{"x":2400,"y":1024},{"x":2592,"y":1024},{"x":2624,"y":1024},{"x":2656,"y":1024},{"x":2688,"y":1024},{"x":2720,"y":1024},{"x":2752,"y":1024},{"x":2784,"y":1024},{"x":2816,"y":1024},{"x":2848,"y":1024},{"x":2880,"y":1024},{"x":2912,"y":1024},{"x":3168,"y":1024},{"x":0,"y":1056},{"x":512,"y":1056},{"x":1152,"y":1056},{"x":1792,"y":1056},{"x":1984,"y":1056},{"x":3168,"y":1056},{"x":0,"y":1088},{"x":512,"y":1088},{"x":1152,"y":1088},{"x":1792,"y":1088},{"x":1984,"y":1088},{"x":3168,"y":1088},{"x":0,"y":1120},{"x":512,"y":1120},{"x":1152,"y":1120},{"x":1792,"y":1120},{"x":1984,"y":1120},{"x":3168,"y":1120},{"x":0,"y":1152},{"x":512,"y":1152},{"x":1152,"y":1152},{"x":1792,"y":1152},{"x":1984,"y":1152},{"x":3168,"y":1152},{"x":0,"y":1184},{"x":512,"y":1184},{"x":1152,"y":1184},{"x":1792,"y":1184},{"x":1984,"y":1184},{"x":3168,"y":1184},{"x":0,"y":1216},{"x":512,"y":1216},{"x":1152,"y":1216},{"x":1792,"y":1216},{"x":1984,"y":1216},{"x":2144,"y":1216},{"x":2176,"y":1216},{"x":2208,"y":1216},{"x":2240,"y":1216},{"x":2272,"y":1216},{"x":2304,"y":1216},{"x":2336,"y":1216},{"x":2368,"y":1216},{"x":2400,"y":1216},{"x":2432,"y":1216},{"x":2464,"y":1216},{"x":2496,"y":1216},{"x":2528,"y":1216},{"x":2560,"y":1216},{"x":2592,"y":1216},{"x":2624,"y":1216},{"x":2656,"y":1216},{"x":2688,"y":1216},{"x":2720,"y":1216},{"x":2752,"y":1216},{"x":2784,"y":1216},{"x":2816,"y":1216},{"x":2848,"y":1216},{"x":2880,"y":1216},{"x":2912,"y":1216},{"x":2944,"y":1216},{"x":2976,"y":1216},{"x":3008,"y":1216},{"x":3040,"y":1216},{"x":3072,"y":1216},{"x":3104,"y":1216},{"x":3136,"y":1216},{"x":3168,"y":1216},{"x":0,"y":1248},{"x":512,"y":1248},{"x":1152,"y":1248},{"x":1792,"y":1248},{"x":1984,"y":1248},{"x":2144,"y":1248},{"x":3168,"y":1248},{"x":0,"y":1280},{"x":32,"y":1280},{"x":64,"y":1280},{"x":96,"y":1280},{"x":128,"y":1280},{"x":160,"y":1280},{"x":192,"y":1280},{"x":224,"y":1280},{"x":256,"y":1280},{"x":288,"y":1280},{"x":320,"y":1280},{"x":352,"y":1280},{"x":384,"y":1280},{"x":416,"y":1280},{"x":448,"y":1280},{"x":480,"y":1280},{"x":512,"y":1280},{"x":544,"y":1280},{"x":576,"y":1280},{"x":608,"y":1280},{"x":640,"y":1280},{"x":672,"y":1280},{"x":704,"y":1280},{"x":736,"y":1280},{"x":768,"y":1280},{"x":800,"y":1280},{"x":832,"y":1280},{"x":864,"y":1280},{"x":896,"y":1280},{"x":928,"y":1280},{"x":960,"y":1280},{"x":992,"y":1280},{"x":1024,"y":1280},{"x":1056,"y":1280},{"x":1088,"y":1280},{"x":1120,"y":1280},{"x":1152,"y":1280},{"x":1184,"y":1280},{"x":1216,"y":1280},{"x":1248,"y":1280},{"x":1280,"y":1280},{"x":1312,"y":1280},{"x":1344,"y":1280},{"x":1376,"y":1280},{"x":1408,"y":1280},{"x":1440,"y":1280},{"x":1472,"y":1280},{"x":1504,"y":1280},{"x":1536,"y":1280},{"x":1568,"y":1280},{"x":1600,"y":1280},{"x":1632,"y":1280},{"x":1664,"y":1280},{"x":1696,"y":1280},{"x":1728,"y":1280},{"x":1760,"y":1280},{"x":1792,"y":1280},{"x":1984,"y":1280},{"x":2144,"y":1280},{"x":3168,"y":1280},{"x":0,"y":1312},{"x":1056,"y":1312},{"x":1984,"y":1312},{"x":2144,"y":1312},{"x":3168,"y":1312},{"x":0,"y":1344},{"x":1056,"y":1344},{"x":1984,"y":1344},{"x":3168,"y":1344},{"x":0,"y":1376},{"x":1056,"y":1376},{"x":1984,"y":1376},{"x":3168,"y":1376},{"x":0,"y":1408},{"x":1056,"y":1408},{"x":1984,"y":1408},{"x":3168,"y":1408},{"x":0,"y":1440},{"x":1056,"y":1440},{"x":1984,"y":1440},{"x":3168,"y":1440},{"x":0,"y":1472},{"x":1056,"y":1472},{"x":1984,"y":1472},{"x":3168,"y":1472},{"x":0,"y":1504},{"x":1056,"y":1504},{"x":1984,"y":1504},{"x":3168,"y":1504},{"x":0,"y":1536},{"x":1056,"y":1536},{"x":1984,"y":1536},{"x":3168,"y":1536},{"x":0,"y":1568},{"x":1056,"y":1568},{"x":1984,"y":1568},{"x":3168,"y":1568},{"x":0,"y":1600},{"x":1056,"y":1600},{"x":1984,"y":1600},{"x":3168,"y":1600},{"x":0,"y":1632},{"x":1056,"y":1632},{"x":1984,"y":1632},{"x":3168,"y":1632},{"x":0,"y":1664},{"x":1056,"y":1664},{"x":1984,"y":1664},{"x":3168,"y":1664},{"x":0,"y":1696},{"x":1056,"y":1696},{"x":1984,"y":1696},{"x":3168,"y":1696},{"x":0,"y":1728},{"x":32,"y":1728},{"x":64,"y":1728},{"x":96,"y":1728},{"x":128,"y":1728},{"x":160,"y":1728},{"x":192,"y":1728},{"x":1056,"y":1728},{"x":1984,"y":1728},{"x":3168,"y":1728},{"x":0,"y":1760},{"x":1056,"y":1760},{"x":1984,"y":1760},{"x":3168,"y":1760},{"x":0,"y":1792},{"x":1056,"y":1792},{"x":1984,"y":1792},{"x":3168,"y":1792},{"x":0,"y":1824},{"x":1056,"y":1824},{"x":1984,"y":1824},{"x":3168,"y":1824},{"x":0,"y":1856},{"x":1056,"y":1856},{"x":3168,"y":1856},{"x":0,"y":1888},{"x":1056,"y":1888},{"x":3168,"y":1888},{"x":0,"y":1920},{"x":1056,"y":1920},{"x":3168,"y":1920},{"x":0,"y":1952},{"x":1984,"y":1952},{"x":3168,"y":1952},{"x":0,"y":1984},{"x":1984,"y":1984},{"x":3168,"y":1984},{"x":0,"y":2016},{"x":1984,"y":2016},{"x":3168,"y":2016},{"x":0,"y":2048},{"x":1056,"y":2048},{"x":1984,"y":2048},{"x":3168,"y":2048},{"x":0,"y":2080},{"x":1056,"y":2080},{"x":1984,"y":2080},{"x":3168,"y":2080},{"x":0,"y":2112},{"x":1056,"y":2112},{"x":1088,"y":2112},{"x":1120,"y":2112},{"x":1152,"y":2112},{"x":1184,"y":2112},{"x":1216,"y":2112},{"x":1248,"y":2112},{"x":1280,"y":2112},{"x":1312,"y":2112},{"x":1440,"y":2112},{"x":1472,"y":2112},{"x":1504,"y":2112},{"x":1536,"y":2112},{"x":1568,"y":2112},{"x":1600,"y":2112},{"x":1632,"y":2112},{"x":1664,"y":2112},{"x":1696,"y":2112},{"x":1728,"y":2112},{"x":1760,"y":2112},{"x":1792,"y":2112},{"x":1824,"y":2112},{"x":1856,"y":2112},{"x":1888,"y":2112},{"x":1920,"y":2112},{"x":1952,"y":2112},{"x":1984,"y":2112},{"x":2016,"y":2112},{"x":2048,"y":2112},{"x":2080,"y":2112},{"x":2112,"y":2112},{"x":2144,"y":2112},{"x":2176,"y":2112},{"x":2208,"y":2112},{"x":2240,"y":2112},{"x":2272,"y":2112},{"x":2304,"y":2112},{"x":2336,"y":2112},{"x":2368,"y":2112},{"x":2400,"y":2112},{"x":2432,"y":2112},{"x":2464,"y":2112},{"x":2496,"y":2112},{"x":2528,"y":2112},{"x":2560,"y":2112},{"x":2592,"y":2112},{"x":2752,"y":2112},{"x":2784,"y":2112},{"x":2816,"y":2112},{"x":2848,"y":2112},{"x":2880,"y":2112},{"x":2912,"y":2112},{"x":2944,"y":2112},{"x":2976,"y":2112},{"x":3008,"y":2112},{"x":3040,"y":2112},{"x":3072,"y":2112},{"x":3104,"y":2112},{"x":3136,"y":2112},{"x":3168,"y":2112},{"x":0,"y":2144},{"x":1056,"y":2144},{"x":3168,"y":2144},{"x":0,"y":2176},{"x":1056,"y":2176},{"x":3168,"y":2176},{"x":0,"y":2208},{"x":1056,"y":2208},{"x":3168,"y":2208},{"x":0,"y":2240},{"x":1056,"y":2240},{"x":3168,"y":2240},{"x":0,"y":2272},{"x":1056,"y":2272},{"x":3168,"y":2272},{"x":0,"y":2304},{"x":1056,"y":2304},{"x":3168,"y":2304},{"x":0,"y":2336},{"x":1056,"y":2336},{"x":3168,"y":2336},{"x":0,"y":2368},{"x":1088,"y":2368},{"x":3168,"y":2368},{"x":0,"y":2400},{"x":1056,"y":2400},{"x":3168,"y":2400},{"x":0,"y":2432},{"x":3168,"y":2432},{"x":0,"y":2464},{"x":3168,"y":2464},{"x":0,"y":2496},{"x":3168,"y":2496},{"x":0,"y":2528},{"x":3168,"y":2528},{"x":0,"y":2560},{"x":3168,"y":2560},{"x":0,"y":2592},{"x":3168,"y":2592},{"x":0,"y":2624},{"x":3168,"y":2624},{"x":0,"y":2656},{"x":3168,"y":2656},{"x":0,"y":2688},{"x":3168,"y":2688},{"x":0,"y":2720},{"x":3168,"y":2720},{"x":0,"y":2752},{"x":3168,"y":2752},{"x":0,"y":2784},{"x":3168,"y":2784},{"x":0,"y":2816},{"x":3168,"y":2816},{"x":0,"y":2848},{"x":3168,"y":2848},{"x":0,"y":2880},{"x":3168,"y":2880},{"x":0,"y":2912},{"x":3168,"y":2912},{"x":0,"y":2944},{"x":3168,"y":2944},{"x":0,"y":2976},{"x":3168,"y":2976},{"x":0,"y":3008},{"x":3168,"y":3008},{"x":0,"y":3040},{"x":3168,"y":3040},{"x":0,"y":3072},{"x":3168,"y":3072},{"x":0,"y":3104},{"x":3168,"y":3104},{"x":0,"y":3136},{"x":3168,"y":3136},{"x":0,"y":3168},{"x":32,"y":3168},{"x":64,"y":3168},{"x":96,"y":3168},{"x":128,"y":3168},{"x":160,"y":3168},{"x":192,"y":3168},{"x":224,"y":3168},{"x":256,"y":3168},{"x":288,"y":3168},{"x":320,"y":3168},{"x":352,"y":3168},{"x":384,"y":3168},{"x":416,"y":3168},{"x":448,"y":3168},{"x":480,"y":3168},{"x":512,"y":3168},{"x":544,"y":3168},{"x":576,"y":3168},{"x":608,"y":3168},{"x":640,"y":3168},{"x":672,"y":3168},{"x":704,"y":3168},{"x":736,"y":3168},{"x":768,"y":3168},{"x":800,"y":3168},{"x":832,"y":3168},{"x":864,"y":3168},{"x":896,"y":3168},{"x":928,"y":3168},{"x":960,"y":3168},{"x":992,"y":3168},{"x":1024,"y":3168},{"x":1056,"y":3168},{"x":1088,"y":3168},{"x":1120,"y":3168},{"x":1152,"y":3168},{"x":1184,"y":3168},{"x":1216,"y":3168},{"x":1248,"y":3168},{"x":1280,"y":3168},{"x":1312,"y":3168},{"x":1344,"y":3168},{"x":1376,"y":3168},{"x":1408,"y":3168},{"x":1440,"y":3168},{"x":1472,"y":3168},{"x":1504,"y":3168},{"x":1536,"y":3168},{"x":1568,"y":3168},{"x":1600,"y":3168},{"x":1632,"y":3168},{"x":1664,"y":3168},{"x":1696,"y":3168},{"x":1728,"y":3168},{"x":1760,"y":3168},{"x":1792,"y":3168},{"x":1824,"y":3168},{"x":1856,"y":3168},{"x":1888,"y":3168},{"x":1920,"y":3168},{"x":1952,"y":3168},{"x":1984,"y":3168},{"x":2016,"y":3168},{"x":2048,"y":3168},{"x":2080,"y":3168},{"x":2112,"y":3168},{"x":2144,"y":3168},{"x":2176,"y":3168},{"x":2208,"y":3168},{"x":2240,"y":3168},{"x":2272,"y":3168},{"x":2304,"y":3168},{"x":2336,"y":3168},{"x":2368,"y":3168},{"x":2400,"y":3168},{"x":2432,"y":3168},{"x":2464,"y":3168},{"x":2496,"y":3168},{"x":2528,"y":3168},{"x":2560,"y":3168},{"x":2592,"y":3168},{"x":2624,"y":3168},{"x":2656,"y":3168},{"x":2688,"y":3168},{"x":2720,"y":3168},{"x":2752,"y":3168},{"x":2784,"y":3168},{"x":2816,"y":3168},{"x":2848,"y":3168},{"x":2880,"y":3168},{"x":2912,"y":3168},{"x":2944,"y":3168},{"x":2976,"y":3168},{"x":3008,"y":3168},{"x":3040,"y":3168},{"x":3072,"y":3168},{"x":3104,"y":3168},{"x":3136,"y":3168},{"x":3168,"y":3168}];
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
	"x": 1216,
	"y": 192,
	"item": "backpack",
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
	"img": "images/school.png"
}, {
	"x": 1344,
	"y": 1120,
	"item": "store",
	"isFound": false,
	"img": "images/school.png"
}, {
	"x": 384,
	"y": 1152,
	"item": "milk",
	"isFound": false,
	"img": "images/school.png"
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

// Add audio element
let gameAudio = document.createElement("audio");

// Character move controls
$(document).ready(function() {
	//Resize window
	//window.resizeTo(288, 224);

	setTimeout(function() {
		// Reset window scroll position
		$(window).scrollLeft(0);
		$(window).scrollTop(0);

		// Show map layers
		loadColliders();
		loadModifiers();
		loadItems();
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
		curCourage += curInterval;
		if (curCourage > 100) {
			curCourage = 100;
		}
		$('#courage').animate({
			"width": curCourage + "%"
		}, 500);
	}, 1000);


	// increase courage when home
	function checkHome() {
		if (curPosX == 32 && curPosY == 32) {
			// Controls drop speed
			curInterval = riseSpeed;

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
					if (curPosX == 32 && curPosY == 32) {
						curItems[key].isHome = true;
						myItem = key;
					}
				}
			}
		}
	}

	$(document).on("keydown", function(e) {

		// Optional Setting : Courage decreases with moves
		//curCourage -= 1;
		//$('#courage').css('width',curCourage +"%")

		// Loser message    
		if (curCourage <= -1) {
			var promise = document.querySelector('audio').pause();
			if (promise !== undefined) {
				promise.then(_ => {
					// Autoplay started!
				}).catch(error => {
					// Autoplay was prevented.
					// Show a "Play" button so that user can start playback.
				});
			}
			$(document).off();
			$('#character').fadeOut();
			$('#console').html("Game over! You lost.");
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
					if ((curPosX - window.scrollX) < (window.innerWidth / 2)) {
						let curView = window.scrollX;
						let newView = curView - (window.innerWidth / 2);
						$('html, body').animate({
							"scrollLeft": newView
						}, 500);
						currViewX -= 1;
						//console.log(currViewX);
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
					if ((curPosY - window.scrollY) < (window.innerHeight / 2)) {
						let curView = window.scrollY;
						let newView = curView - (window.innerHeight / 3);
						$('html, body').animate({
							"scrollTop": newView
						}, 500);
						currViewY -= 1;
						//console.log(currViewY);
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
					if ((curPosX - window.scrollX) > (window.innerWidth / 2)) {
						let curView = window.scrollX;
						let newView = curView + (window.innerWidth / 2);
						$('html, body').animate({
							"scrollLeft": newView
						}, 500);
						currViewX += 1;
						//console.log(currViewX);
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
					if ((curPosY - window.scrollY) > (window.innerHeight / 2)) {
						let curView = window.scrollY;
						let newView = curView + (window.innerHeight / 3);
						$('html, body').animate({
							"scrollTop": newView
						}, 500);
						currViewY += 1;
						//console.log(currViewY);
					}
				}
				break;

			default:
				return; // exit this handler for other keys
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	});

});