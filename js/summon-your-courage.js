let devMode = false;
let iAgree = true;

let level = {}
let levelTemplate = {};

$(document).ready(function() {

	// devMode Settings
	if (devMode == true) {
		setTimeout(function() {
			curCourage = 250;
			iAgree = true;
			$("#mapOverlay").hide();
			$("#newGame").hide();
			$('body').css("overflow", "scroll");
			$('#console').hide();
			$('#inventory').hide();
			$('#mapTools').show();
			//$('#mapMode').show();
			dragElement(document.getElementById("mapTools"));
			mapModeInit();
			$('#mapTools').css('left','1376px');
			$('#mapTools').css('top','64px');
			level = {};
			//
		}, 20)

	} else {
		$('#mapTools').hide();
		//$('#loadLevel').hide();
		iAgree = confirm("WARNING: This game may potentially trigger seizures for people with photosensitive epilepsy. User discretion is advised. Do you wish to continue? ");
	}
	
	

	// Map Creation Mode
	//$('#hud').on('dblclick', function(){
	//	mapModeInit();
	//	window.resizeTo(1024, 768);
	//});
	
	$('#addLevel').click(function(){mapModeInit()});
	
	function mapModeInit() {
		$(window).off();
		$('#console, #inventory, #courageMeter').hide();
		$('#hud h1').html("Level Builder Mode")
		$('#editor').css('z-index','100');
		$('#editor').show();;
		$('#guide').html('')
		
		levelTemplate = {
				name : "",
				author : "",
				courage : [{
						x : "64",
						y : "64"
					}],			
				background : "",
				collisions: [],
				map: {
					"wall" : {
						img: "",
						cells: []
						},
					"house" : {
						img: "",
						cells: []
						},
					"home" : {
						img: "",
						cells: []
						},
					"tree" : {
						img: "",
						cells: []
						},
					"mod" : {
						img: "",
						cells: []
						},
					"enemy" : {
						img: "",
						cells: []
						},
					},
				goals : [{
						 "item": {
							"x": 0,
							"y": 0,
							"img": "",
							"isFound": false,
							"isCollected": false,
							"isHome": false
						}
					}]
				};
			
		//loadMapElements(levelTemplate);
		
		$('body').css('overflow', 'scroll');

		//$('#mapMode').fadeIn();
		$('#mapTools').fadeIn();
		
		$('#closeMapTools').click(function(){
			$('#mapTools').hide();
			alert("You are leaving map mode, and the game will now reload.")
			window.location.reload(true);
		});
		
		// Make toolbox draggable
		dragElement(document.getElementById("mapTools"));

		// Generate cells for coordinate system
		for (let i = 0; i < 10000; i++) {
			let myCell = document.createElement('div');
			myCell.classList.add("cell");
			document.getElementById('editor').appendChild(myCell);
			
		}
		
		$("#setWallColliderCells").click(function(){
			$('.wall').addClass('collider');
		});
		$("#setTreeColliderCells").click(function(){
			$('.tree').addClass('collider');
		});
		
		// Controls for building map elements
		$('.setCell').click(function(evt) {
			if ($(this).hasClass('active') ){
				$('#mapTools *').removeClass('active');
			} else {
				$('#mapTools *').removeClass('active');
				$(this).toggleClass('active');
				setCells(evt);
				// $(this).addClass( prompt("Input one of the following: wall, rock, bush, river " } );
			}
		})
		
		$('.clearCell').click(function(evt) {
			let item = $(evt.target).data('type');
			let sel = "." + item;
			console.log(sel);
			$(sel).removeClass(item);
		})

		
		function setCells(evt) {
			//console.log(level)
			evt.preventDefault();
			let celType = $(evt.target).data("type");
			let newCellX = $(evt.target).offset().left;
			let newCellY = ($(evt.target).offset().top-60);
			$('.cell').off();
			$('.cell').click(function() {
				$(this).toggleClass(celType);
			});
			$('.cell').dblclick(function() {
				$(this).toggleClass(celType);
				$(this).data("mod", prompt("Please specify a value of this modifier. (i.e. 5 or -5)"));
			})
			
		}
		
			
		let mapItems = [];
		
		function generateItemCoordinates(n) {
			mapItems = [];
			let itemType = n;
			let sel = `.${n}`;	
			
			$(sel).each(function() {
				//.iter(itemType);
				let y = $(this).offset().top - 60;
				let x = $(this).offset().left;
				let mod = $(this).data('mod') || 0;
				let obj = {
					"x": x,
					"y": y,
					"mod": mod
				};
				
				if (itemType == "courage") {
					levelTemplate.courage.push(obj);
				} else {
					levelTemplate.map[n].cells.push(obj);	
				}
			});
		}
		
				
		$('.setGoalCell').click(function(evt) {
			if ($(this).hasClass('active') ){
				$('#mapTools *').removeClass('active');
			} else {
				$('#mapTools *').removeClass('active');
				$(this).toggleClass('active');
				setGoalCells(evt);
				// $(this).addClass( prompt("Input one of the following: wall, rock, bush, river " } );
			}
		})
		
		function setGoalCells(evt) {
			//.iter(level)
			evt.preventDefault();
			let celType = $(evt.target).data("type");
			let newCellX = $(evt.target).offset().left;
			let newCellY = ($(evt.target).offset().top-60);
			$('.cell').off();
			$('.cell').click(function() {
				$("."+celType).removeClass(celType);
				$('#mapTools *').removeClass('active');
				$(this).toggleClass(celType + " goal");
				$(this).data("type",celType);
				$('.cell').off();
			});
			$('.cell').dblclick(function() {
				$("."+celType).removeClass(celType);
				$(this).toggleClass(celType + " goal");
				$(this).data("type",celType);
				$(this).data("mod", prompt("Please specify a value of this modifier. (i.e. 5 or -5)"));
				$('.cell').off();
			})
		}
		
			
		let goalItems = [];
		
		function generateGoalCoordinates() {
			goalItems = [];
			levelTemplate.goals = [];
			$('.goal').each(function() {
				let celItem = $(this).data("type");
				let y = $(this).offset().top - 60;
				let x = $(this).offset().left;
				let obj = {
						"item" : celItem,
						"cells" : {
						"x": x,
						"y": y
						},
						"isFound": false,
						"isCollected": false,
						"isHome": false
					
				}
				levelTemplate.goals.push(obj);	
			});
			
		}
		
		
		$(".cell").contextmenu(function() {
			alert("x: " + $(this).offset().left + " , y: " + ($(this).offset().top - 60) );
		});

		let mapColliders = [];

		function generateCollidersMap() {
			mapColliders = [];

			$('.collider').each(function() {
				let y = $(this).offset().top - 60;
				let x = $(this).offset().left;
				
				let obj = {
					"x": x,
					"y": y,
				};
				levelTemplate.collisions.push(obj);
			});
			//.iter(mapColliders);
		}

		function generateModifiersMap() {
			mapModifiers = [];

			$('.active2').each(function() {
				let y = $(this).offset().top - 60;
				let x = $(this).offset().left;
				let mod = $(this).data('courage');
				//.iter(mod);
				let obj = {
					"x": x,
					"y": y,
					"mod": mod
				};
				mapModifiers.push(obj);
			});
			//.iter(mapModifiers);
		}
		
		function editBackground() {
			
		}
		
		function selectBackground() {
			
		}
		
		function generateItems() {
			
		}
		
		function generateGoals() {
			
		}
		
		function createLevel() {
			if (levelTemplate.name == ""){
				if ($('#levelName').val() == "" ) {
					levelTemplate.name = prompt("Level name:");
					$('#levelName').val(levelTemplate.name)
				} else {
					levelTemplate.name = $('#levelName').val();
				}
			}
			if (levelTemplate.author == "") {
				if ($('#authorName').val() == "" ) {
					levelTemplate.author = prompt("Author name:");
					$('#authorName').val(levelTemplate.author)
				} else {
					levelTemplate.author = $('#authorName').val();
				}
			}
			
			generateItemCoordinates("wall");
			generateItemCoordinates("tree");
			generateItemCoordinates("house");
			generateItemCoordinates("home");
			generateItemCoordinates("enemy");
			generateItemCoordinates("modifier");
			generateCollidersMap();
			generateGoalCoordinates()
			//.iter(levelTemplate);
			
			let hasAccess = prompt ("Enter the password to save your level:");
			
			if (hasAccess == "GameJam") {
				$.post( "levelAdd.php", {
					level : JSON.stringify(levelTemplate),
					name : levelTemplate.name,
					background : levelTemplate.background,
					author : levelTemplate.author,
					goals : JSON.stringify(levelTemplate.goals),
					map : JSON.stringify(levelTemplate.map),
					courage : JSON.stringify(levelTemplate.courage),
					collisions : JSON.stringify(levelTemplate.collisions)			
				}, function() {
					alert('Your level has been saved and is now available to play.');
					loadLevelList();
				});
			} else {
				alert("Sorry, you must know the password to save levels.")
			}
			
			
			
		}

		$('#generateColliders').on("click", function(e) {
			e.preventDefault();
			generateCollidersMap();
		});

		$('#generateModifiers').on("click", function(e) {
			e.preventDefault();
			generateModifiersMap();
		});
		
		// delete level
		function deleteLevel() {
			let levelId = $('#levels tr td:nth-child(1)').text();
			$.post( "levelDelete.php", {level: levelId} );
		}
			
		// save new level
		$('#createLevel').on("click", function(e) {
			e.preventDefault();
			createLevel();
		});
		

	}



	// Character Variables

	// Character start position
	let origPosX = 64;
	let origPosY = 64;

	// Character position
	let curPosX = 64;
	let curPosY = 64;

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
	
	// Level setup functions

	// load map elements
	function loadMap(level) {
		//$('#map').css("background",level.map.background)
		for (key in level.map) {
			let iter = key;
			let iterNum = key;
			for (key in level.map[key].cells) {
				let myCell = document.createElement('div');
				myCell.classList.add(iter);
				//myCell.style.backgroundImage = level.map.iter.img;
				myCell.style.left = level.map[iterNum].cells[key].x + "px";
				myCell.style.top = level.map[iterNum].cells[key].y + "px";
				$('#guide').append(myCell);
			}
		}
	}

	// load goals items
	function loadItems(level) {
		for (key in level.goals) {
			if (level.goals[key].isFound != true) {
				let myCell = document.createElement('div');
				myCell.classList.add('item');
				myCell.classList.add(level.goals[key].item);
				myCell.style.left = level.goals[key].cells.x + "px";
				myCell.style.top = level.goals[key].cells.y + "px";
				//myCell.style.background = "url('" + level.goals[key].img + "')"
				$('#guide').append(myCell);
			}
		}
	}
	
	function simulateWin() {
		for (key in level.goals) {
			level.goals[key].isFound = true;
			level.goals[key].isCollected = true;
			level.goals[key].isHome = true;
		}
		//.iter(level);
	}
	
	//simulateWin();
	
	
	// Populates map from level 
	function loadMapElements(level) {
		$("#guide").html("");
		
		// set map height based on level
		let mapHeight = window.innerHeight;
		for (key in level.collisions) {
			if (mapHeight < level.collisions[key].y) {
				mapHeight = level.collisions[key].y;
				//.iter(mapHeight);
			}
		}
		$('#map').css('height',(mapHeight+122)+"px");
		
		
		loadMap(level);
		loadItems(level);
		if (level.courage != undefined) {
			origPosX = level.courage[0].x;
		}
		if (level.courage != undefined) {
			origPosY = level.courage[0].y;
		}
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

	$('#audioToggle').click(function() {
		toggleAudio();
	});


	function tripOut() {
		// alter map colors
		let curColor = 0;
		let tripFilter = window.setInterval(function() {
			curColor += 10;
			$('#guide, #map').css("transition", ".25s ease-in-out all");
			$('#guide, #map').css("filter", "hue-rotate(" + curColor + "deg)");
		}, 10);
		// pulsate map object scale
		let tripScaler = window.setInterval(function() {
			$('#guide > div').each(function() {
				let tripScale = (Math.random() * (0.0 - 2.00) + 2.00).toFixed(4)
				$(this).css("transition", ".5s ease-in-out all");
				$(this).css("transform", "scale(" + tripScale + ")");
			});
		}, 500);
		// end cycle
		window.setTimeout(function() {
			clearInterval(tripFilter);
			clearInterval(tripScaler);
			$('#guide, #map').css("filter", "hue-rotate(0deg)");
			$('#guide > div').each(function() {
				$(this).css("transform", "scale(1)");
			});
			curCourage = 100;
		}, 5000);
	}
	
	
	// load all levels
	function loadLevelList() {
		$('#loadLevel').html("");
		$('#loadLevel').load( "levelLoad.php");
	}

	$('#loadLevel').on('change', function(evt){
		loadLevel(evt);
	});
	
	function loadLevel(e) {
		let newLevel = e.currentTarget.selectedOptions[0].dataset.level;
		//.iter(newLevel)
		if (newLevel != "") {
			level = JSON.parse(newLevel);
			loadMapElements(level);
		}
	}

	//Game Logic




	// adjust courage and handle items
	function checkHome() {
		// Test if current position matches original position
		if (curPosX == origPosX && curPosY == origPosY) {
			// Make courage increase
			curInterval = riseSpeed;
			
			// Handle collected items
			for (key in level.goals) {
				if (level.goals[key].isCollected == true && level.goals[key].isHome == false) {
					level.goals[key].isHome = true;
					$('#console').html('<p>You brought home ' + level.goals[key].item + "! Your courage will now last longer!</p>");
					$('#invHome').append($('#invBag').html())
					$('#invBag').html("");
					
				} else {
					$('#console').html('<p>Welcome home! You can always return here to rebuild your courage.</p>');
				}
			}
			checkWin();
		} else {
			// Make courage decrease
			curInterval = dropSpeed;
		}

		let myItem = "";
	}

	// future development - coule be used to adjust courage as you collect items
	//function evalCourage() {
	//	// curItems - object with list of items, prop for isHome
	//
	//	//for (key in curItems) {
	//	//	if (curItems[key].isHome == true) {
	//	//		courageBoost += 10;
	//	//	}
	//	//}
	//}
	
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
		for (key in level.collisions) {
			if (level.collisions[key].x == newPosX && level.collisions[key].y == newPosY) {
				isTrue = false;
			}
		}
		return isTrue;
	}
	
	//Test win conditions versus level object goals
	function checkWin() {
		let totItemsHome = 0;
		let totItemsFound = 0;
		
		
		for (key in level.goals) {
			if (level.goals[key].isFound == true) {
				totItemsFound += 1;
				//.iter(totItemsFound);
			}
			if (level.goals[key].isHome == true) {
				totItemsHome += 1;
				//.iter(totItemsHome);
			}
		}
		
		//if ( level.hasOwnProperty("goals") ) {
			if (totItemsFound < level.goals.length) {
				$('#console').html(`<p>You have found ${totItemsFound} of ${level.goals.length} goals. Keep exploring the map for more items!</p>`);
			} else if (totItemsFound == level.goals.length && totItemsHome < level.goals.length) {
				$('#console').html(`<p>You have found ${totItemsFound} of ${level.goals.length} goals. Return home before your courage runs out to win the game!</p>`);
			}
			else if ( totItemsHome == level.goals.length ) {
				$('#console').html(`<p>You brought all ${totItemsHome} home! You win!</p>`);
			} else {
				$('#console').html(`You have found ${totItemsFound} of ${level.goals.length} goals.`);
			}
			
			//console.log(`You have found ${totItemsFound} of ${level.goals.length} goals.`);
		//<
	}


	// Handle collectable items
	function handleItems() {	
		for (key in level.goals) {
			if (level.goals[key].cells.x == curPosX && level.goals[key].cells.y == curPosY) {
				if (level.goals[key].isFound != true) {
					if (level.goals[key].item == "mushroom") {
						tripOut();
						level.goals[key].isFound = true;
						loadMapElements(level);
						checkWin();
					} else {
						$('#console').html('<p>You collected a ' + level.goals[key].item + "! Return home for a courage boost.</p>");
						let myItem = level.goals[key].item;
						level.goals[key].isCollected = true;
						level.goals[key].isFound = true;
						let invItem = document.createElement('div');
						invItem.classList.add(myItem);
						invItem.classList.add('item');
						invItem.classList.add('left');
						invItem.classList.add('collected');
						document.getElementById('invBag').appendChild(invItem);
						loadMapElements(level);
						checkWin();
					}
				}
			}
		}
	}
	

	// Handle modifiers
	function handleModifiers() {
		for (key in level) {
			let iter = key;
			for (key in level[iter]) {
				if (key == "modifier") {
					//.iter('found mods');
					let iter2 = key;
					for (key in level[iter][iter2] ) {
						let iter3 = key;
							for (key in level[iter][iter2][iter3] ) {
								//.iter(level[iter][iter2][iter3][key].x)
								//.iter(level[iter][iter2][iter3][key].y)
								if (level[iter][iter2][iter3][key].x == curPosX && level[iter][iter2][iter3][key].y == curPosY) {
									curCourage += parseInt(level[iter][iter2][iter3][key].mod);
									modPoints += parseInt(level[iter][iter2][iter3][key].mod);
									$('#invMod').html(modPoints);
									$('#console').html("<p>You received a +" + level[iter][iter2][iter3][key].mod + " courage boost!</p>")
									$("#courage").animate(function() {
										width: curCourage
									}, animSpeed, function() {
										// Animation complete.
										$('#console').html("<p>You received a +" + level[iter][iter2][iter3][key].mod + " courage boost!</p>");
										// Remove modifier from list
										level[iter][iter2][iter3].splice(key, 1);
										// Update modifiers from list
										loadMapElements(level);
									});
								}
							}
					}
				}
				if (key == "enemy") {
					//.iter('found enemy');
					let iter2 = key;
					for (key in level[iter][iter2] ) {
						let iter3 = key;
							for (key in level[iter][iter2][iter3] ) {
								//console.log(level[iter][iter2][iter3][key].x)
								//console.log(level[iter][iter2][iter3][key].y)
								if (level[iter][iter2][iter3][key].x == curPosX && level[iter][iter2][iter3][key].y == curPosY) {
									curCourage += parseInt(level[iter][iter2][iter3][key].mod);
									modPoints += parseInt(level[iter][iter2][iter3][key].mod);
									$('#invMod').html(modPoints);
									$('#console').html("<p>You lost " + level[iter][iter2][iter3][key].mod + " courage.</p>")
									$("#courage").animate(function() {
										width: curCourage
									}, animSpeed, function() {
										// Animation complete.
										$('#console').html("<p>You lost " + level[iter][iter2][iter3][key].mod + " courage.</p>");
										// Remove modifier from list
										level[iter][iter2][iter3].splice(key, 1);
										// Update modifiers from list
										loadMapElements(level);
									});
								}
							}
					}
				}
			}
			
		}
	}
		

	// Play death sound
	function playDeathSound() {
		gameAudio.src = "audio/deathRattle.oggvorbis.ogg";
		gameAudio.load();
		gameAudio.play();
	}


	// Deathwall ending
	function deathWall() {
		if (curCourage <= -1) {
			if ($("#deathWall").length == 0) {
				let deathWallWidth = 100;
				let deathWall = document.createElement('div');
				deathWall.id = "deathWall";
				deathWall.style.position = "absolute";
				deathWall.style.top = 0;
				deathWall.style.left = deathWallWidth + "vw";
				deathWall.style.bottom = 0;
				deathWall.style.right = 0;
				deathWall.style.transition = ".125s ease all";
				document.getElementById('deathWallContainer').appendChild(deathWall);
				$('#console').html("<p>Your courage is depleted and the dark cloud is approaching! Hurry home!</p>")
				let deathWallInterval = setInterval(function() {
					deathWallWidth -= 5;
					deathWall.style.left = deathWallWidth + "vw";

					$('#character').css("animation", "crying .5s infinite");
					

					if ($("#deathWall").length != 0) {
						if (curPosX == 64 && curPosY == 64) {
							deathWallWidth = 100;
							$("#deathWall").fadeOut(500, function() {
								$("#deathWall").remove();
							});

							clearInterval(deathWallInterval);
							$('#character').css("background", "url(images/WlkBk1.png)");
							$('#character').css("animation", "none");
							$('#console').html("<p>You made it safely back home. Recharge your courage and keep exploring the map!</p>")
						} else if (curCourage >= 1) {
							deathWallWidth = 100;
							$("#deathWall").fadeOut(500, function() {
								$("#deathWall").remove();
							});
							clearInterval(deathWallInterval);
							$('#character').css("background", "url(images/WlkBk1.png)");
							$('#character').css("animation", "none");
							$('#console').html("<p>Your courage boost saved you! Recharge your courage and keep exploring the map.</p>")
						}

						if (curPosX >= ($('#deathWall').offset().left + 50)) {
							$('#console').html("<p>Game over! You lost.</p>");
							$(document).off();
							$('#character').fadeOut();
							deathWallWidth = -40;
							deathWall.style.left = deathWallWidth + "vw";
							clearInterval(deathWallInterval);
							//playSoundEffect('deathRattle');
							playDeathSound();
						}

						if (deathWallWidth == 0) {
							$('#console').html("<p>Game over! You lost.</p>");
							$(document).off();
							$('#character').fadeOut();
							clearInterval(deathWallInterval);
							//playSoundEffect('deathRattle');
							playDeathSound();
						}
					}
				}, 500);

			}
		}
	}

	// initialize game setup
	function summonInit() {
		// window size
		var size = [800, 600];
		$(window).resize(function() {
			window.resizeTo(size[0], size[1]);
		});

		// Disable scrolling.
		$(document).bind(
			'touchmove',
			function(e) {
				e.preventDefault();
			}
		);

		// start game
		$('#startGame').click(function() {
			$('#newGame').fadeOut();
		});
		// Set welcome message on console.
		$('#console').html("<p>Welcome! Your courage level will drop as you explore the map and bring items home. Return home to rebuild courage!</p>");

		// Controls
		$('#controlLeft').on('click press', function() {
			jQuery.event.trigger({
				type: 'keydown',
				which: 37
			});
		});

		$('#controlRight').on('click press', function() {
			jQuery.event.trigger({
				type: 'keydown',
				which: 39
			});
		});

		$('#controlUp').on('click press', function() {
			jQuery.event.trigger({
				type: 'keydown',
				which: 38
			});
		});

		$('#controlDown').on('click press', function() {
			jQuery.event.trigger({
				type: 'keydown',
				which: 40
			});
		});

		setTimeout(function() {
			// Reset window scroll position
			$(window).scrollLeft(0);
			$(window).scrollTop(0);

			// Show map layers
			loadMapElements(level);
			$('#guide').fadeIn();

			// Preload images
			var images = [];

			function preload() {
				for (var i = 0; i < arguments.length; i++) {
					images[i] = new Image();
					images[i].src = preload.arguments[i];
					images[i].load;
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
				loadMapElements(level);
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
			//.iter("courage:" + curCourage);
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
					$('#courage').animate({
						"width": curCourage + "%"
					}, 500);
				}
			} else if (curCourage > 100) {
				curCourage = 100;
			} else {
				curCourage += curInterval;

				if (curCourage >= 100) {
					curCourage = 100;
				}

				$('#courage').animate({
					"width": curCourage + "%"
				}, 500);
			}
		}, 1000);

	}
	
	//console animation
	
	 // select the target node
	var target = document.querySelector('#console')
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
		 console.log($('#console').text());
		 $('#console > p').hide();
		 $('#console > p').delay(400).slideDown(500);
		$(target).slideUp(300);
		$(target).slideDown(400);
	});
	// configuration of the observer:
	var config = { childList: true, characterData: true };
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
	
	//$("#body").on('DOMSubtreeModified', "#console", function() {
	//	$(this).slideUp(500);
	//	$(this).slideDown(500);
	//});
	
	
	// Helper functions
	
	
	function dragElement(elmnt) {
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		if (document.getElementById(elmnt.id + "Header")) {
		  // if present, the header is where you move the DIV from:
		  document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
		} else {
		  // otherwise, move the DIV from anywhere inside the DIV: 
		  elmnt.onmousedown = dragMouseDown;
		}
	  
		function dragMouseDown(e) {
		  e = e || window.event;
		  e.preventDefault();
		  // get the mouse cursor position at startup:
		  pos3 = e.clientX;
		  pos4 = e.clientY;
		  document.onmouseup = closeDragElement;
		  // call a function whenever the cursor moves:
		  document.onmousemove = elementDrag;
		}
	  
		function elementDrag(e) {
		  e = e || window.event;
		  e.preventDefault();
		  // calculate the new cursor position:
		  pos1 = pos3 - e.clientX;
		  pos2 = pos4 - e.clientY;
		  pos3 = e.clientX;
		  pos4 = e.clientY;
		  // set the element's new position:
		  elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		  elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		}
	  
		function closeDragElement() {
		  // stop moving when mouse button is released:
		  document.onmouseup = null;
		  document.onmousemove = null;
		}
	  }

	if (iAgree == true) {
		summonInit();
		loadSoundEffects();
		
		
		loadLevelList();
		
		// Handle keyboard input for game controls
		$(document).on("keydown", function(e) {
			deathWall();


			// Play game audio
			gameAudioInit();




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
								}, 400, function() {
									isLocked = false
								});
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
								}, 400, function() {
									isLocked = false
								});
							}
							if ((curPosY - window.scrollY) > (window.innerHeight - 90)) {
								isLocked = true;
								let curView = window.scrollY;
								let newView = curView - ((window.innerHeight / 3) - 50);
								$('html, body').animate({
									"scrollTop": newView
								}, 400, function() {
									isLocked = false
								});
							}
						}
					}
					break;

				case 39: // right
					//.iter(e);
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
								}, 400, function() {
									isLocked = false
								});
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
								handleItems();
							});
						}

						// Window scroll
						if (isLocked == false) {
							if ((curPosY - window.scrollY) > ((window.innerHeight / 2) - 30)) {
								let curView = window.scrollY;
								isLocked = true;
								let newView = curView + ((window.innerHeight / 3) + 50);
								$('html, body').animate({
									"scrollTop": newView
								}, 400, function() {
									isLocked = false
								});
							}
						}
					}
					break;

				default:
					return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		});


	} else {
		alert("Sorry this game was not for you! You will be redirected to the Global Game Jam to find a better match.")
		window.location.replace("https://globalgamejam.org/2019/games")
	}

});