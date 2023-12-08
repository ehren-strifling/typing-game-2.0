"use strict";

class Level {
	/**@type {string} */
	#displayName;
	/**@type {string} */
	#cssName;
	/**@type {string} */
	#jsName;

	/**@type {string[]} */
	#wordList;

	/**@type {number} */
	#timeLimit;

	/**@type {number} */
	#maxErrors;
	
	constructor(displayName, cssName, jsName, wordList, timeLimit, maxErrors = Number.POSITIVE_INFINITY) {
		this.#displayName = displayName;
		this.#cssName = cssName;
		this.#jsName = jsName;
		this.#wordList = wordList;
		this.#timeLimit = timeLimit;
		this.#maxErrors = maxErrors;
	}

	get displayName() {
		return this.#displayName;
	}

	get cssName() {
		return this.#cssName;
	}

	get jsName() {
		return this.#jsName;
	}

	get wordList() {
		let array = [];
		for (let i=0;i<this.#wordList.length;++i) {
			array.push(this.#wordList[i]);
		}
		return array;
	}

	get shuffledWordList() {
		let copy = this.wordList; //getter used here
		let array = [];
		while (copy.length>0) {
			array.push(copy.splice(Math.floor(Math.random()*copy.length),1)[0]);
		}
		return array;
	}

	get wordCount() {
		return this.#wordList.length;
	}

	get timeLimit() {
		return this.#timeLimit;
	}
	
	get maxErrors() {
		return this.#maxErrors;
	}
}

export default Level;