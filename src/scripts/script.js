"use strict";

/**@type {string} (html class name) */
let loadedSection = null;

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