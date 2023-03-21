/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./demo/src/index.scss":
/*!*****************************!*\
  !*** ./demo/src/index.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./demo/src/index.html":
/*!*****************************!*\
  !*** ./demo/src/index.html ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "index.html";

/***/ }),

/***/ "./demo/src/core.js":
/*!**************************!*\
  !*** ./demo/src/core.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fiveRandomSequences": () => (/* binding */ fiveRandomSequences),
/* harmony export */   "renderControls": () => (/* binding */ renderControls),
/* harmony export */   "renderSequence": () => (/* binding */ renderSequence),
/* harmony export */   "renderSubsequence": () => (/* binding */ renderSubsequence),
/* harmony export */   "renderSubsequences": () => (/* binding */ renderSubsequences)
/* harmony export */ });
/* harmony import */ var _elements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements.js */ "./demo/src/elements.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers.js */ "./demo/src/helpers.js");



/**
 * @param {Array} next a reference to a `subsequence` such that the first item is greater than the last item of prev at least by 1
 * @param {Array} prev a reference to a `subsequence`
 * @returns {Boolean} whether next is consecutive to prev
*/
function isConsecutive(next, prev) {
    return next[0] - prev[prev.length-1] === 1
}

/**
 * @param {Array} sequence sequence of `item`s
 * @returns an element with rendered sequence
 */
function renderSequence(sequence) {
    const container = (0,_elements_js__WEBPACK_IMPORTED_MODULE_0__.sequenceContainer)()

    sequence.forEach(item => container.appendChild(1 === item ? (0,_elements_js__WEBPACK_IMPORTED_MODULE_0__.itemNarrow)() : (0,_elements_js__WEBPACK_IMPORTED_MODULE_0__.itemWide)()))

    return container
}

/**
 * @param {Array} subsequence a `subsequence` represented with `ref`s
 * @param {Array} sequence a `sequence`
 * @param {Boolean} blank whether to render a blank subsequence
 * @returns {HTMLElement}
*/
function renderSubsequence(subsequence, sequence, blank) {
    const _container = (0,_elements_js__WEBPACK_IMPORTED_MODULE_0__.subsequenceContainer)(blank)

    subsequence
        .map(ref => {
            return sequence[ref] === 1 ? (0,_elements_js__WEBPACK_IMPORTED_MODULE_0__.itemNarrow)() : (0,_elements_js__WEBPACK_IMPORTED_MODULE_0__.itemWide)()
        })
        .forEach(item => _container.appendChild(item))

    return _container
}

/**
 * @param {[Array]} subsequences a sequence of `subsequence`s
 * @param {Array} sequence a sequence of `item`s
 * @decription render a sequence of subsequences such that the space for items not included in the subsequences is preserved
*/
function renderSubsequences(subsequences, sequence) {
    const container = (0,_elements_js__WEBPACK_IMPORTED_MODULE_0__.subsequencesContainer)()

    const els = subsequences.reduce((subSs, subS, i) => {
        if (i === 0) {
            if (subS[0] === 0) {
                subSs.push(renderSubsequence(subS, sequence))
                return subSs
            }

            // create a blank subsequence to represent the not included items
            subSs.push(renderSubsequence(sequence.map((item, i) => i).slice(0, subS[0]), sequence, true))
            subSs.push(renderSubsequence(subS, sequence))
            return subSs
        }

        const subSPrev = subsequences[i-1]

        if (isConsecutive(subS, subSPrev)) {
            subSs.push(renderSubsequence(subS, sequence))
            return subSs
        }

        // create a blank subsequence to represent the not included items
        subSs.push(renderSubsequence(sequence.map((item, i) => i).slice(subSPrev[subSPrev.length-1]+1, subS[0]), sequence, true))
        
        subSs.push(renderSubsequence(subS, sequence))
        return subSs
    }, [])
    els.forEach(e => container.appendChild(e))

    return container
}

function fiveRandomSequences(ratio, sequences) {
    const numbers = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.uniqueRandomNumbers)(sequences[ratio].length < 5 ? sequences[ratio].length-1 : 5, sequences[ratio].length-1)

    return numbers.map(n => sequences[ratio][n])
}

function renderControls(sequences, container, controlCb) {
    sequences.forEach((g, i) => {
        container.appendChild((0,_elements_js__WEBPACK_IMPORTED_MODULE_0__.control)(i, g[0].length-i, controlCb))
    })
}



/***/ }),

/***/ "./demo/src/elements.js":
/*!******************************!*\
  !*** ./demo/src/elements.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "control": () => (/* binding */ control),
/* harmony export */   "itemNarrow": () => (/* binding */ itemNarrow),
/* harmony export */   "itemWide": () => (/* binding */ itemWide),
/* harmony export */   "sequenceAnalyzedContainer": () => (/* binding */ sequenceAnalyzedContainer),
/* harmony export */   "sequenceContainer": () => (/* binding */ sequenceContainer),
/* harmony export */   "subsequenceContainer": () => (/* binding */ subsequenceContainer),
/* harmony export */   "subsequencesContainer": () => (/* binding */ subsequencesContainer),
/* harmony export */   "subsequencesSequencesContainer": () => (/* binding */ subsequencesSequencesContainer)
/* harmony export */ });
function itemWide() {
    const e = document.createElement('div')
    e.className = `item wide`

    return e
}

function itemNarrow() {
    const e = document.createElement('div')
    e.className = `item narrow`

    return e
}

function sequenceContainer() {
    const e = document.createElement('div')
    e.classList.add('item-sequence')

    return e
}

function subsequenceContainer(blank) {
    const e = document.createElement('div')
    e.className = `item-sequence${blank ? ' blank' : ''}`

    return e
}

function subsequencesContainer() {
    const e = document.createElement('div')
    e.classList.add('sequence-sequence')

    return e
}

function subsequencesSequencesContainer() {
    const e = document.createElement('div')
    e.classList.add('sequences')
    return e
}

function sequenceAnalyzedContainer() {
    const e = document.createElement('div')
    e.classList.add('sequence-analyzed')
    return e
}

function control(wideN, narrowN, cb) {
    const el = document.createElement('button')
    
    el.classList.add('control')

    el.innerText = `${wideN}/${narrowN}`
    el.addEventListener('click', () => cb(wideN))

    return el
}



/***/ }),

/***/ "./demo/src/helpers.js":
/*!*****************************!*\
  !*** ./demo/src/helpers.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uniqueRandomNumbers": () => (/* binding */ uniqueRandomNumbers)
/* harmony export */ });
/**
 * @param {Number} number how many unique numbers to generate: must be smaller than `maximum`
 * @param {Number} maximum the maximal number to generate: must be larger than `number`
 * @returns a given number of unique random numbers below given maximum
*/
function uniqueRandomNumbers(number, maximum) {
    const numbers = []

    while (numbers.length < number) {
        const n = Math.floor(Math.random() * maximum+1)
        
        if (numbers.includes(n)) continue

        numbers.push(n)
    }

    return numbers
}



/***/ }),

