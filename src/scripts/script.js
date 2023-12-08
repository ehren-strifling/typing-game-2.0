"use strict";
import HighScore from "./HighScore.js";
import Level from "./Level.js";

/**@type {string} (html class name) */
let loadedSection = null;


const levels = [
	new Level(
		"test level",
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
		120
	)
];

const levelManager = {
	/**@type {Level} */
	level: null,
	/**@type {string[]} */
	wordList: [],
	/**@type {number} */
	timer: 0,
	/**@type {number} */
	mistakes: 0,
	/**@param {Level} level */
	loadLevel: function(level) {
		this.level = level;
		this.wordList = level.shuffledWordList;
		this.timer = level.timeLimit;
		this.mistakes = 0;

		this.loadHTML();
		this.tickTimer();
		this.tickTimer();
		this.tickTimer();
		this.tickTimer();
		this.mistake();
		this.mistake();
		this.mistake();
		this.mistake();
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
	loadHTML: function() {
		innerHTMLClass("level-name", this.level.displayName);
		hideClass("level-errors");
		innerHTMLClass("time-remaining", this.timer);
		this.showWords();

		this.clearInput();
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
	mistake: function() {
		this.mistakes++;
		innerHTMLClass("error-count", this.mistakes);
		showClass("level-errors");
		if (this.mistakes > this.level.maxErrors) {
			this.endLevel();
		}
	},
	showWords: function() {
		innerHTMLClass("current-word", this.currentWord || "");
		innerHTMLClass("next-word", this.nextWord || "");
	},
	startLevel: function() {

	},
	endLevel: function() {

	}
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
	addEventListeners();
	loadSection("main-menu");
}

function addEventListeners() {
	[...document.getElementsByClassName("button-play")].forEach(element=>{
		element.addEventListener("click", e=>{
			levelManager.loadLevel(levels[0]);
			loadSection("level");
		});
	});
	[...document.getElementsByClassName("button-highscores")].forEach(element=>{
		element.addEventListener("click", e=>{
			loadSection("score-menu");
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
			loadSection("main-menu");
		});
	});

	[...document.getElementsByClassName("button-restart")].forEach(element=>{
		element.addEventListener("click", e=>{
			levelManager.loadLevel(levelManager.level);
			loadSection("level");
		});
	});

	[...document.getElementsByClassName("text-input")].forEach(element=>{
		element.addEventListener("paste", e=>{
			e.preventDefault();
			// console.warn("Nice try!");
			e.target.value = "";
			e.target.placeholder = "Nice Try!";
			setTimeout(e2=>{
				e.target.placeholder = "";
			}, 2000);
		});
	});
}

load();