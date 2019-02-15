function Character(name) {
	this.name = name;
	this.isHome = false;
	this.curPosX = 0;
	this.curPosY = 0;
	this.curCourage = 100;
	this.moveLeft = function() {
		//return "move left";
	  };
	this.moveRight = function() {
		//return "move right";
	  };
	this.moveUp = function() {
		//return "move up";
	  };
	this.moveDown = function() {
		//return "move down";
	};
};

let summonYourCourage = {
	"character" : {
		"new" : function(name) {
			Character(name);
		}
	},
	"settings": {
		"character": {
			"origPosX": 32,
			"origPosY": 32,
			"size": 32,
			"speed": 100,
			"canMove" : true,
			"canMoveX" : true,
			"canMoveY" : true
		},
		"game": {
			"dropSpeed": -4,
			"riseSpeed": 10
		}
	},
	"map": {
		"width":10000,
		"height":10000,
		"background" : "images/background.jpg",
		"items": {
			"item1": {
				"x": 32,
				"y": 32,
				"name": "item1",
				"isFound": false,
				"img": "images/item.png",
				"isCollected": false,
				"isHome": false,
			},
			"item2": {
				"x": 32,
				"y": 32,
				"name": "item2",
				"isFound": false,
				"img": "images/item2.png",
				"isCollected": false,
				"isHome": false,
			}
		},
		"colliders": {
			"trees": {
				"img":"images/tree.png",
				"cells":[]
			},
			"walls": {
				"img":"images/wall.png",
				"cells":[]
			},
			"houses": {
				"img":"images/house.png",
				"cells":[]
			},
		}
	},
	"authors": ["Adam Elliott", "Jacquelynn Vorasane", "Audrey Coumerilh", "Ben Coumerilh", "Jordan Casale", "Eli Casale", "Blake Foster", "Chris Biel"],
	"version": 1.0,
	"license": "MIT"
}