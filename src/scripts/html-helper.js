"use strict";
//will add this to my library if it's good enough

function showClass(className) {
	[...document.getElementsByClassName(className)].forEach(e=>{e.classList.add("show")});
}

function hideClass(className) {
	[...document.getElementsByClassName(className)].forEach(e=>{e.classList.remove("show")});
}

function toggleClass(className) {
	[...document.getElementsByClassName(className)].forEach(e=>{e.classList.toggle("show")});
}

function innerHTMLClass(className, innerHTML) {
	[...document.getElementsByClassName(className)].forEach(e=>{e.innerHTML = innerHTML});
}