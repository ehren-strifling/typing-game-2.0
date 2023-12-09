"use strict";

class HighScore {
	//We can't really use private variables in objects we want to convert to json. So all of them are public here.
	/** @type {number} not implemented */
	_medal;
	/** @type {string} A date string of when this high score was set */
	_date; //We use a string instead of a date because date objects cannot be saved in json
	/** @type {number} amount of words complete */
	_words;
	/** @type {number} total amount of words in the level */
	_wordCount;
	/** @type {number} time remaining (in cases where level is completed) */
	_time;
	/** @type {number} typos made during the level */
	_errors;
	constructor(words, wordCount, time, errors, medal = 0) {
		this._medal = medal;
		this._date = new Date().toUTCString();
		this._words = words;
		this._wordCount = wordCount;
		this._time = time;
		this._errors = errors;
	}

	//when these feature are added I will uncomment these
	// get level() {
	// 	return this.#levelName;
	// }

	// get medal() {
	// 	return this.#medal;
	// }

	get date() {
		return new Date(this._date);
	}

	get words() {
		return this._words;
	}
	get wordCount() {
		return this._wordCount;
	}
	get completionString() {
		return `${this._words}/${this._wordCount}`;
	}

	get completionPercentage() {
		return this._words/this._wordCount;
	}

	get time() {
		return this._time;
	}

	get errors() {
		return this._errors;
	}

	get score() {
		return this._words*10 - this._errors*5 + this._time;
	}
}

export default HighScore;