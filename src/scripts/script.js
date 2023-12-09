"use strict";
import HighScore from "./HighScore.js";
import Level from "./Level.js";

const VERSION = 1.0;

/**@type {string} (html class name) */
let loadedSection = null;

const MONTHS = [
	"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/** @type {Level[]} */
const levels = [
	new Level(
		"Keyboard Dash",
		"test-level",
		"testLevel",
		[
			'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
			'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
			'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
			'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
			'philosophy', 'database', 'periodic', 'capitalism', 'abominable',
			'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
			'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'promise',
			'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
			'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
			'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess',
			'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library',
			'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy',
			'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous',
			'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
			'keyboard', 'window', 'beans', 'truck', 'sheep', 'band', 'level', 'hope',
			'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'mask',
			'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
			'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort', 'escape'
		],
		20
	)
];

//later I might make a prompt giving users a choice.
let localStorageEnabled = true;

let saveData = {

};

let settings = {

};

const levelManager = {
	/**@type {HTMLAudioElement} https://pixabay.com/music/build-up-scenes-science-documentary-169621/ */
	music: new Audio("./src/audio/science-documentary-169621.mp3"),
	/**@type {Level} */
	level: null,
	/**@type {string[]} */
	wordList: [],
	/**@type {number} */
	timer: 0,
	/**@type {number} */
	mistakes: 0,

	/**@type {number} */
	nextSecond: 0,

	/**@type {boolean} */
	playing: false,
	/**@type {boolean} */
	running: false,

	/**@type {boolean} */
	mistakeMade: false,


	/**@param {Level} level */
	loadLevel: function(level) { //does vscode think this is a constructor? It basically is I guess.
		this.level = level;
		this.wordList = level.shuffledWordList;
		this.timer = level.timeLimit;
		this.mistakes = 0;

		this.nextSecond = 0;
		this.playing = false;

		this.mistakeMade = false;
		this.music.currentTime = 0;

		this.loadHTML();
	},
	loadHTML: function() {
		innerHTMLClass("level-name", this.level.displayName);
		hideClass("level-errors");
		innerHTMLClass("time-remaining", this.timer);
		this.showWords();

		this.clearInput();

		[...document.getElementsByClassName("text-input")].forEach(element=>{
			element.disabled = false;
		});

		document.querySelector(".text-input").focus();
		showClass("tip");
		hideClass("unlock-text");
	},
	loadHighScores: function () {
		[...document.getElementsByClassName("level-score-table")].forEach(
			/**@param {HTMLTableElement} table */
			table=>{
				for (let i=0;i<10;++i) { //what the actual frick? I'm definitely going to make code generate tables in the future.
					let row = table.childNodes[1].childNodes[(i+1)*2];
					let score = saveData[this.level.jsName].scores[i];
					//ok, no more of this childnode nonsense.
					if (score!==null) {
						/**@type {Date} */
						let date = score.date;
						row.querySelector(".scoreboard-date").innerHTML = `${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
						row.querySelector(".scoreboard-score").innerHTML = `${score.score}`;
						row.querySelector(".scoreboard-words").innerHTML = `${score.words}/${score.wordCount}`;
						row.querySelector(".scoreboard-time").innerHTML = `${score.time}`;
						row.querySelector(".scoreboard-errors").innerHTML = `${score.errors}`;
					} else {
						row.querySelector(".scoreboard-date").innerHTML = "-- --- ----"
						row.querySelector(".scoreboard-score").innerHTML = "---"
						row.querySelector(".scoreboard-words").innerHTML = "---/---"
						row.querySelector(".scoreboard-time").innerHTML = "---"
						row.querySelector(".scoreboard-errors").innerHTML = "---"
					}
				}
		});
	},
	get currentWord() {
		if (this.wordList.length<1) {
			return null;
		}
		return this.wordList[this.wordList.length-1];
	},
	get nextWord() {
		if (this.wordList.length<2) {
			return null;
		}
		return this.wordList[this.wordList.length-2];
	},
	main: async function() {
		while(this.playing) {
			if (Date.now()>=this.nextSecond) {
				this.tickTimer();
				this.nextSecond+=1000;
			}
			await sleep(this.nextSecond-Date.now());
		}
		this.running = false;
	},
	/**@param {string} input */
	input: function(input) {
		if (!this.playing) {
			this.startLevel();
		}
		for (let i=0;i<input.length;++i) {
			if (input.charAt(i)!==this.currentWord.charAt(i)) {
				this.mistake();
				break;
			}
		}
		if (input===this.currentWord) {
			this.completeWord();
		}
	},
	clearInput: function() {
		[...document.getElementsByClassName("text-input")].forEach(element => {
			element.value = "";
		})
	},
	tickTimer: function() {
		this.timer--;
		innerHTMLClass("time-remaining", this.timer);
		if (this.timer<=0) {
			this.endLevel();
		}
	},
	mistake: function() { //Why is this typeof mistake???
		if (!this.mistakeMade) {
			this.mistakes++;
			innerHTMLClass("error-count", this.mistakes);
			showClass("level-errors");
			if (this.mistakes > this.level.maxErrors) {
				this.endLevel();
			}
			this.mistakeMade = true;
		}
	},
	completeWord: function() {
		this.wordList.pop();
		this.showWords();
		this.clearInput();
		this.mistakeMade = false;
	},
	showWords: function() {
		innerHTMLClass("current-word", this.currentWord || "");
		innerHTMLClass("next-word", this.nextWord || "");
	},
	startLevel: function() {
		this.playing = true;
		if (!this.running) {
			this.running = true;
			this.main();
		}
		this.music.play();
		this.nextSecond = Date.now()+1000;
		hideClass("tip");
	},
	endLevel: function() {
		this.stopLevel();

		let highScore = new HighScore(this.level.wordCount - this.wordList.length, this.level.wordCount, this.timer, this.mistakes);
		let position = addHighScore(this.level.jsName, highScore);
		save();
		if (position === 0) {
			innerHTMLClass("unlock-text", "New Highscore!");
			showClass("unlock-text");
		} else if (position>0) {
			innerHTMLClass("unlock-text", `Leaderboard position #${position+1}`);
			showClass("unlock-text");
		}
	},
	stopLevel: function() {
		[...document.getElementsByClassName("text-input")].forEach(element=>{
			element.disabled = true;
		});
		this.playing = false;
		this.music.pause();
	}
}


/**
 * Awaits a timeout for (ms) miliseconds. use await before calling this. Similar to sleep in other programming languages.
 * @param {number} ms 
 * @returns {Promise}
 */
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @param {string} levelName
 * @param {HighScore} score */
function addHighScore(levelName, score) {
	let position = -1;
	if (score.score>0 && score.words > 0) {
		for (let i=saveData[levelName].scores.length-1;i>=0;--i) {
			if (saveData[levelName].scores[i]===null || saveData[levelName].scores[i].score <= score.score) {
				position = i;
			} else {
				break;
			}
		}
		if (position>-1) {
			saveData[levelName].scores.splice(position, 0, score);
			saveData[levelName].scores.pop();
		}
	}
	return position;
}

function loadSection(sectionName) {
	[...document.getElementsByClassName(loadedSection)].forEach(e=>{
		e.classList.remove("show");
	});
	[...document.getElementsByClassName(sectionName)].forEach(e=>{
		e.classList.add("show");
	});

	loadedSection = sectionName;
}

function load() {
	loadSaveData();
	loadSettings();
	addEventListeners();
	loadSection("main-menu");
}

function loadSaveData() {
	console.log("loading localStorage");
	saveData = localStorage.getItem("saveData") || `{"version": ${VERSION}}`;
	if (saveData===`{"version": ${VERSION}}`) {
		console.log("no save data found");
	} else {
		console.log("save data found");
	}
	saveData = JSON.parse(saveData);

	if (saveData.minVersion>VERSION) {
		console.error(`Saved data is incompatible with this version of the game. Save data requires version ${saveData.minVersion} or higher`);
		localStorageEnabled = false;
	}

	versionUpdate();
	initSaveLevels();
}

/** update save data for major version changes */
function versionUpdate() {
	console.log(`Save version: ${saveData.version}: current version: ${VERSION}`);
	if (saveData.version<VERSION) { //If a version drastically changes the save structure then we can do stuff about that here.
		console.warn("HUH??!"); //non existant version
	}

	saveData.version = VERSION; //update complete
	saveData.minVersion = VERSION; //lowest game version that this save data will work on.
}

/** Create save data properties for all the levels */
function initSaveLevels() {
	//If a level does not exist in the save data then we should create it.
	for (let i=0;i<levels.length;++i) {
		if (!saveData[levels[i].jsName]) {
			saveData[levels[i].jsName] = {
				unlocked: false,
				medal: 0,
				scores: new Array(10).fill(null)
			}
		} else {
			for (let j=0;j<saveData[levels[i].jsName].scores.length;++j) {
				if (saveData[levels[i].jsName].scores[j]!=null){
					Object.setPrototypeOf(saveData[levels[i].jsName].scores[j], HighScore.prototype);
				}
			}
		}
	}

	//first level must always be unlocked for obvious reasons.
	saveData[levels[0].jsName].unlocked = true;
}

function loadSettings() {

}

function save() {
	if (localStorageEnabled) {
		localStorage.setItem("saveData", JSON.stringify(saveData));
	}
}

function saveSettings() {

}

function addEventListeners() {
	[...document.getElementsByClassName("button-play")].forEach(element=>{
		element.addEventListener("click", e=>{
			levelManager.loadLevel(levels[0]);
			loadSection("level");
			document.querySelector(".text-input").focus();
		});
	});
	[...document.getElementsByClassName("button-highscores")].forEach(element=>{
		element.addEventListener("click", e=>{
			levelManager.loadLevel(levels[0]);
			levelManager.loadHighScores();
			loadSection("level-score-menu");
		});
	});
	[...document.getElementsByClassName("button-settings")].forEach(element=>{
		element.addEventListener("click", e=>{
			loadSection("settings-menu");
		});
	});
	[...document.getElementsByClassName("button-mainmenu")].forEach(element=>{
		element.addEventListener("click", e=>{
			loadSection("main-menu");
		});
	});
	[...document.getElementsByClassName("button-quitlevel")].forEach(element=>{
		element.addEventListener("click", e=>{
			levelManager.stopLevel();
			loadSection("main-menu");
		});
	});

	[...document.getElementsByClassName("button-restart")].forEach(element=>{
		element.addEventListener("click", e=>{
			levelManager.stopLevel();
			levelManager.loadLevel(levelManager.level);
			loadSection("level");
		});
	});

	[...document.getElementsByClassName("text-input")].forEach(element=>{
		element.addEventListener("input", e=>{
			levelManager.input(e.target.value);
		});
	});

	// Game inputs
	[...document.getElementsByClassName("text-input")].forEach(element=>{
		element.addEventListener("paste", e=>{
			e.preventDefault();
			e.target.value = "";
			e.target.placeholder = "Nice Try!";
			setTimeout(e2=>{
				e.target.placeholder = "";
			}, 2000);
		});
	});
}

load();