/***/ "./demo/src/sequences.js":
/*!*******************************!*\
  !*** ./demo/src/sequences.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
  [
    [
      1,
      1,
      1,
      1,
      1,
      1
    ]
  ],
  [
    [
      1,
      1,
      1,
      1,
      1,
      2
    ],
    [
      1,
      1,
      1,
      1,
      2,
      1
    ],
    [
      1,
      1,
      1,
      2,
      1,
      1
    ],
    [
      1,
      1,
      2,
      1,
      1,
      1
    ],
    [
      1,
      2,
      1,
      1,
      1,
      1
    ],
    [
      2,
      1,
      1,
      1,
      1,
      1
    ]
  ],
  [
    [
      1,
      1,
      1,
      1,
      2,
      2
    ],
    [
      1,
      1,
      1,
      2,
      1,
      2
    ],
    [
      1,
      1,
      1,
      2,
      2,
      1
    ],
    [
      1,
      1,
      2,
      1,
      1,
      2
    ],
    [
      1,
      1,
      2,
      1,
      2,
      1
    ],
    [
      1,
      1,
      2,
      2,
      1,
      1
    ],
    [
      1,
      2,
      1,
      1,
      1,
      2
    ],
    [
      1,
      2,
      1,
      1,
      2,
      1
    ],
    [
      1,
      2,
      1,
      2,
      1,
      1
    ],
    [
      1,
      2,
      2,
      1,
      1,
      1
    ],
    [
      2,
      1,
      1,
      1,
      1,
      2
    ],
    [
      2,
      1,
      1,
      1,
      2,
      1
    ],
    [
      2,
      1,
      1,
      2,
      1,
      1
    ],
    [
      2,
      1,
      2,
      1,
      1,
      1
    ],
    [
      2,
      2,
      1,
      1,
      1,
      1
    ]
  ],
  [
    [
      1,
      1,
      1,
      2,
      2,
      2
    ],
    [
      1,
      1,
      2,
      1,
      2,
      2
    ],
    [
      1,
      1,
      2,
      2,
      1,
      2
    ],
    [
      1,
      1,
      2,
      2,
      2,
      1
    ],
    [
      1,
      2,
      1,
      1,
      2,
      2
    ],
    [
      1,
      2,
      1,
      2,
      1,
      2
    ],
    [
      1,
      2,
      1,
      2,
      2,
      1
    ],
    [
      1,
      2,
      2,
      1,
      1,
      2
    ],
    [
      1,
      2,
      2,
      1,
      2,
      1
    ],
    [
      1,
      2,
      2,
      2,
      1,
      1
    ],
    [
      2,
      1,
      1,
      1,
      2,
      2
    ],
    [
      2,
      1,
      1,
      2,
      1,
      2
    ],
    [
      2,
      1,
      1,
      2,
      2,
      1
    ],
    [
      2,
      1,
      2,
      1,
      1,
      2
    ],
    [
      2,
      1,
      2,
      1,
      2,
      1
    ],
    [
      2,
      1,
      2,
      2,
      1,
      1
    ],
    [
      2,
      2,
      1,
      1,
      1,
      2
    ],
    [
      2,
      2,
      1,
      1,
      2,
      1
    ],
    [
      2,
      2,
      1,
      2,
      1,
      1
    ],
    [
      2,
      2,
      2,
      1,
      1,
      1
    ]
  ],
  [
    [
      1,
      1,
      2,
      2,
      2,
      2
    ],
    [
      1,
      2,
      1,
      2,
      2,
      2
    ],
    [
      1,
      2,
      2,
      1,
      2,
      2
    ],
    [
      1,
      2,
      2,
      2,
      1,
      2
    ],
    [
      1,
      2,
      2,
      2,
      2,
      1
    ],
    [
      2,
      1,
      1,
      2,
      2,
      2
    ],
    [
      2,
      1,
      2,
      1,
      2,
      2
    ],
    [
      2,
      1,
      2,
      2,
      1,
      2
    ],
    [
      2,
      1,
      2,
      2,
      2,
      1
    ],
    [
      2,
      2,
      1,
      1,
      2,
      2
    ],
    [
      2,
      2,
      1,
      2,
      1,
      2
    ],
    [
      2,
      2,
      1,
      2,
      2,
      1
    ],
    [
      2,
      2,
      2,
      1,
      1,
      2
    ],
    [
      2,
      2,
      2,
      1,
      2,
      1
    ],
    [
      2,
      2,
      2,
      2,
      1,
      1
    ]
  ],
  [
    [
      1,
      2,
      2,
      2,
      2,
      2
    ],
    [
      2,
      1,
      2,
      2,
      2,
      2
    ],
    [
      2,
      2,
      1,
      2,
      2,
      2
    ],
    [
      2,
      2,
      2,
      1,
      2,
      2
    ],
    [
      2,
      2,
      2,
      2,
      1,
      2
    ],
    [
      2,
      2,
      2,
      2,
      2,
      1
    ]
  ],
  [
    [
      2,
      2,
      2,
      2,
      2,
      2
    ]
  ]
]);

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "containsSubsequences": () => (/* binding */ containsSubsequences),
/* harmony export */   "delta": () => (/* binding */ delta),
/* harmony export */   "isDeltaEmpty": () => (/* binding */ isDeltaEmpty),
/* harmony export */   "overlaps": () => (/* binding */ overlaps),
/* harmony export */   "size": () => (/* binding */ size)
/* harmony export */ });
/**
	@param {Array} sequence a sequence of `items` (e.g., a `subsequence`)
*/
function size(sequence) {
	return sequence.reduce((sum, i) => sum+i, 0)
}

/**
	@param {Number || Array} space either `space` or `schema`
	@param {Array} sequence a sequence of `item`s (e.g., a `subsequence`)
*/
function delta(space, sequence) {
	if ('number' === typeof(space)) return space - size(sequence)
	if (!Array.isArray(space)) throw new Error()
	
	const delta = sequence.reduce((d, i) => {
		if (d.length === 0) return d
		if (!d.includes(i)) return d
		
		d.splice(d.indexOf(i), 1)
		return d
	}, [...space])
	
	return delta
}

/**
	@param {Number || Array} space either `space` or `schema`
	@param {Array} sequence a sequence of `items` (e.g., a `subsequence`)
*/
function isDeltaEmpty(space, sequence) {
	const _delta = delta(space, sequence)
	return Array.isArray(_delta)
	? 0 === _delta.length
	: 0 === _delta
}

/**
	@param {Array} a a `subsequence`, represented by `ref`s
	@param {Array} b a `subsequence`, represented by `ref`s
	@returns whether a and b overlap each other
*/
function overlaps(a, b) {
	let i = 0, l = a.length
	for (i; i<l; i++) {
		if (b.includes(a[i])) return true
	}
	
	return false
}

/**
* @param {Number} first a `ref` to an `item`
* @param {Number} last a `ref` to an `item`
* @param {Array} subsequences an array of `subsequence`s
* @returns {Boolean} whether at least one `subsequence` is contained between `first` and `last`
*/
function containsSubsequences(first, last, subsequences) {

	for (const subsequence of subsequences) {
		if (subsequence[0] <= first) continue
		if (subsequence[subsequence.length-1] < last) {
			return true
		}
		
		return false
	}
	
	return false
}




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fillSchema": () => (/* binding */ fillSchema),
/* harmony export */   "fillSpace": () => (/* binding */ fillSpace),
/* harmony export */   "subsequences": () => (/* binding */ subsequences),
/* harmony export */   "subsequencesSequences": () => (/* binding */ subsequencesSequences)
/* harmony export */ });
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.js */ "./src/helpers.js");


/**
* @param {Array} sequence a `sequence`
* @param {Array} subsequences arrays of `subsequence`s as returned by `subsequences`
* @param {Array} subsequencesAll arrays of `subsequence`s as returned by `subsequences`
* @returns {Array} array of sequences of `subsequence`s where none of the `subsequence`s overlap
*/
function subsequencesSequences(sequence, subsequences, subsequencesAll) {
	const sequences = []
	
	const subsequenceLast = sequence[sequence.length-1]
	
	subsequences[0].forEach((subsequence) => {
		const _sequence = [...sequence, subsequence]
		
		// skip recursion if space between the sequence and the subsequence can contain subsequences
		if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.containsSubsequences)(subsequenceLast ? subsequenceLast[subsequenceLast.length-1] : -1, subsequence[0], subsequencesAll.reduce((_subsequences, subsequences) => {_subsequences.push(...subsequences); return _subsequences}, []))) return

		if (subsequences.length === 1) {			
			sequences.push(_sequence)
			return
		}
		
		let _subsequences = subsequences.slice(1)
		
		// skip subsequences to follow that overlap with current subsequence
		while ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.overlaps)(subsequence, _subsequences[0][0])) {
			if (_subsequences.length === 1) {
				sequences.push(_sequence)

				// skip current subsequence, since it overlaps with the subsequences to follow, and generate sequences from the remaining subsequences
				sequences.push(...subsequencesSequences(sequence, _subsequences, subsequencesAll))

				return
			}

			_subsequences = _subsequences.slice(1)
		}
		
		// generate sequences from the remaining subsequences
		sequences.push(...subsequencesSequences(_sequence, _subsequences, subsequencesAll))

		_subsequences = subsequences.slice(1)

		// skip current subsequence if overlaps with subsequences to follow
		while ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.overlaps)(subsequence, _subsequences[0][0])) {      
			if (_subsequences.length === 1) {
				sequences.push(...subsequencesSequences(sequence, _subsequences, subsequencesAll))
				sequences.push(_sequence)
				
				return
			}
			
			// generate sequences from the remaining subsequences
			sequences.push(...subsequencesSequences(sequence, _subsequences, subsequencesAll))
			
			_subsequences = _subsequences.slice(1)
		}
	})
	
	return sequences
}

