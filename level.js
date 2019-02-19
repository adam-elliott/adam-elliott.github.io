let level = {
		name : "",
		author : "",
		background : "",
		collisions: [],
		map: [{
				item: "",
				img: "",
				cells: []
			},
		goals: [{
			"x": 0,
			"y": 0,
			"item": "",
			"img": "",
			"isFound": false,
			"isCollected": false,
			"isHome": false
		}]
	}


function createLevel() {
	let levelTemplate = {
		name : "",
		author : "",
		background : "",
		collisions: [],
		map: [{
				item: "",
				img: "",
				cells: []
			}],
		goals: [{
			"x": 0,
			"y": 0,
			"item": "",
			"img": "",
			"isFound": false,
			"isCollected": false,
			"isHome": false
		}]
	}
	
	levelTemplate.name = prompt("Level name:");
        levelTemplate.author = prompt("Author name:");
        levelTemplate.collisions = generateCollidersMap();
        levelTemplate.map.push(generateModifiersMap(););
        console.log('levelTemplate');
}