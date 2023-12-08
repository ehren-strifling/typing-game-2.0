"use strict";

class HighScore {
	#levelName;
	#medal;
	#date;
	#words;
	#wordCount;
	#time;
	#errors;
	constructor(levelName, words, wordCount, time, errors, medal = 0) {
		this.#levelName = levelName;
		this.#medal = medal;
		this.#date = Date.now();
		this.#words = words;
		this.#wordCount = wordCount;
		this.#time = time;
		this.#errors = errors;
	}

	//when these feature are added I will uncomment these
	// get level() {
	// 	return this.#levelName;
	// }

	// get medal() {
	// 	return this.#medal;
	// }

	get date() {
		return this.#date;
	}

	get words() {
		return this.#words;
	}
	get wordCount() {
		return this.#wordCount;
	}
	get completionString() {
		return `${this.#words}/${this.#wordCount}`;
	}

	get completionPercentage() {
		return this.#words/this.#wordCount;
	}

	get time() {
		return this.#time;
	}

	get errors() {
		return this.#errors;
	}
}

export default HighScore;