/**
* @param {Number || Array} space a `space` or a `schema`
* @param {Array} sequence a `sequence`
*/
function subsequence(space, sequence) {
	const subS = Array.isArray(space)
	? fillSchema(space, sequence, [], fillSchema)
	: fillSpace(space, sequence, [], fillSpace)
	
	// only if all space is filled return the subsequence
	if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.isDeltaEmpty)(space, subS)) return subS.map( 
		(t,i) => i // store refs to `items` in the `sequence` rather than the `items` themselves
	)
		
	return null
}
	
/**
	@param {[Number || Array]} space array of `space`s or `schema`s
	@param {Array} sequence a `sequence`
	@returns {[Array]} arrays of `subsequence`s (represented by `ref`s), respective to the given `space`s, starting from each item in the `sequence`
*/
function subsequences(space, sequence) {
	const subSs = sequence.reduce((subSs, item, i) => {
		const subSsSpace = space.reduce((subSs, space) => {
			const subS = subsequence(space, sequence.slice(i))
			if (!subS) return subSs
			
			subSs.push(subS.map(ref => i + ref))
			
			return subSs
		}, [])
		
		if (!subSsSpace.length) return subSs
		
		subSs.push(subSsSpace)
		return subSs
	}, [])
	
	return subSs
}
	
/**
	@param {Array} sSrc a `sequence`
	@description Form a `subsequence` by unshifting `item`s from the given `sequence` until the given `space` is filled in the `subsequence`
*/
function fillSpace(d, sSrc, s, fill) {
	if (sSrc.length === 0) return s
	
	const _sSrc = [...sSrc]

	const itemSpace = _sSrc.shift()
	const dNew = d - itemSpace
	
	if (dNew < 0) return s
	
	s.push(itemSpace)
	
	if (0 === dNew) return s
	
	return fill(dNew, _sSrc, s, fill)
}

/**
	@param {Array} sSrc a `sequence`
*/
function fillSchema(d, sSrc, s, fill) {
	if (sSrc.length === 0) return s
	
	const _sSrc = [...sSrc]

	const itemSpace = _sSrc.shift()
	if (!d.includes(itemSpace)) return s
	
	s.push(itemSpace)
	
	const _d = [...d]; _d.splice(d.indexOf(itemSpace), 1)
	
	if (_d.length === 0) return s

	return fill(_d, _sSrc, s, fill)
}
	



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./demo/src/index.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/index.js */ "./src/index.js");
/* harmony import */ var _elements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements.js */ "./demo/src/elements.js");
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core.js */ "./demo/src/core.js");
/* harmony import */ var _sequences_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sequences.js */ "./demo/src/sequences.js");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.html */ "./demo/src/index.html");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index.scss */ "./demo/src/index.scss");








/**
 * @param {Array} subsequences an array of sequences of `subsequences`
 * @returns {HTMLElement} an element with rendered sequences of `subsequences`
 * @description renders the output of negateOverlaps
*/
function renderSubsequencesSequences(subsequences, sequence) {
    const container = (0,_elements_js__WEBPACK_IMPORTED_MODULE_1__.subsequencesSequencesContainer)()

    subsequences.map(subSs => (0,_core_js__WEBPACK_IMPORTED_MODULE_2__.renderSubsequences)(subSs, sequence)).forEach(subS => container.appendChild(subS))

    return container
}

/**
 * @param {Array} sequence a `sequence`
 * @param {Number || Array} space a `space` or a `schema`
 * @returns {HTMLElement}
 * @description analyzes a `sequence` and renders it with the result
*/
function sequenceAnalyzed(sequence, space) {
    const container = (0,_elements_js__WEBPACK_IMPORTED_MODULE_1__.sequenceAnalyzedContainer)()

    const _subsequences = (0,_src_index_js__WEBPACK_IMPORTED_MODULE_0__.subsequences)(space, sequence)
    console.log(_subsequences)

    const sequences = (0,_src_index_js__WEBPACK_IMPORTED_MODULE_0__.subsequencesSequences)([], _subsequences, _subsequences)

    console.log(sequences)

    container.appendChild((0,_core_js__WEBPACK_IMPORTED_MODULE_2__.renderSequence)(sequence))
    container.appendChild(renderSubsequencesSequences(sequences, sequence))

    return container
}

function sequencesAnalyzed(sequences, space, container) {
    container.replaceChildren(...sequences.map(sequence => sequenceAnalyzed(sequence, space)))
}

function main(sequencesContainer, controlsContainer) {
    const controlCb = (ratio) => {
        const _sequences = (0,_core_js__WEBPACK_IMPORTED_MODULE_2__.fiveRandomSequences)(ratio, _sequences_js__WEBPACK_IMPORTED_MODULE_3__["default"])
        sequencesAnalyzed(_sequences, [[2], [1,2], [1,1,1]], sequencesContainer)
    }

    ;(0,_core_js__WEBPACK_IMPORTED_MODULE_2__.renderControls)(_sequences_js__WEBPACK_IMPORTED_MODULE_3__["default"], controlsContainer, controlCb)

    const _sequences = (0,_core_js__WEBPACK_IMPORTED_MODULE_2__.fiveRandomSequences)(2, _sequences_js__WEBPACK_IMPORTED_MODULE_3__["default"])
    sequencesAnalyzed(_sequences, [[2], [1,2], [1,1,1]], sequencesContainer)
}

window.addEventListener('DOMContentLoaded', () => {
    main(document.querySelector('#main .sequences-analyzed'), document.querySelector('#main .controls'))
})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0EySDtBQUMzRTs7QUFFaEQ7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsK0RBQWlCOztBQUV2QyxnRUFBZ0Usd0RBQVUsS0FBSyxzREFBUTs7QUFFdkY7QUFDQTs7QUFFQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0EsdUJBQXVCLGtFQUFvQjs7QUFFM0M7QUFDQTtBQUNBLHlDQUF5Qyx3REFBVSxLQUFLLHNEQUFRO0FBQ2hFLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUVBQXFCOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsZ0VBQW1COztBQUV2QztBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIscURBQU87QUFDckMsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNGQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDLHNCQUFzQjs7QUFFeEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLE1BQU0sR0FBRyxRQUFRO0FBQ3ZDOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4REE7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9nQkE7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLGlCQUFpQjtBQUMxQixTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLGlCQUFpQjtBQUMxQixTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLE9BQU87QUFDaEIsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxLQUFLO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVUsUUFBUTtBQUNsQixVQUFVLFFBQVE7QUFDbEIsVUFBVSxPQUFPO0FBQ2pCLFlBQVksU0FBUztBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RXFGOztBQUV0RjtBQUNBLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0saUVBQW9CLDRJQUE0SSxxQ0FBcUMscUJBQXFCOztBQUVoTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxxREFBUTtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUyxxREFBUTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxpQkFBaUI7QUFDM0IsVUFBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyx5REFBWTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsT0FBTztBQUNoQixXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQU1DOzs7Ozs7O1VDeEpEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZzRjtBQUNDO0FBQ1U7QUFDM0Q7O0FBRWpCO0FBQ0E7O0FBRXJCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsYUFBYTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNEVBQThCOztBQUVwRCw4QkFBOEIsNERBQWtCOztBQUVoRDtBQUNBOztBQUVBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsaUJBQWlCO0FBQzVCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdUVBQXlCOztBQUUvQywwQkFBMEIsMkRBQVk7QUFDdEM7O0FBRUEsc0JBQXNCLG9FQUFxQjs7QUFFM0M7O0FBRUEsMEJBQTBCLHdEQUFjO0FBQ3hDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsNkRBQW1CLFFBQVEscURBQVM7QUFDL0Q7QUFDQTs7QUFFQSxJQUFJLHlEQUFjLENBQUMscURBQVM7O0FBRTVCLHVCQUF1Qiw2REFBbUIsSUFBSSxxREFBUztBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maXQtaW4tcm93cy8uL2RlbW8vc3JjL2luZGV4LnNjc3M/NjdiNSIsIndlYnBhY2s6Ly9maXQtaW4tcm93cy8uL2RlbW8vc3JjL2NvcmUuanMiLCJ3ZWJwYWNrOi8vZml0LWluLXJvd3MvLi9kZW1vL3NyYy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9maXQtaW4tcm93cy8uL2RlbW8vc3JjL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vZml0LWluLXJvd3MvLi9kZW1vL3NyYy9zZXF1ZW5jZXMuanMiLCJ3ZWJwYWNrOi8vZml0LWluLXJvd3MvLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9maXQtaW4tcm93cy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9maXQtaW4tcm93cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9maXQtaW4tcm93cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZml0LWluLXJvd3Mvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9maXQtaW4tcm93cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ZpdC1pbi1yb3dzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZml0LWluLXJvd3Mvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vZml0LWluLXJvd3MvLi9kZW1vL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQge2l0ZW1OYXJyb3csIGl0ZW1XaWRlLCBzZXF1ZW5jZUNvbnRhaW5lciwgc3Vic2VxdWVuY2VDb250YWluZXIsIHN1YnNlcXVlbmNlc0NvbnRhaW5lciwgY29udHJvbH0gZnJvbSAnLi9lbGVtZW50cy5qcydcbmltcG9ydCB7dW5pcXVlUmFuZG9tTnVtYmVyc30gZnJvbSAnLi9oZWxwZXJzLmpzJ1xuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXl9IG5leHQgYSByZWZlcmVuY2UgdG8gYSBgc3Vic2VxdWVuY2VgIHN1Y2ggdGhhdCB0aGUgZmlyc3QgaXRlbSBpcyBncmVhdGVyIHRoYW4gdGhlIGxhc3QgaXRlbSBvZiBwcmV2IGF0IGxlYXN0IGJ5IDFcbiAqIEBwYXJhbSB7QXJyYXl9IHByZXYgYSByZWZlcmVuY2UgdG8gYSBgc3Vic2VxdWVuY2VgXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gd2hldGhlciBuZXh0IGlzIGNvbnNlY3V0aXZlIHRvIHByZXZcbiovXG5mdW5jdGlvbiBpc0NvbnNlY3V0aXZlKG5leHQsIHByZXYpIHtcbiAgICByZXR1cm4gbmV4dFswXSAtIHByZXZbcHJldi5sZW5ndGgtMV0gPT09IDFcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5fSBzZXF1ZW5jZSBzZXF1ZW5jZSBvZiBgaXRlbWBzXG4gKiBAcmV0dXJucyBhbiBlbGVtZW50IHdpdGggcmVuZGVyZWQgc2VxdWVuY2VcbiAqL1xuZnVuY3Rpb24gcmVuZGVyU2VxdWVuY2Uoc2VxdWVuY2UpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBzZXF1ZW5jZUNvbnRhaW5lcigpXG5cbiAgICBzZXF1ZW5jZS5mb3JFYWNoKGl0ZW0gPT4gY29udGFpbmVyLmFwcGVuZENoaWxkKDEgPT09IGl0ZW0gPyBpdGVtTmFycm93KCkgOiBpdGVtV2lkZSgpKSlcblxuICAgIHJldHVybiBjb250YWluZXJcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5fSBzdWJzZXF1ZW5jZSBhIGBzdWJzZXF1ZW5jZWAgcmVwcmVzZW50ZWQgd2l0aCBgcmVmYHNcbiAqIEBwYXJhbSB7QXJyYXl9IHNlcXVlbmNlIGEgYHNlcXVlbmNlYFxuICogQHBhcmFtIHtCb29sZWFufSBibGFuayB3aGV0aGVyIHRvIHJlbmRlciBhIGJsYW5rIHN1YnNlcXVlbmNlXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4qL1xuZnVuY3Rpb24gcmVuZGVyU3Vic2VxdWVuY2Uoc3Vic2VxdWVuY2UsIHNlcXVlbmNlLCBibGFuaykge1xuICAgIGNvbnN0IF9jb250YWluZXIgPSBzdWJzZXF1ZW5jZUNvbnRhaW5lcihibGFuaylcblxuICAgIHN1YnNlcXVlbmNlXG4gICAgICAgIC5tYXAocmVmID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzZXF1ZW5jZVtyZWZdID09PSAxID8gaXRlbU5hcnJvdygpIDogaXRlbVdpZGUoKVxuICAgICAgICB9KVxuICAgICAgICAuZm9yRWFjaChpdGVtID0+IF9jb250YWluZXIuYXBwZW5kQ2hpbGQoaXRlbSkpXG5cbiAgICByZXR1cm4gX2NvbnRhaW5lclxufVxuXG4vKipcbiAqIEBwYXJhbSB7W0FycmF5XX0gc3Vic2VxdWVuY2VzIGEgc2VxdWVuY2Ugb2YgYHN1YnNlcXVlbmNlYHNcbiAqIEBwYXJhbSB7QXJyYXl9IHNlcXVlbmNlIGEgc2VxdWVuY2Ugb2YgYGl0ZW1gc1xuICogQGRlY3JpcHRpb24gcmVuZGVyIGEgc2VxdWVuY2Ugb2Ygc3Vic2VxdWVuY2VzIHN1Y2ggdGhhdCB0aGUgc3BhY2UgZm9yIGl0ZW1zIG5vdCBpbmNsdWRlZCBpbiB0aGUgc3Vic2VxdWVuY2VzIGlzIHByZXNlcnZlZFxuKi9cbmZ1bmN0aW9uIHJlbmRlclN1YnNlcXVlbmNlcyhzdWJzZXF1ZW5jZXMsIHNlcXVlbmNlKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gc3Vic2VxdWVuY2VzQ29udGFpbmVyKClcblxuICAgIGNvbnN0IGVscyA9IHN1YnNlcXVlbmNlcy5yZWR1Y2UoKHN1YlNzLCBzdWJTLCBpKSA9PiB7XG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoc3ViU1swXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN1YlNzLnB1c2gocmVuZGVyU3Vic2VxdWVuY2Uoc3ViUywgc2VxdWVuY2UpKVxuICAgICAgICAgICAgICAgIHJldHVybiBzdWJTc1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBibGFuayBzdWJzZXF1ZW5jZSB0byByZXByZXNlbnQgdGhlIG5vdCBpbmNsdWRlZCBpdGVtc1xuICAgICAgICAgICAgc3ViU3MucHVzaChyZW5kZXJTdWJzZXF1ZW5jZShzZXF1ZW5jZS5tYXAoKGl0ZW0sIGkpID0+IGkpLnNsaWNlKDAsIHN1YlNbMF0pLCBzZXF1ZW5jZSwgdHJ1ZSkpXG4gICAgICAgICAgICBzdWJTcy5wdXNoKHJlbmRlclN1YnNlcXVlbmNlKHN1YlMsIHNlcXVlbmNlKSlcbiAgICAgICAgICAgIHJldHVybiBzdWJTc1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3ViU1ByZXYgPSBzdWJzZXF1ZW5jZXNbaS0xXVxuXG4gICAgICAgIGlmIChpc0NvbnNlY3V0aXZlKHN1YlMsIHN1YlNQcmV2KSkge1xuICAgICAgICAgICAgc3ViU3MucHVzaChyZW5kZXJTdWJzZXF1ZW5jZShzdWJTLCBzZXF1ZW5jZSkpXG4gICAgICAgICAgICByZXR1cm4gc3ViU3NcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSBhIGJsYW5rIHN1YnNlcXVlbmNlIHRvIHJlcHJlc2VudCB0aGUgbm90IGluY2x1ZGVkIGl0ZW1zXG4gICAgICAgIHN1YlNzLnB1c2gocmVuZGVyU3Vic2VxdWVuY2Uoc2VxdWVuY2UubWFwKChpdGVtLCBpKSA9PiBpKS5zbGljZShzdWJTUHJldltzdWJTUHJldi5sZW5ndGgtMV0rMSwgc3ViU1swXSksIHNlcXVlbmNlLCB0cnVlKSlcbiAgICAgICAgXG4gICAgICAgIHN1YlNzLnB1c2gocmVuZGVyU3Vic2VxdWVuY2Uoc3ViUywgc2VxdWVuY2UpKVxuICAgICAgICByZXR1cm4gc3ViU3NcbiAgICB9LCBbXSlcbiAgICBlbHMuZm9yRWFjaChlID0+IGNvbnRhaW5lci5hcHBlbmRDaGlsZChlKSlcblxuICAgIHJldHVybiBjb250YWluZXJcbn1cblxuZnVuY3Rpb24gZml2ZVJhbmRvbVNlcXVlbmNlcyhyYXRpbywgc2VxdWVuY2VzKSB7XG4gICAgY29uc3QgbnVtYmVycyA9IHVuaXF1ZVJhbmRvbU51bWJlcnMoc2VxdWVuY2VzW3JhdGlvXS5sZW5ndGggPCA1ID8gc2VxdWVuY2VzW3JhdGlvXS5sZW5ndGgtMSA6IDUsIHNlcXVlbmNlc1tyYXRpb10ubGVuZ3RoLTEpXG5cbiAgICByZXR1cm4gbnVtYmVycy5tYXAobiA9PiBzZXF1ZW5jZXNbcmF0aW9dW25dKVxufVxuXG5mdW5jdGlvbiByZW5kZXJDb250cm9scyhzZXF1ZW5jZXMsIGNvbnRhaW5lciwgY29udHJvbENiKSB7XG4gICAgc2VxdWVuY2VzLmZvckVhY2goKGcsIGkpID0+IHtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2woaSwgZ1swXS5sZW5ndGgtaSwgY29udHJvbENiKSlcbiAgICB9KVxufVxuXG5leHBvcnQge3JlbmRlclNlcXVlbmNlLCByZW5kZXJTdWJzZXF1ZW5jZSwgcmVuZGVyU3Vic2VxdWVuY2VzLCByZW5kZXJDb250cm9scywgZml2ZVJhbmRvbVNlcXVlbmNlc30iLCJmdW5jdGlvbiBpdGVtV2lkZSgpIHtcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBlLmNsYXNzTmFtZSA9IGBpdGVtIHdpZGVgXG5cbiAgICByZXR1cm4gZVxufVxuXG5mdW5jdGlvbiBpdGVtTmFycm93KCkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGUuY2xhc3NOYW1lID0gYGl0ZW0gbmFycm93YFxuXG4gICAgcmV0dXJuIGVcbn1cblxuZnVuY3Rpb24gc2VxdWVuY2VDb250YWluZXIoKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZS5jbGFzc0xpc3QuYWRkKCdpdGVtLXNlcXVlbmNlJylcblxuICAgIHJldHVybiBlXG59XG5cbmZ1bmN0aW9uIHN1YnNlcXVlbmNlQ29udGFpbmVyKGJsYW5rKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZS5jbGFzc05hbWUgPSBgaXRlbS1zZXF1ZW5jZSR7YmxhbmsgPyAnIGJsYW5rJyA6ICcnfWBcblxuICAgIHJldHVybiBlXG59XG5cbmZ1bmN0aW9uIHN1YnNlcXVlbmNlc0NvbnRhaW5lcigpIHtcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBlLmNsYXNzTGlzdC5hZGQoJ3NlcXVlbmNlLXNlcXVlbmNlJylcblxuICAgIHJldHVybiBlXG59XG5cbmZ1bmN0aW9uIHN1YnNlcXVlbmNlc1NlcXVlbmNlc0NvbnRhaW5lcigpIHtcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBlLmNsYXNzTGlzdC5hZGQoJ3NlcXVlbmNlcycpXG4gICAgcmV0dXJuIGVcbn1cblxuZnVuY3Rpb24gc2VxdWVuY2VBbmFseXplZENvbnRhaW5lcigpIHtcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBlLmNsYXNzTGlzdC5hZGQoJ3NlcXVlbmNlLWFuYWx5emVkJylcbiAgICByZXR1cm4gZVxufVxuXG5mdW5jdGlvbiBjb250cm9sKHdpZGVOLCBuYXJyb3dOLCBjYikge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBcbiAgICBlbC5jbGFzc0xpc3QuYWRkKCdjb250cm9sJylcblxuICAgIGVsLmlubmVyVGV4dCA9IGAke3dpZGVOfS8ke25hcnJvd059YFxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2Iod2lkZU4pKVxuXG4gICAgcmV0dXJuIGVsXG59XG5cbmV4cG9ydCB7aXRlbVdpZGUsIGl0ZW1OYXJyb3csIHNlcXVlbmNlQ29udGFpbmVyLCBzdWJzZXF1ZW5jZUNvbnRhaW5lciwgc3Vic2VxdWVuY2VzQ29udGFpbmVyLCBzdWJzZXF1ZW5jZXNTZXF1ZW5jZXNDb250YWluZXIsIHNlcXVlbmNlQW5hbHl6ZWRDb250YWluZXIsIGNvbnRyb2x9IiwiLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gbnVtYmVyIGhvdyBtYW55IHVuaXF1ZSBudW1iZXJzIHRvIGdlbmVyYXRlOiBtdXN0IGJlIHNtYWxsZXIgdGhhbiBgbWF4aW11bWBcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXhpbXVtIHRoZSBtYXhpbWFsIG51bWJlciB0byBnZW5lcmF0ZTogbXVzdCBiZSBsYXJnZXIgdGhhbiBgbnVtYmVyYFxuICogQHJldHVybnMgYSBnaXZlbiBudW1iZXIgb2YgdW5pcXVlIHJhbmRvbSBudW1iZXJzIGJlbG93IGdpdmVuIG1heGltdW1cbiovXG5mdW5jdGlvbiB1bmlxdWVSYW5kb21OdW1iZXJzKG51bWJlciwgbWF4aW11bSkge1xuICAgIGNvbnN0IG51bWJlcnMgPSBbXVxuXG4gICAgd2hpbGUgKG51bWJlcnMubGVuZ3RoIDwgbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IG4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXhpbXVtKzEpXG4gICAgICAgIFxuICAgICAgICBpZiAobnVtYmVycy5pbmNsdWRlcyhuKSkgY29udGludWVcblxuICAgICAgICBudW1iZXJzLnB1c2gobilcbiAgICB9XG5cbiAgICByZXR1cm4gbnVtYmVyc1xufVxuXG5leHBvcnQge3VuaXF1ZVJhbmRvbU51bWJlcnN9IiwiZXhwb3J0IGRlZmF1bHQgW1xuICBbXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxXG4gICAgXVxuICBdLFxuICBbXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMVxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMVxuICAgIF1cbiAgXSxcbiAgW1xuICAgIFtcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMVxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMVxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdXG4gIF0sXG4gIFtcbiAgICBbXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMVxuICAgIF1cbiAgXSxcbiAgW1xuICAgIFtcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdXG4gIF0sXG4gIFtcbiAgICBbXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXVxuICBdLFxuICBbXG4gICAgW1xuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyXG4gICAgXVxuICBdXG5dIiwiLyoqXG5cdEBwYXJhbSB7QXJyYXl9IHNlcXVlbmNlIGEgc2VxdWVuY2Ugb2YgYGl0ZW1zYCAoZS5nLiwgYSBgc3Vic2VxdWVuY2VgKVxuKi9cbmZ1bmN0aW9uIHNpemUoc2VxdWVuY2UpIHtcblx0cmV0dXJuIHNlcXVlbmNlLnJlZHVjZSgoc3VtLCBpKSA9PiBzdW0raSwgMClcbn1cblxuLyoqXG5cdEBwYXJhbSB7TnVtYmVyIHx8IEFycmF5fSBzcGFjZSBlaXRoZXIgYHNwYWNlYCBvciBgc2NoZW1hYFxuXHRAcGFyYW0ge0FycmF5fSBzZXF1ZW5jZSBhIHNlcXVlbmNlIG9mIGBpdGVtYHMgKGUuZy4sIGEgYHN1YnNlcXVlbmNlYClcbiovXG5mdW5jdGlvbiBkZWx0YShzcGFjZSwgc2VxdWVuY2UpIHtcblx0aWYgKCdudW1iZXInID09PSB0eXBlb2Yoc3BhY2UpKSByZXR1cm4gc3BhY2UgLSBzaXplKHNlcXVlbmNlKVxuXHRpZiAoIUFycmF5LmlzQXJyYXkoc3BhY2UpKSB0aHJvdyBuZXcgRXJyb3IoKVxuXHRcblx0Y29uc3QgZGVsdGEgPSBzZXF1ZW5jZS5yZWR1Y2UoKGQsIGkpID0+IHtcblx0XHRpZiAoZC5sZW5ndGggPT09IDApIHJldHVybiBkXG5cdFx0aWYgKCFkLmluY2x1ZGVzKGkpKSByZXR1cm4gZFxuXHRcdFxuXHRcdGQuc3BsaWNlKGQuaW5kZXhPZihpKSwgMSlcblx0XHRyZXR1cm4gZFxuXHR9LCBbLi4uc3BhY2VdKVxuXHRcblx0cmV0dXJuIGRlbHRhXG59XG5cbi8qKlxuXHRAcGFyYW0ge051bWJlciB8fCBBcnJheX0gc3BhY2UgZWl0aGVyIGBzcGFjZWAgb3IgYHNjaGVtYWBcblx0QHBhcmFtIHtBcnJheX0gc2VxdWVuY2UgYSBzZXF1ZW5jZSBvZiBgaXRlbXNgIChlLmcuLCBhIGBzdWJzZXF1ZW5jZWApXG4qL1xuZnVuY3Rpb24gaXNEZWx0YUVtcHR5KHNwYWNlLCBzZXF1ZW5jZSkge1xuXHRjb25zdCBfZGVsdGEgPSBkZWx0YShzcGFjZSwgc2VxdWVuY2UpXG5cdHJldHVybiBBcnJheS5pc0FycmF5KF9kZWx0YSlcblx0PyAwID09PSBfZGVsdGEubGVuZ3RoXG5cdDogMCA9PT0gX2RlbHRhXG59XG5cbi8qKlxuXHRAcGFyYW0ge0FycmF5fSBhIGEgYHN1YnNlcXVlbmNlYCwgcmVwcmVzZW50ZWQgYnkgYHJlZmBzXG5cdEBwYXJhbSB7QXJyYXl9IGIgYSBgc3Vic2VxdWVuY2VgLCByZXByZXNlbnRlZCBieSBgcmVmYHNcblx0QHJldHVybnMgd2hldGhlciBhIGFuZCBiIG92ZXJsYXAgZWFjaCBvdGhlclxuKi9cbmZ1bmN0aW9uIG92ZXJsYXBzKGEsIGIpIHtcblx0bGV0IGkgPSAwLCBsID0gYS5sZW5ndGhcblx0Zm9yIChpOyBpPGw7IGkrKykge1xuXHRcdGlmIChiLmluY2x1ZGVzKGFbaV0pKSByZXR1cm4gdHJ1ZVxuXHR9XG5cdFxuXHRyZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4qIEBwYXJhbSB7TnVtYmVyfSBmaXJzdCBhIGByZWZgIHRvIGFuIGBpdGVtYFxuKiBAcGFyYW0ge051bWJlcn0gbGFzdCBhIGByZWZgIHRvIGFuIGBpdGVtYFxuKiBAcGFyYW0ge0FycmF5fSBzdWJzZXF1ZW5jZXMgYW4gYXJyYXkgb2YgYHN1YnNlcXVlbmNlYHNcbiogQHJldHVybnMge0Jvb2xlYW59IHdoZXRoZXIgYXQgbGVhc3Qgb25lIGBzdWJzZXF1ZW5jZWAgaXMgY29udGFpbmVkIGJldHdlZW4gYGZpcnN0YCBhbmQgYGxhc3RgXG4qL1xuZnVuY3Rpb24gY29udGFpbnNTdWJzZXF1ZW5jZXMoZmlyc3QsIGxhc3QsIHN1YnNlcXVlbmNlcykge1xuXG5cdGZvciAoY29uc3Qgc3Vic2VxdWVuY2Ugb2Ygc3Vic2VxdWVuY2VzKSB7XG5cdFx0aWYgKHN1YnNlcXVlbmNlWzBdIDw9IGZpcnN0KSBjb250aW51ZVxuXHRcdGlmIChzdWJzZXF1ZW5jZVtzdWJzZXF1ZW5jZS5sZW5ndGgtMV0gPCBsYXN0KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXHRcblx0cmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCB7XG5cdHNpemUsIGRlbHRhLCBpc0RlbHRhRW1wdHksIG92ZXJsYXBzLCBjb250YWluc1N1YnNlcXVlbmNlc1xufVxuIiwiaW1wb3J0IHtzaXplLCBkZWx0YSwgaXNEZWx0YUVtcHR5LCBvdmVybGFwcywgY29udGFpbnNTdWJzZXF1ZW5jZXN9IGZyb20gJy4vaGVscGVycy5qcydcblxuLyoqXG4qIEBwYXJhbSB7QXJyYXl9IHNlcXVlbmNlIGEgYHNlcXVlbmNlYFxuKiBAcGFyYW0ge0FycmF5fSBzdWJzZXF1ZW5jZXMgYXJyYXlzIG9mIGBzdWJzZXF1ZW5jZWBzIGFzIHJldHVybmVkIGJ5IGBzdWJzZXF1ZW5jZXNgXG4qIEBwYXJhbSB7QXJyYXl9IHN1YnNlcXVlbmNlc0FsbCBhcnJheXMgb2YgYHN1YnNlcXVlbmNlYHMgYXMgcmV0dXJuZWQgYnkgYHN1YnNlcXVlbmNlc2BcbiogQHJldHVybnMge0FycmF5fSBhcnJheSBvZiBzZXF1ZW5jZXMgb2YgYHN1YnNlcXVlbmNlYHMgd2hlcmUgbm9uZSBvZiB0aGUgYHN1YnNlcXVlbmNlYHMgb3ZlcmxhcFxuKi9cbmZ1bmN0aW9uIHN1YnNlcXVlbmNlc1NlcXVlbmNlcyhzZXF1ZW5jZSwgc3Vic2VxdWVuY2VzLCBzdWJzZXF1ZW5jZXNBbGwpIHtcblx0Y29uc3Qgc2VxdWVuY2VzID0gW11cblx0XG5cdGNvbnN0IHN1YnNlcXVlbmNlTGFzdCA9IHNlcXVlbmNlW3NlcXVlbmNlLmxlbmd0aC0xXVxuXHRcblx0c3Vic2VxdWVuY2VzWzBdLmZvckVhY2goKHN1YnNlcXVlbmNlKSA9PiB7XG5cdFx0Y29uc3QgX3NlcXVlbmNlID0gWy4uLnNlcXVlbmNlLCBzdWJzZXF1ZW5jZV1cblx0XHRcblx0XHQvLyBza2lwIHJlY3Vyc2lvbiBpZiBzcGFjZSBiZXR3ZWVuIHRoZSBzZXF1ZW5jZSBhbmQgdGhlIHN1YnNlcXVlbmNlIGNhbiBjb250YWluIHN1YnNlcXVlbmNlc1xuXHRcdGlmIChjb250YWluc1N1YnNlcXVlbmNlcyhzdWJzZXF1ZW5jZUxhc3QgPyBzdWJzZXF1ZW5jZUxhc3Rbc3Vic2VxdWVuY2VMYXN0Lmxlbmd0aC0xXSA6IC0xLCBzdWJzZXF1ZW5jZVswXSwgc3Vic2VxdWVuY2VzQWxsLnJlZHVjZSgoX3N1YnNlcXVlbmNlcywgc3Vic2VxdWVuY2VzKSA9PiB7X3N1YnNlcXVlbmNlcy5wdXNoKC4uLnN1YnNlcXVlbmNlcyk7IHJldHVybiBfc3Vic2VxdWVuY2VzfSwgW10pKSkgcmV0dXJuXG5cblx0XHRpZiAoc3Vic2VxdWVuY2VzLmxlbmd0aCA9PT0gMSkge1x0XHRcdFxuXHRcdFx0c2VxdWVuY2VzLnB1c2goX3NlcXVlbmNlKVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXHRcdFxuXHRcdGxldCBfc3Vic2VxdWVuY2VzID0gc3Vic2VxdWVuY2VzLnNsaWNlKDEpXG5cdFx0XG5cdFx0Ly8gc2tpcCBzdWJzZXF1ZW5jZXMgdG8gZm9sbG93IHRoYXQgb3ZlcmxhcCB3aXRoIGN1cnJlbnQgc3Vic2VxdWVuY2Vcblx0XHR3aGlsZSAob3ZlcmxhcHMoc3Vic2VxdWVuY2UsIF9zdWJzZXF1ZW5jZXNbMF1bMF0pKSB7XG5cdFx0XHRpZiAoX3N1YnNlcXVlbmNlcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0c2VxdWVuY2VzLnB1c2goX3NlcXVlbmNlKVxuXG5cdFx0XHRcdC8vIHNraXAgY3VycmVudCBzdWJzZXF1ZW5jZSwgc2luY2UgaXQgb3ZlcmxhcHMgd2l0aCB0aGUgc3Vic2VxdWVuY2VzIHRvIGZvbGxvdywgYW5kIGdlbmVyYXRlIHNlcXVlbmNlcyBmcm9tIHRoZSByZW1haW5pbmcgc3Vic2VxdWVuY2VzXG5cdFx0XHRcdHNlcXVlbmNlcy5wdXNoKC4uLnN1YnNlcXVlbmNlc1NlcXVlbmNlcyhzZXF1ZW5jZSwgX3N1YnNlcXVlbmNlcywgc3Vic2VxdWVuY2VzQWxsKSlcblxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblxuXHRcdFx0X3N1YnNlcXVlbmNlcyA9IF9zdWJzZXF1ZW5jZXMuc2xpY2UoMSlcblx0XHR9XG5cdFx0XG5cdFx0Ly8gZ2VuZXJhdGUgc2VxdWVuY2VzIGZyb20gdGhlIHJlbWFpbmluZyBzdWJzZXF1ZW5jZXNcblx0XHRzZXF1ZW5jZXMucHVzaCguLi5zdWJzZXF1ZW5jZXNTZXF1ZW5jZXMoX3NlcXVlbmNlLCBfc3Vic2VxdWVuY2VzLCBzdWJzZXF1ZW5jZXNBbGwpKVxuXG5cdFx0X3N1YnNlcXVlbmNlcyA9IHN1YnNlcXVlbmNlcy5zbGljZSgxKVxuXG5cdFx0Ly8gc2tpcCBjdXJyZW50IHN1YnNlcXVlbmNlIGlmIG92ZXJsYXBzIHdpdGggc3Vic2VxdWVuY2VzIHRvIGZvbGxvd1xuXHRcdHdoaWxlIChvdmVybGFwcyhzdWJzZXF1ZW5jZSwgX3N1YnNlcXVlbmNlc1swXVswXSkpIHsgICAgICBcblx0XHRcdGlmIChfc3Vic2VxdWVuY2VzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRzZXF1ZW5jZXMucHVzaCguLi5zdWJzZXF1ZW5jZXNTZXF1ZW5jZXMoc2VxdWVuY2UsIF9zdWJzZXF1ZW5jZXMsIHN1YnNlcXVlbmNlc0FsbCkpXG5cdFx0XHRcdHNlcXVlbmNlcy5wdXNoKF9zZXF1ZW5jZSlcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvLyBnZW5lcmF0ZSBzZXF1ZW5jZXMgZnJvbSB0aGUgcmVtYWluaW5nIHN1YnNlcXVlbmNlc1xuXHRcdFx0c2VxdWVuY2VzLnB1c2goLi4uc3Vic2VxdWVuY2VzU2VxdWVuY2VzKHNlcXVlbmNlLCBfc3Vic2VxdWVuY2VzLCBzdWJzZXF1ZW5jZXNBbGwpKVxuXHRcdFx0XG5cdFx0XHRfc3Vic2VxdWVuY2VzID0gX3N1YnNlcXVlbmNlcy5zbGljZSgxKVxuXHRcdH1cblx0fSlcblx0XG5cdHJldHVybiBzZXF1ZW5jZXNcbn1cblxuLyoqXG4qIEBwYXJhbSB7TnVtYmVyIHx8IEFycmF5fSBzcGFjZSBhIGBzcGFjZWAgb3IgYSBgc2NoZW1hYFxuKiBAcGFyYW0ge0FycmF5fSBzZXF1ZW5jZSBhIGBzZXF1ZW5jZWBcbiovXG5mdW5jdGlvbiBzdWJzZXF1ZW5jZShzcGFjZSwgc2VxdWVuY2UpIHtcblx0Y29uc3Qgc3ViUyA9IEFycmF5LmlzQXJyYXkoc3BhY2UpXG5cdD8gZmlsbFNjaGVtYShzcGFjZSwgc2VxdWVuY2UsIFtdLCBmaWxsU2NoZW1hKVxuXHQ6IGZpbGxTcGFjZShzcGFjZSwgc2VxdWVuY2UsIFtdLCBmaWxsU3BhY2UpXG5cdFxuXHQvLyBvbmx5IGlmIGFsbCBzcGFjZSBpcyBmaWxsZWQgcmV0dXJuIHRoZSBzdWJzZXF1ZW5jZVxuXHRpZiAoaXNEZWx0YUVtcHR5KHNwYWNlLCBzdWJTKSkgcmV0dXJuIHN1YlMubWFwKCBcblx0XHQodCxpKSA9PiBpIC8vIHN0b3JlIHJlZnMgdG8gYGl0ZW1zYCBpbiB0aGUgYHNlcXVlbmNlYCByYXRoZXIgdGhhbiB0aGUgYGl0ZW1zYCB0aGVtc2VsdmVzXG5cdClcblx0XHRcblx0cmV0dXJuIG51bGxcbn1cblx0XG4vKipcblx0QHBhcmFtIHtbTnVtYmVyIHx8IEFycmF5XX0gc3BhY2UgYXJyYXkgb2YgYHNwYWNlYHMgb3IgYHNjaGVtYWBzXG5cdEBwYXJhbSB7QXJyYXl9IHNlcXVlbmNlIGEgYHNlcXVlbmNlYFxuXHRAcmV0dXJucyB7W0FycmF5XX0gYXJyYXlzIG9mIGBzdWJzZXF1ZW5jZWBzIChyZXByZXNlbnRlZCBieSBgcmVmYHMpLCByZXNwZWN0aXZlIHRvIHRoZSBnaXZlbiBgc3BhY2Vgcywgc3RhcnRpbmcgZnJvbSBlYWNoIGl0ZW0gaW4gdGhlIGBzZXF1ZW5jZWBcbiovXG5mdW5jdGlvbiBzdWJzZXF1ZW5jZXMoc3BhY2UsIHNlcXVlbmNlKSB7XG5cdGNvbnN0IHN1YlNzID0gc2VxdWVuY2UucmVkdWNlKChzdWJTcywgaXRlbSwgaSkgPT4ge1xuXHRcdGNvbnN0IHN1YlNzU3BhY2UgPSBzcGFjZS5yZWR1Y2UoKHN1YlNzLCBzcGFjZSkgPT4ge1xuXHRcdFx0Y29uc3Qgc3ViUyA9IHN1YnNlcXVlbmNlKHNwYWNlLCBzZXF1ZW5jZS5zbGljZShpKSlcblx0XHRcdGlmICghc3ViUykgcmV0dXJuIHN1YlNzXG5cdFx0XHRcblx0XHRcdHN1YlNzLnB1c2goc3ViUy5tYXAocmVmID0+IGkgKyByZWYpKVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gc3ViU3Ncblx0XHR9LCBbXSlcblx0XHRcblx0XHRpZiAoIXN1YlNzU3BhY2UubGVuZ3RoKSByZXR1cm4gc3ViU3Ncblx0XHRcblx0XHRzdWJTcy5wdXNoKHN1YlNzU3BhY2UpXG5cdFx0cmV0dXJuIHN1YlNzXG5cdH0sIFtdKVxuXHRcblx0cmV0dXJuIHN1YlNzXG59XG5cdFxuLyoqXG5cdEBwYXJhbSB7QXJyYXl9IHNTcmMgYSBgc2VxdWVuY2VgXG5cdEBkZXNjcmlwdGlvbiBGb3JtIGEgYHN1YnNlcXVlbmNlYCBieSB1bnNoaWZ0aW5nIGBpdGVtYHMgZnJvbSB0aGUgZ2l2ZW4gYHNlcXVlbmNlYCB1bnRpbCB0aGUgZ2l2ZW4gYHNwYWNlYCBpcyBmaWxsZWQgaW4gdGhlIGBzdWJzZXF1ZW5jZWBcbiovXG5mdW5jdGlvbiBmaWxsU3BhY2UoZCwgc1NyYywgcywgZmlsbCkge1xuXHRpZiAoc1NyYy5sZW5ndGggPT09IDApIHJldHVybiBzXG5cdFxuXHRjb25zdCBfc1NyYyA9IFsuLi5zU3JjXVxuXG5cdGNvbnN0IGl0ZW1TcGFjZSA9IF9zU3JjLnNoaWZ0KClcblx0Y29uc3QgZE5ldyA9IGQgLSBpdGVtU3BhY2Vcblx0XG5cdGlmIChkTmV3IDwgMCkgcmV0dXJuIHNcblx0XG5cdHMucHVzaChpdGVtU3BhY2UpXG5cdFxuXHRpZiAoMCA9PT0gZE5ldykgcmV0dXJuIHNcblx0XG5cdHJldHVybiBmaWxsKGROZXcsIF9zU3JjLCBzLCBmaWxsKVxufVxuXG4vKipcblx0QHBhcmFtIHtBcnJheX0gc1NyYyBhIGBzZXF1ZW5jZWBcbiovXG5mdW5jdGlvbiBmaWxsU2NoZW1hKGQsIHNTcmMsIHMsIGZpbGwpIHtcblx0aWYgKHNTcmMubGVuZ3RoID09PSAwKSByZXR1cm4gc1xuXHRcblx0Y29uc3QgX3NTcmMgPSBbLi4uc1NyY11cblxuXHRjb25zdCBpdGVtU3BhY2UgPSBfc1NyYy5zaGlmdCgpXG5cdGlmICghZC5pbmNsdWRlcyhpdGVtU3BhY2UpKSByZXR1cm4gc1xuXHRcblx0cy5wdXNoKGl0ZW1TcGFjZSlcblx0XG5cdGNvbnN0IF9kID0gWy4uLmRdOyBfZC5zcGxpY2UoZC5pbmRleE9mKGl0ZW1TcGFjZSksIDEpXG5cdFxuXHRpZiAoX2QubGVuZ3RoID09PSAwKSByZXR1cm4gc1xuXG5cdHJldHVybiBmaWxsKF9kLCBfc1NyYywgcywgZmlsbClcbn1cblx0XG5leHBvcnQge1xuXHRzdWJzZXF1ZW5jZXNTZXF1ZW5jZXMsXG5cdHN1YnNlcXVlbmNlcyxcblx0XG5cdGZpbGxTcGFjZSwgZmlsbFNjaGVtYSxcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQge3N1YnNlcXVlbmNlcywgc3Vic2VxdWVuY2VzU2VxdWVuY2VzLCBuZWdhdGVPdmVybGFwc30gZnJvbSAnLi4vLi4vc3JjL2luZGV4LmpzJ1xuaW1wb3J0IHtzdWJzZXF1ZW5jZXNTZXF1ZW5jZXNDb250YWluZXIsIHNlcXVlbmNlQW5hbHl6ZWRDb250YWluZXJ9IGZyb20gJy4vZWxlbWVudHMuanMnXG5pbXBvcnQge3JlbmRlclNlcXVlbmNlLCByZW5kZXJTdWJzZXF1ZW5jZXMsIHJlbmRlckNvbnRyb2xzLCBmaXZlUmFuZG9tU2VxdWVuY2VzfSBmcm9tICcuL2NvcmUuanMnXG5pbXBvcnQgc2VxdWVuY2VzIGZyb20gJy4vc2VxdWVuY2VzLmpzJ1xuXG5pbXBvcnQgJy4vaW5kZXguaHRtbCdcbmltcG9ydCAnLi9pbmRleC5zY3NzJ1xuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXl9IHN1YnNlcXVlbmNlcyBhbiBhcnJheSBvZiBzZXF1ZW5jZXMgb2YgYHN1YnNlcXVlbmNlc2BcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gYW4gZWxlbWVudCB3aXRoIHJlbmRlcmVkIHNlcXVlbmNlcyBvZiBgc3Vic2VxdWVuY2VzYFxuICogQGRlc2NyaXB0aW9uIHJlbmRlcnMgdGhlIG91dHB1dCBvZiBuZWdhdGVPdmVybGFwc1xuKi9cbmZ1bmN0aW9uIHJlbmRlclN1YnNlcXVlbmNlc1NlcXVlbmNlcyhzdWJzZXF1ZW5jZXMsIHNlcXVlbmNlKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gc3Vic2VxdWVuY2VzU2VxdWVuY2VzQ29udGFpbmVyKClcblxuICAgIHN1YnNlcXVlbmNlcy5tYXAoc3ViU3MgPT4gcmVuZGVyU3Vic2VxdWVuY2VzKHN1YlNzLCBzZXF1ZW5jZSkpLmZvckVhY2goc3ViUyA9PiBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3ViUykpXG5cbiAgICByZXR1cm4gY29udGFpbmVyXG59XG5cbi8qKlxuICogQHBhcmFtIHtBcnJheX0gc2VxdWVuY2UgYSBgc2VxdWVuY2VgXG4gKiBAcGFyYW0ge051bWJlciB8fCBBcnJheX0gc3BhY2UgYSBgc3BhY2VgIG9yIGEgYHNjaGVtYWBcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH1cbiAqIEBkZXNjcmlwdGlvbiBhbmFseXplcyBhIGBzZXF1ZW5jZWAgYW5kIHJlbmRlcnMgaXQgd2l0aCB0aGUgcmVzdWx0XG4qL1xuZnVuY3Rpb24gc2VxdWVuY2VBbmFseXplZChzZXF1ZW5jZSwgc3BhY2UpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBzZXF1ZW5jZUFuYWx5emVkQ29udGFpbmVyKClcblxuICAgIGNvbnN0IF9zdWJzZXF1ZW5jZXMgPSBzdWJzZXF1ZW5jZXMoc3BhY2UsIHNlcXVlbmNlKVxuICAgIGNvbnNvbGUubG9nKF9zdWJzZXF1ZW5jZXMpXG5cbiAgICBjb25zdCBzZXF1ZW5jZXMgPSBzdWJzZXF1ZW5jZXNTZXF1ZW5jZXMoW10sIF9zdWJzZXF1ZW5jZXMsIF9zdWJzZXF1ZW5jZXMpXG5cbiAgICBjb25zb2xlLmxvZyhzZXF1ZW5jZXMpXG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmVuZGVyU2VxdWVuY2Uoc2VxdWVuY2UpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJTdWJzZXF1ZW5jZXNTZXF1ZW5jZXMoc2VxdWVuY2VzLCBzZXF1ZW5jZSkpXG5cbiAgICByZXR1cm4gY29udGFpbmVyXG59XG5cbmZ1bmN0aW9uIHNlcXVlbmNlc0FuYWx5emVkKHNlcXVlbmNlcywgc3BhY2UsIGNvbnRhaW5lcikge1xuICAgIGNvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oLi4uc2VxdWVuY2VzLm1hcChzZXF1ZW5jZSA9PiBzZXF1ZW5jZUFuYWx5emVkKHNlcXVlbmNlLCBzcGFjZSkpKVxufVxuXG5mdW5jdGlvbiBtYWluKHNlcXVlbmNlc0NvbnRhaW5lciwgY29udHJvbHNDb250YWluZXIpIHtcbiAgICBjb25zdCBjb250cm9sQ2IgPSAocmF0aW8pID0+IHtcbiAgICAgICAgY29uc3QgX3NlcXVlbmNlcyA9IGZpdmVSYW5kb21TZXF1ZW5jZXMocmF0aW8sIHNlcXVlbmNlcylcbiAgICAgICAgc2VxdWVuY2VzQW5hbHl6ZWQoX3NlcXVlbmNlcywgW1syXSwgWzEsMl0sIFsxLDEsMV1dLCBzZXF1ZW5jZXNDb250YWluZXIpXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udHJvbHMoc2VxdWVuY2VzLCBjb250cm9sc0NvbnRhaW5lciwgY29udHJvbENiKVxuXG4gICAgY29uc3QgX3NlcXVlbmNlcyA9IGZpdmVSYW5kb21TZXF1ZW5jZXMoMiwgc2VxdWVuY2VzKVxuICAgIHNlcXVlbmNlc0FuYWx5emVkKF9zZXF1ZW5jZXMsIFtbMl0sIFsxLDJdLCBbMSwxLDFdXSwgc2VxdWVuY2VzQ29udGFpbmVyKVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBtYWluKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluIC5zZXF1ZW5jZXMtYW5hbHl6ZWQnKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4gLmNvbnRyb2xzJykpXG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==