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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0EySDtBQUMzRTs7QUFFaEQ7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsK0RBQWlCOztBQUV2QyxnRUFBZ0Usd0RBQVUsS0FBSyxzREFBUTs7QUFFdkY7QUFDQTs7QUFFQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0EsdUJBQXVCLGtFQUFvQjs7QUFFM0M7QUFDQTtBQUNBLHlDQUF5Qyx3REFBVSxLQUFLLHNEQUFRO0FBQ2hFLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUVBQXFCOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsZ0VBQW1COztBQUV2QztBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIscURBQU87QUFDckMsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNGQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDLHNCQUFzQjs7QUFFeEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLE1BQU0sR0FBRyxRQUFRO0FBQ3ZDOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4REE7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9nQkE7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLGlCQUFpQjtBQUMxQixTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLGlCQUFpQjtBQUMxQixTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLE9BQU87QUFDaEIsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxLQUFLO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVUsUUFBUTtBQUNsQixVQUFVLFFBQVE7QUFDbEIsVUFBVSxPQUFPO0FBQ2pCLFlBQVksU0FBUztBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RXFGOztBQUV0RjtBQUNBLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0saUVBQW9CLDRJQUE0SSxxQ0FBcUMscUJBQXFCOztBQUVoTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxxREFBUTtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUyxxREFBUTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxpQkFBaUI7QUFDM0IsVUFBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyx5REFBWTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsT0FBTztBQUNoQixXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQU1DOzs7Ozs7O1VDeEpEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZzRjtBQUNDO0FBQ1U7QUFDM0Q7O0FBRWpCO0FBQ0E7O0FBRXJCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsYUFBYTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNEVBQThCOztBQUVwRCw4QkFBOEIsNERBQWtCOztBQUVoRDtBQUNBOztBQUVBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsaUJBQWlCO0FBQzVCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdUVBQXlCOztBQUUvQywwQkFBMEIsMkRBQVk7QUFDdEM7O0FBRUEsc0JBQXNCLG9FQUFxQjs7QUFFM0M7O0FBRUEsMEJBQTBCLHdEQUFjO0FBQ3hDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsNkRBQW1CLFFBQVEscURBQVM7QUFDL0Q7QUFDQTs7QUFFQSxJQUFJLHlEQUFjLENBQUMscURBQVM7O0FBRTVCLHVCQUF1Qiw2REFBbUIsSUFBSSxxREFBUztBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maXQtaW4tcm93cy8uL2RlbW8vc3JjL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vZml0LWluLXJvd3MvLi9kZW1vL3NyYy9jb3JlLmpzIiwid2VicGFjazovL2ZpdC1pbi1yb3dzLy4vZGVtby9zcmMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vZml0LWluLXJvd3MvLi9kZW1vL3NyYy9oZWxwZXJzLmpzIiwid2VicGFjazovL2ZpdC1pbi1yb3dzLy4vZGVtby9zcmMvc2VxdWVuY2VzLmpzIiwid2VicGFjazovL2ZpdC1pbi1yb3dzLy4vc3JjL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vZml0LWluLXJvd3MvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZml0LWluLXJvd3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZml0LWluLXJvd3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZpdC1pbi1yb3dzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZml0LWluLXJvd3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9maXQtaW4tcm93cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ZpdC1pbi1yb3dzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2ZpdC1pbi1yb3dzLy4vZGVtby9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHtpdGVtTmFycm93LCBpdGVtV2lkZSwgc2VxdWVuY2VDb250YWluZXIsIHN1YnNlcXVlbmNlQ29udGFpbmVyLCBzdWJzZXF1ZW5jZXNDb250YWluZXIsIGNvbnRyb2x9IGZyb20gJy4vZWxlbWVudHMuanMnXG5pbXBvcnQge3VuaXF1ZVJhbmRvbU51bWJlcnN9IGZyb20gJy4vaGVscGVycy5qcydcblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5fSBuZXh0IGEgcmVmZXJlbmNlIHRvIGEgYHN1YnNlcXVlbmNlYCBzdWNoIHRoYXQgdGhlIGZpcnN0IGl0ZW0gaXMgZ3JlYXRlciB0aGFuIHRoZSBsYXN0IGl0ZW0gb2YgcHJldiBhdCBsZWFzdCBieSAxXG4gKiBAcGFyYW0ge0FycmF5fSBwcmV2IGEgcmVmZXJlbmNlIHRvIGEgYHN1YnNlcXVlbmNlYFxuICogQHJldHVybnMge0Jvb2xlYW59IHdoZXRoZXIgbmV4dCBpcyBjb25zZWN1dGl2ZSB0byBwcmV2XG4qL1xuZnVuY3Rpb24gaXNDb25zZWN1dGl2ZShuZXh0LCBwcmV2KSB7XG4gICAgcmV0dXJuIG5leHRbMF0gLSBwcmV2W3ByZXYubGVuZ3RoLTFdID09PSAxXG59XG5cbi8qKlxuICogQHBhcmFtIHtBcnJheX0gc2VxdWVuY2Ugc2VxdWVuY2Ugb2YgYGl0ZW1gc1xuICogQHJldHVybnMgYW4gZWxlbWVudCB3aXRoIHJlbmRlcmVkIHNlcXVlbmNlXG4gKi9cbmZ1bmN0aW9uIHJlbmRlclNlcXVlbmNlKHNlcXVlbmNlKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gc2VxdWVuY2VDb250YWluZXIoKVxuXG4gICAgc2VxdWVuY2UuZm9yRWFjaChpdGVtID0+IGNvbnRhaW5lci5hcHBlbmRDaGlsZCgxID09PSBpdGVtID8gaXRlbU5hcnJvdygpIDogaXRlbVdpZGUoKSkpXG5cbiAgICByZXR1cm4gY29udGFpbmVyXG59XG5cbi8qKlxuICogQHBhcmFtIHtBcnJheX0gc3Vic2VxdWVuY2UgYSBgc3Vic2VxdWVuY2VgIHJlcHJlc2VudGVkIHdpdGggYHJlZmBzXG4gKiBAcGFyYW0ge0FycmF5fSBzZXF1ZW5jZSBhIGBzZXF1ZW5jZWBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYmxhbmsgd2hldGhlciB0byByZW5kZXIgYSBibGFuayBzdWJzZXF1ZW5jZVxuICogQHJldHVybnMge0hUTUxFbGVtZW50fVxuKi9cbmZ1bmN0aW9uIHJlbmRlclN1YnNlcXVlbmNlKHN1YnNlcXVlbmNlLCBzZXF1ZW5jZSwgYmxhbmspIHtcbiAgICBjb25zdCBfY29udGFpbmVyID0gc3Vic2VxdWVuY2VDb250YWluZXIoYmxhbmspXG5cbiAgICBzdWJzZXF1ZW5jZVxuICAgICAgICAubWFwKHJlZiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2VxdWVuY2VbcmVmXSA9PT0gMSA/IGl0ZW1OYXJyb3coKSA6IGl0ZW1XaWRlKClcbiAgICAgICAgfSlcbiAgICAgICAgLmZvckVhY2goaXRlbSA9PiBfY29udGFpbmVyLmFwcGVuZENoaWxkKGl0ZW0pKVxuXG4gICAgcmV0dXJuIF9jb250YWluZXJcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1tBcnJheV19IHN1YnNlcXVlbmNlcyBhIHNlcXVlbmNlIG9mIGBzdWJzZXF1ZW5jZWBzXG4gKiBAcGFyYW0ge0FycmF5fSBzZXF1ZW5jZSBhIHNlcXVlbmNlIG9mIGBpdGVtYHNcbiAqIEBkZWNyaXB0aW9uIHJlbmRlciBhIHNlcXVlbmNlIG9mIHN1YnNlcXVlbmNlcyBzdWNoIHRoYXQgdGhlIHNwYWNlIGZvciBpdGVtcyBub3QgaW5jbHVkZWQgaW4gdGhlIHN1YnNlcXVlbmNlcyBpcyBwcmVzZXJ2ZWRcbiovXG5mdW5jdGlvbiByZW5kZXJTdWJzZXF1ZW5jZXMoc3Vic2VxdWVuY2VzLCBzZXF1ZW5jZSkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHN1YnNlcXVlbmNlc0NvbnRhaW5lcigpXG5cbiAgICBjb25zdCBlbHMgPSBzdWJzZXF1ZW5jZXMucmVkdWNlKChzdWJTcywgc3ViUywgaSkgPT4ge1xuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHN1YlNbMF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICBzdWJTcy5wdXNoKHJlbmRlclN1YnNlcXVlbmNlKHN1YlMsIHNlcXVlbmNlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc3ViU3NcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgYmxhbmsgc3Vic2VxdWVuY2UgdG8gcmVwcmVzZW50IHRoZSBub3QgaW5jbHVkZWQgaXRlbXNcbiAgICAgICAgICAgIHN1YlNzLnB1c2gocmVuZGVyU3Vic2VxdWVuY2Uoc2VxdWVuY2UubWFwKChpdGVtLCBpKSA9PiBpKS5zbGljZSgwLCBzdWJTWzBdKSwgc2VxdWVuY2UsIHRydWUpKVxuICAgICAgICAgICAgc3ViU3MucHVzaChyZW5kZXJTdWJzZXF1ZW5jZShzdWJTLCBzZXF1ZW5jZSkpXG4gICAgICAgICAgICByZXR1cm4gc3ViU3NcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN1YlNQcmV2ID0gc3Vic2VxdWVuY2VzW2ktMV1cblxuICAgICAgICBpZiAoaXNDb25zZWN1dGl2ZShzdWJTLCBzdWJTUHJldikpIHtcbiAgICAgICAgICAgIHN1YlNzLnB1c2gocmVuZGVyU3Vic2VxdWVuY2Uoc3ViUywgc2VxdWVuY2UpKVxuICAgICAgICAgICAgcmV0dXJuIHN1YlNzXG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgYSBibGFuayBzdWJzZXF1ZW5jZSB0byByZXByZXNlbnQgdGhlIG5vdCBpbmNsdWRlZCBpdGVtc1xuICAgICAgICBzdWJTcy5wdXNoKHJlbmRlclN1YnNlcXVlbmNlKHNlcXVlbmNlLm1hcCgoaXRlbSwgaSkgPT4gaSkuc2xpY2Uoc3ViU1ByZXZbc3ViU1ByZXYubGVuZ3RoLTFdKzEsIHN1YlNbMF0pLCBzZXF1ZW5jZSwgdHJ1ZSkpXG4gICAgICAgIFxuICAgICAgICBzdWJTcy5wdXNoKHJlbmRlclN1YnNlcXVlbmNlKHN1YlMsIHNlcXVlbmNlKSlcbiAgICAgICAgcmV0dXJuIHN1YlNzXG4gICAgfSwgW10pXG4gICAgZWxzLmZvckVhY2goZSA9PiBjb250YWluZXIuYXBwZW5kQ2hpbGQoZSkpXG5cbiAgICByZXR1cm4gY29udGFpbmVyXG59XG5cbmZ1bmN0aW9uIGZpdmVSYW5kb21TZXF1ZW5jZXMocmF0aW8sIHNlcXVlbmNlcykge1xuICAgIGNvbnN0IG51bWJlcnMgPSB1bmlxdWVSYW5kb21OdW1iZXJzKHNlcXVlbmNlc1tyYXRpb10ubGVuZ3RoIDwgNSA/IHNlcXVlbmNlc1tyYXRpb10ubGVuZ3RoLTEgOiA1LCBzZXF1ZW5jZXNbcmF0aW9dLmxlbmd0aC0xKVxuXG4gICAgcmV0dXJuIG51bWJlcnMubWFwKG4gPT4gc2VxdWVuY2VzW3JhdGlvXVtuXSlcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29udHJvbHMoc2VxdWVuY2VzLCBjb250YWluZXIsIGNvbnRyb2xDYikge1xuICAgIHNlcXVlbmNlcy5mb3JFYWNoKChnLCBpKSA9PiB7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250cm9sKGksIGdbMF0ubGVuZ3RoLWksIGNvbnRyb2xDYikpXG4gICAgfSlcbn1cblxuZXhwb3J0IHtyZW5kZXJTZXF1ZW5jZSwgcmVuZGVyU3Vic2VxdWVuY2UsIHJlbmRlclN1YnNlcXVlbmNlcywgcmVuZGVyQ29udHJvbHMsIGZpdmVSYW5kb21TZXF1ZW5jZXN9IiwiZnVuY3Rpb24gaXRlbVdpZGUoKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZS5jbGFzc05hbWUgPSBgaXRlbSB3aWRlYFxuXG4gICAgcmV0dXJuIGVcbn1cblxuZnVuY3Rpb24gaXRlbU5hcnJvdygpIHtcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBlLmNsYXNzTmFtZSA9IGBpdGVtIG5hcnJvd2BcblxuICAgIHJldHVybiBlXG59XG5cbmZ1bmN0aW9uIHNlcXVlbmNlQ29udGFpbmVyKCkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGUuY2xhc3NMaXN0LmFkZCgnaXRlbS1zZXF1ZW5jZScpXG5cbiAgICByZXR1cm4gZVxufVxuXG5mdW5jdGlvbiBzdWJzZXF1ZW5jZUNvbnRhaW5lcihibGFuaykge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGUuY2xhc3NOYW1lID0gYGl0ZW0tc2VxdWVuY2Uke2JsYW5rID8gJyBibGFuaycgOiAnJ31gXG5cbiAgICByZXR1cm4gZVxufVxuXG5mdW5jdGlvbiBzdWJzZXF1ZW5jZXNDb250YWluZXIoKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZS5jbGFzc0xpc3QuYWRkKCdzZXF1ZW5jZS1zZXF1ZW5jZScpXG5cbiAgICByZXR1cm4gZVxufVxuXG5mdW5jdGlvbiBzdWJzZXF1ZW5jZXNTZXF1ZW5jZXNDb250YWluZXIoKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZS5jbGFzc0xpc3QuYWRkKCdzZXF1ZW5jZXMnKVxuICAgIHJldHVybiBlXG59XG5cbmZ1bmN0aW9uIHNlcXVlbmNlQW5hbHl6ZWRDb250YWluZXIoKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZS5jbGFzc0xpc3QuYWRkKCdzZXF1ZW5jZS1hbmFseXplZCcpXG4gICAgcmV0dXJuIGVcbn1cblxuZnVuY3Rpb24gY29udHJvbCh3aWRlTiwgbmFycm93TiwgY2IpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgXG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnY29udHJvbCcpXG5cbiAgICBlbC5pbm5lclRleHQgPSBgJHt3aWRlTn0vJHtuYXJyb3dOfWBcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNiKHdpZGVOKSlcblxuICAgIHJldHVybiBlbFxufVxuXG5leHBvcnQge2l0ZW1XaWRlLCBpdGVtTmFycm93LCBzZXF1ZW5jZUNvbnRhaW5lciwgc3Vic2VxdWVuY2VDb250YWluZXIsIHN1YnNlcXVlbmNlc0NvbnRhaW5lciwgc3Vic2VxdWVuY2VzU2VxdWVuY2VzQ29udGFpbmVyLCBzZXF1ZW5jZUFuYWx5emVkQ29udGFpbmVyLCBjb250cm9sfSIsIi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IG51bWJlciBob3cgbWFueSB1bmlxdWUgbnVtYmVycyB0byBnZW5lcmF0ZTogbXVzdCBiZSBzbWFsbGVyIHRoYW4gYG1heGltdW1gXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4aW11bSB0aGUgbWF4aW1hbCBudW1iZXIgdG8gZ2VuZXJhdGU6IG11c3QgYmUgbGFyZ2VyIHRoYW4gYG51bWJlcmBcbiAqIEByZXR1cm5zIGEgZ2l2ZW4gbnVtYmVyIG9mIHVuaXF1ZSByYW5kb20gbnVtYmVycyBiZWxvdyBnaXZlbiBtYXhpbXVtXG4qL1xuZnVuY3Rpb24gdW5pcXVlUmFuZG9tTnVtYmVycyhudW1iZXIsIG1heGltdW0pIHtcbiAgICBjb25zdCBudW1iZXJzID0gW11cblxuICAgIHdoaWxlIChudW1iZXJzLmxlbmd0aCA8IG51bWJlcikge1xuICAgICAgICBjb25zdCBuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4aW11bSsxKVxuICAgICAgICBcbiAgICAgICAgaWYgKG51bWJlcnMuaW5jbHVkZXMobikpIGNvbnRpbnVlXG5cbiAgICAgICAgbnVtYmVycy5wdXNoKG4pXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bWJlcnNcbn1cblxuZXhwb3J0IHt1bmlxdWVSYW5kb21OdW1iZXJzfSIsImV4cG9ydCBkZWZhdWx0IFtcbiAgW1xuICAgIFtcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMVxuICAgIF1cbiAgXSxcbiAgW1xuICAgIFtcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMVxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdXG4gIF0sXG4gIFtcbiAgICBbXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMVxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMVxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMVxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxXG4gICAgXVxuICBdLFxuICBbXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMVxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMVxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMVxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICBdXG4gIF0sXG4gIFtcbiAgICBbXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMVxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMVxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAxXG4gICAgXVxuICBdLFxuICBbXG4gICAgW1xuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMlxuICAgIF0sXG4gICAgW1xuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAyXG4gICAgXSxcbiAgICBbXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMSxcbiAgICAgIDJcbiAgICBdLFxuICAgIFtcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMVxuICAgIF1cbiAgXSxcbiAgW1xuICAgIFtcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMixcbiAgICAgIDIsXG4gICAgICAyLFxuICAgICAgMlxuICAgIF1cbiAgXVxuXSIsIi8qKlxuXHRAcGFyYW0ge0FycmF5fSBzZXF1ZW5jZSBhIHNlcXVlbmNlIG9mIGBpdGVtc2AgKGUuZy4sIGEgYHN1YnNlcXVlbmNlYClcbiovXG5mdW5jdGlvbiBzaXplKHNlcXVlbmNlKSB7XG5cdHJldHVybiBzZXF1ZW5jZS5yZWR1Y2UoKHN1bSwgaSkgPT4gc3VtK2ksIDApXG59XG5cbi8qKlxuXHRAcGFyYW0ge051bWJlciB8fCBBcnJheX0gc3BhY2UgZWl0aGVyIGBzcGFjZWAgb3IgYHNjaGVtYWBcblx0QHBhcmFtIHtBcnJheX0gc2VxdWVuY2UgYSBzZXF1ZW5jZSBvZiBgaXRlbWBzIChlLmcuLCBhIGBzdWJzZXF1ZW5jZWApXG4qL1xuZnVuY3Rpb24gZGVsdGEoc3BhY2UsIHNlcXVlbmNlKSB7XG5cdGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mKHNwYWNlKSkgcmV0dXJuIHNwYWNlIC0gc2l6ZShzZXF1ZW5jZSlcblx0aWYgKCFBcnJheS5pc0FycmF5KHNwYWNlKSkgdGhyb3cgbmV3IEVycm9yKClcblx0XG5cdGNvbnN0IGRlbHRhID0gc2VxdWVuY2UucmVkdWNlKChkLCBpKSA9PiB7XG5cdFx0aWYgKGQubGVuZ3RoID09PSAwKSByZXR1cm4gZFxuXHRcdGlmICghZC5pbmNsdWRlcyhpKSkgcmV0dXJuIGRcblx0XHRcblx0XHRkLnNwbGljZShkLmluZGV4T2YoaSksIDEpXG5cdFx0cmV0dXJuIGRcblx0fSwgWy4uLnNwYWNlXSlcblx0XG5cdHJldHVybiBkZWx0YVxufVxuXG4vKipcblx0QHBhcmFtIHtOdW1iZXIgfHwgQXJyYXl9IHNwYWNlIGVpdGhlciBgc3BhY2VgIG9yIGBzY2hlbWFgXG5cdEBwYXJhbSB7QXJyYXl9IHNlcXVlbmNlIGEgc2VxdWVuY2Ugb2YgYGl0ZW1zYCAoZS5nLiwgYSBgc3Vic2VxdWVuY2VgKVxuKi9cbmZ1bmN0aW9uIGlzRGVsdGFFbXB0eShzcGFjZSwgc2VxdWVuY2UpIHtcblx0Y29uc3QgX2RlbHRhID0gZGVsdGEoc3BhY2UsIHNlcXVlbmNlKVxuXHRyZXR1cm4gQXJyYXkuaXNBcnJheShfZGVsdGEpXG5cdD8gMCA9PT0gX2RlbHRhLmxlbmd0aFxuXHQ6IDAgPT09IF9kZWx0YVxufVxuXG4vKipcblx0QHBhcmFtIHtBcnJheX0gYSBhIGBzdWJzZXF1ZW5jZWAsIHJlcHJlc2VudGVkIGJ5IGByZWZgc1xuXHRAcGFyYW0ge0FycmF5fSBiIGEgYHN1YnNlcXVlbmNlYCwgcmVwcmVzZW50ZWQgYnkgYHJlZmBzXG5cdEByZXR1cm5zIHdoZXRoZXIgYSBhbmQgYiBvdmVybGFwIGVhY2ggb3RoZXJcbiovXG5mdW5jdGlvbiBvdmVybGFwcyhhLCBiKSB7XG5cdGxldCBpID0gMCwgbCA9IGEubGVuZ3RoXG5cdGZvciAoaTsgaTxsOyBpKyspIHtcblx0XHRpZiAoYi5pbmNsdWRlcyhhW2ldKSkgcmV0dXJuIHRydWVcblx0fVxuXHRcblx0cmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuKiBAcGFyYW0ge051bWJlcn0gZmlyc3QgYSBgcmVmYCB0byBhbiBgaXRlbWBcbiogQHBhcmFtIHtOdW1iZXJ9IGxhc3QgYSBgcmVmYCB0byBhbiBgaXRlbWBcbiogQHBhcmFtIHtBcnJheX0gc3Vic2VxdWVuY2VzIGFuIGFycmF5IG9mIGBzdWJzZXF1ZW5jZWBzXG4qIEByZXR1cm5zIHtCb29sZWFufSB3aGV0aGVyIGF0IGxlYXN0IG9uZSBgc3Vic2VxdWVuY2VgIGlzIGNvbnRhaW5lZCBiZXR3ZWVuIGBmaXJzdGAgYW5kIGBsYXN0YFxuKi9cbmZ1bmN0aW9uIGNvbnRhaW5zU3Vic2VxdWVuY2VzKGZpcnN0LCBsYXN0LCBzdWJzZXF1ZW5jZXMpIHtcblxuXHRmb3IgKGNvbnN0IHN1YnNlcXVlbmNlIG9mIHN1YnNlcXVlbmNlcykge1xuXHRcdGlmIChzdWJzZXF1ZW5jZVswXSA8PSBmaXJzdCkgY29udGludWVcblx0XHRpZiAoc3Vic2VxdWVuY2Vbc3Vic2VxdWVuY2UubGVuZ3RoLTFdIDwgbGFzdCkge1xuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0XG5cdHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQge1xuXHRzaXplLCBkZWx0YSwgaXNEZWx0YUVtcHR5LCBvdmVybGFwcywgY29udGFpbnNTdWJzZXF1ZW5jZXNcbn1cbiIsImltcG9ydCB7c2l6ZSwgZGVsdGEsIGlzRGVsdGFFbXB0eSwgb3ZlcmxhcHMsIGNvbnRhaW5zU3Vic2VxdWVuY2VzfSBmcm9tICcuL2hlbHBlcnMuanMnXG5cbi8qKlxuKiBAcGFyYW0ge0FycmF5fSBzZXF1ZW5jZSBhIGBzZXF1ZW5jZWBcbiogQHBhcmFtIHtBcnJheX0gc3Vic2VxdWVuY2VzIGFycmF5cyBvZiBgc3Vic2VxdWVuY2VgcyBhcyByZXR1cm5lZCBieSBgc3Vic2VxdWVuY2VzYFxuKiBAcGFyYW0ge0FycmF5fSBzdWJzZXF1ZW5jZXNBbGwgYXJyYXlzIG9mIGBzdWJzZXF1ZW5jZWBzIGFzIHJldHVybmVkIGJ5IGBzdWJzZXF1ZW5jZXNgXG4qIEByZXR1cm5zIHtBcnJheX0gYXJyYXkgb2Ygc2VxdWVuY2VzIG9mIGBzdWJzZXF1ZW5jZWBzIHdoZXJlIG5vbmUgb2YgdGhlIGBzdWJzZXF1ZW5jZWBzIG92ZXJsYXBcbiovXG5mdW5jdGlvbiBzdWJzZXF1ZW5jZXNTZXF1ZW5jZXMoc2VxdWVuY2UsIHN1YnNlcXVlbmNlcywgc3Vic2VxdWVuY2VzQWxsKSB7XG5cdGNvbnN0IHNlcXVlbmNlcyA9IFtdXG5cdFxuXHRjb25zdCBzdWJzZXF1ZW5jZUxhc3QgPSBzZXF1ZW5jZVtzZXF1ZW5jZS5sZW5ndGgtMV1cblx0XG5cdHN1YnNlcXVlbmNlc1swXS5mb3JFYWNoKChzdWJzZXF1ZW5jZSkgPT4ge1xuXHRcdGNvbnN0IF9zZXF1ZW5jZSA9IFsuLi5zZXF1ZW5jZSwgc3Vic2VxdWVuY2VdXG5cdFx0XG5cdFx0Ly8gc2tpcCByZWN1cnNpb24gaWYgc3BhY2UgYmV0d2VlbiB0aGUgc2VxdWVuY2UgYW5kIHRoZSBzdWJzZXF1ZW5jZSBjYW4gY29udGFpbiBzdWJzZXF1ZW5jZXNcblx0XHRpZiAoY29udGFpbnNTdWJzZXF1ZW5jZXMoc3Vic2VxdWVuY2VMYXN0ID8gc3Vic2VxdWVuY2VMYXN0W3N1YnNlcXVlbmNlTGFzdC5sZW5ndGgtMV0gOiAtMSwgc3Vic2VxdWVuY2VbMF0sIHN1YnNlcXVlbmNlc0FsbC5yZWR1Y2UoKF9zdWJzZXF1ZW5jZXMsIHN1YnNlcXVlbmNlcykgPT4ge19zdWJzZXF1ZW5jZXMucHVzaCguLi5zdWJzZXF1ZW5jZXMpOyByZXR1cm4gX3N1YnNlcXVlbmNlc30sIFtdKSkpIHJldHVyblxuXG5cdFx0aWYgKHN1YnNlcXVlbmNlcy5sZW5ndGggPT09IDEpIHtcdFx0XHRcblx0XHRcdHNlcXVlbmNlcy5wdXNoKF9zZXF1ZW5jZSlcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRcblx0XHRsZXQgX3N1YnNlcXVlbmNlcyA9IHN1YnNlcXVlbmNlcy5zbGljZSgxKVxuXHRcdFxuXHRcdC8vIHNraXAgc3Vic2VxdWVuY2VzIHRvIGZvbGxvdyB0aGF0IG92ZXJsYXAgd2l0aCBjdXJyZW50IHN1YnNlcXVlbmNlXG5cdFx0d2hpbGUgKG92ZXJsYXBzKHN1YnNlcXVlbmNlLCBfc3Vic2VxdWVuY2VzWzBdWzBdKSkge1xuXHRcdFx0aWYgKF9zdWJzZXF1ZW5jZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHNlcXVlbmNlcy5wdXNoKF9zZXF1ZW5jZSlcblxuXHRcdFx0XHQvLyBza2lwIGN1cnJlbnQgc3Vic2VxdWVuY2UsIHNpbmNlIGl0IG92ZXJsYXBzIHdpdGggdGhlIHN1YnNlcXVlbmNlcyB0byBmb2xsb3csIGFuZCBnZW5lcmF0ZSBzZXF1ZW5jZXMgZnJvbSB0aGUgcmVtYWluaW5nIHN1YnNlcXVlbmNlc1xuXHRcdFx0XHRzZXF1ZW5jZXMucHVzaCguLi5zdWJzZXF1ZW5jZXNTZXF1ZW5jZXMoc2VxdWVuY2UsIF9zdWJzZXF1ZW5jZXMsIHN1YnNlcXVlbmNlc0FsbCkpXG5cblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cblx0XHRcdF9zdWJzZXF1ZW5jZXMgPSBfc3Vic2VxdWVuY2VzLnNsaWNlKDEpXG5cdFx0fVxuXHRcdFxuXHRcdC8vIGdlbmVyYXRlIHNlcXVlbmNlcyBmcm9tIHRoZSByZW1haW5pbmcgc3Vic2VxdWVuY2VzXG5cdFx0c2VxdWVuY2VzLnB1c2goLi4uc3Vic2VxdWVuY2VzU2VxdWVuY2VzKF9zZXF1ZW5jZSwgX3N1YnNlcXVlbmNlcywgc3Vic2VxdWVuY2VzQWxsKSlcblxuXHRcdF9zdWJzZXF1ZW5jZXMgPSBzdWJzZXF1ZW5jZXMuc2xpY2UoMSlcblxuXHRcdC8vIHNraXAgY3VycmVudCBzdWJzZXF1ZW5jZSBpZiBvdmVybGFwcyB3aXRoIHN1YnNlcXVlbmNlcyB0byBmb2xsb3dcblx0XHR3aGlsZSAob3ZlcmxhcHMoc3Vic2VxdWVuY2UsIF9zdWJzZXF1ZW5jZXNbMF1bMF0pKSB7ICAgICAgXG5cdFx0XHRpZiAoX3N1YnNlcXVlbmNlcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0c2VxdWVuY2VzLnB1c2goLi4uc3Vic2VxdWVuY2VzU2VxdWVuY2VzKHNlcXVlbmNlLCBfc3Vic2VxdWVuY2VzLCBzdWJzZXF1ZW5jZXNBbGwpKVxuXHRcdFx0XHRzZXF1ZW5jZXMucHVzaChfc2VxdWVuY2UpXG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gZ2VuZXJhdGUgc2VxdWVuY2VzIGZyb20gdGhlIHJlbWFpbmluZyBzdWJzZXF1ZW5jZXNcblx0XHRcdHNlcXVlbmNlcy5wdXNoKC4uLnN1YnNlcXVlbmNlc1NlcXVlbmNlcyhzZXF1ZW5jZSwgX3N1YnNlcXVlbmNlcywgc3Vic2VxdWVuY2VzQWxsKSlcblx0XHRcdFxuXHRcdFx0X3N1YnNlcXVlbmNlcyA9IF9zdWJzZXF1ZW5jZXMuc2xpY2UoMSlcblx0XHR9XG5cdH0pXG5cdFxuXHRyZXR1cm4gc2VxdWVuY2VzXG59XG5cbi8qKlxuKiBAcGFyYW0ge051bWJlciB8fCBBcnJheX0gc3BhY2UgYSBgc3BhY2VgIG9yIGEgYHNjaGVtYWBcbiogQHBhcmFtIHtBcnJheX0gc2VxdWVuY2UgYSBgc2VxdWVuY2VgXG4qL1xuZnVuY3Rpb24gc3Vic2VxdWVuY2Uoc3BhY2UsIHNlcXVlbmNlKSB7XG5cdGNvbnN0IHN1YlMgPSBBcnJheS5pc0FycmF5KHNwYWNlKVxuXHQ/IGZpbGxTY2hlbWEoc3BhY2UsIHNlcXVlbmNlLCBbXSwgZmlsbFNjaGVtYSlcblx0OiBmaWxsU3BhY2Uoc3BhY2UsIHNlcXVlbmNlLCBbXSwgZmlsbFNwYWNlKVxuXHRcblx0Ly8gb25seSBpZiBhbGwgc3BhY2UgaXMgZmlsbGVkIHJldHVybiB0aGUgc3Vic2VxdWVuY2Vcblx0aWYgKGlzRGVsdGFFbXB0eShzcGFjZSwgc3ViUykpIHJldHVybiBzdWJTLm1hcCggXG5cdFx0KHQsaSkgPT4gaSAvLyBzdG9yZSByZWZzIHRvIGBpdGVtc2AgaW4gdGhlIGBzZXF1ZW5jZWAgcmF0aGVyIHRoYW4gdGhlIGBpdGVtc2AgdGhlbXNlbHZlc1xuXHQpXG5cdFx0XG5cdHJldHVybiBudWxsXG59XG5cdFxuLyoqXG5cdEBwYXJhbSB7W051bWJlciB8fCBBcnJheV19IHNwYWNlIGFycmF5IG9mIGBzcGFjZWBzIG9yIGBzY2hlbWFgc1xuXHRAcGFyYW0ge0FycmF5fSBzZXF1ZW5jZSBhIGBzZXF1ZW5jZWBcblx0QHJldHVybnMge1tBcnJheV19IGFycmF5cyBvZiBgc3Vic2VxdWVuY2VgcyAocmVwcmVzZW50ZWQgYnkgYHJlZmBzKSwgcmVzcGVjdGl2ZSB0byB0aGUgZ2l2ZW4gYHNwYWNlYHMsIHN0YXJ0aW5nIGZyb20gZWFjaCBpdGVtIGluIHRoZSBgc2VxdWVuY2VgXG4qL1xuZnVuY3Rpb24gc3Vic2VxdWVuY2VzKHNwYWNlLCBzZXF1ZW5jZSkge1xuXHRjb25zdCBzdWJTcyA9IHNlcXVlbmNlLnJlZHVjZSgoc3ViU3MsIGl0ZW0sIGkpID0+IHtcblx0XHRjb25zdCBzdWJTc1NwYWNlID0gc3BhY2UucmVkdWNlKChzdWJTcywgc3BhY2UpID0+IHtcblx0XHRcdGNvbnN0IHN1YlMgPSBzdWJzZXF1ZW5jZShzcGFjZSwgc2VxdWVuY2Uuc2xpY2UoaSkpXG5cdFx0XHRpZiAoIXN1YlMpIHJldHVybiBzdWJTc1xuXHRcdFx0XG5cdFx0XHRzdWJTcy5wdXNoKHN1YlMubWFwKHJlZiA9PiBpICsgcmVmKSlcblx0XHRcdFxuXHRcdFx0cmV0dXJuIHN1YlNzXG5cdFx0fSwgW10pXG5cdFx0XG5cdFx0aWYgKCFzdWJTc1NwYWNlLmxlbmd0aCkgcmV0dXJuIHN1YlNzXG5cdFx0XG5cdFx0c3ViU3MucHVzaChzdWJTc1NwYWNlKVxuXHRcdHJldHVybiBzdWJTc1xuXHR9LCBbXSlcblx0XG5cdHJldHVybiBzdWJTc1xufVxuXHRcbi8qKlxuXHRAcGFyYW0ge0FycmF5fSBzU3JjIGEgYHNlcXVlbmNlYFxuXHRAZGVzY3JpcHRpb24gRm9ybSBhIGBzdWJzZXF1ZW5jZWAgYnkgdW5zaGlmdGluZyBgaXRlbWBzIGZyb20gdGhlIGdpdmVuIGBzZXF1ZW5jZWAgdW50aWwgdGhlIGdpdmVuIGBzcGFjZWAgaXMgZmlsbGVkIGluIHRoZSBgc3Vic2VxdWVuY2VgXG4qL1xuZnVuY3Rpb24gZmlsbFNwYWNlKGQsIHNTcmMsIHMsIGZpbGwpIHtcblx0aWYgKHNTcmMubGVuZ3RoID09PSAwKSByZXR1cm4gc1xuXHRcblx0Y29uc3QgX3NTcmMgPSBbLi4uc1NyY11cblxuXHRjb25zdCBpdGVtU3BhY2UgPSBfc1NyYy5zaGlmdCgpXG5cdGNvbnN0IGROZXcgPSBkIC0gaXRlbVNwYWNlXG5cdFxuXHRpZiAoZE5ldyA8IDApIHJldHVybiBzXG5cdFxuXHRzLnB1c2goaXRlbVNwYWNlKVxuXHRcblx0aWYgKDAgPT09IGROZXcpIHJldHVybiBzXG5cdFxuXHRyZXR1cm4gZmlsbChkTmV3LCBfc1NyYywgcywgZmlsbClcbn1cblxuLyoqXG5cdEBwYXJhbSB7QXJyYXl9IHNTcmMgYSBgc2VxdWVuY2VgXG4qL1xuZnVuY3Rpb24gZmlsbFNjaGVtYShkLCBzU3JjLCBzLCBmaWxsKSB7XG5cdGlmIChzU3JjLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHNcblx0XG5cdGNvbnN0IF9zU3JjID0gWy4uLnNTcmNdXG5cblx0Y29uc3QgaXRlbVNwYWNlID0gX3NTcmMuc2hpZnQoKVxuXHRpZiAoIWQuaW5jbHVkZXMoaXRlbVNwYWNlKSkgcmV0dXJuIHNcblx0XG5cdHMucHVzaChpdGVtU3BhY2UpXG5cdFxuXHRjb25zdCBfZCA9IFsuLi5kXTsgX2Quc3BsaWNlKGQuaW5kZXhPZihpdGVtU3BhY2UpLCAxKVxuXHRcblx0aWYgKF9kLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHNcblxuXHRyZXR1cm4gZmlsbChfZCwgX3NTcmMsIHMsIGZpbGwpXG59XG5cdFxuZXhwb3J0IHtcblx0c3Vic2VxdWVuY2VzU2VxdWVuY2VzLFxuXHRzdWJzZXF1ZW5jZXMsXG5cdFxuXHRmaWxsU3BhY2UsIGZpbGxTY2hlbWEsXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHtzdWJzZXF1ZW5jZXMsIHN1YnNlcXVlbmNlc1NlcXVlbmNlcywgbmVnYXRlT3ZlcmxhcHN9IGZyb20gJy4uLy4uL3NyYy9pbmRleC5qcydcbmltcG9ydCB7c3Vic2VxdWVuY2VzU2VxdWVuY2VzQ29udGFpbmVyLCBzZXF1ZW5jZUFuYWx5emVkQ29udGFpbmVyfSBmcm9tICcuL2VsZW1lbnRzLmpzJ1xuaW1wb3J0IHtyZW5kZXJTZXF1ZW5jZSwgcmVuZGVyU3Vic2VxdWVuY2VzLCByZW5kZXJDb250cm9scywgZml2ZVJhbmRvbVNlcXVlbmNlc30gZnJvbSAnLi9jb3JlLmpzJ1xuaW1wb3J0IHNlcXVlbmNlcyBmcm9tICcuL3NlcXVlbmNlcy5qcydcblxuaW1wb3J0ICcuL2luZGV4Lmh0bWwnXG5pbXBvcnQgJy4vaW5kZXguc2NzcydcblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5fSBzdWJzZXF1ZW5jZXMgYW4gYXJyYXkgb2Ygc2VxdWVuY2VzIG9mIGBzdWJzZXF1ZW5jZXNgXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IGFuIGVsZW1lbnQgd2l0aCByZW5kZXJlZCBzZXF1ZW5jZXMgb2YgYHN1YnNlcXVlbmNlc2BcbiAqIEBkZXNjcmlwdGlvbiByZW5kZXJzIHRoZSBvdXRwdXQgb2YgbmVnYXRlT3ZlcmxhcHNcbiovXG5mdW5jdGlvbiByZW5kZXJTdWJzZXF1ZW5jZXNTZXF1ZW5jZXMoc3Vic2VxdWVuY2VzLCBzZXF1ZW5jZSkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHN1YnNlcXVlbmNlc1NlcXVlbmNlc0NvbnRhaW5lcigpXG5cbiAgICBzdWJzZXF1ZW5jZXMubWFwKHN1YlNzID0+IHJlbmRlclN1YnNlcXVlbmNlcyhzdWJTcywgc2VxdWVuY2UpKS5mb3JFYWNoKHN1YlMgPT4gY29udGFpbmVyLmFwcGVuZENoaWxkKHN1YlMpKVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lclxufVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXl9IHNlcXVlbmNlIGEgYHNlcXVlbmNlYFxuICogQHBhcmFtIHtOdW1iZXIgfHwgQXJyYXl9IHNwYWNlIGEgYHNwYWNlYCBvciBhIGBzY2hlbWFgXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4gKiBAZGVzY3JpcHRpb24gYW5hbHl6ZXMgYSBgc2VxdWVuY2VgIGFuZCByZW5kZXJzIGl0IHdpdGggdGhlIHJlc3VsdFxuKi9cbmZ1bmN0aW9uIHNlcXVlbmNlQW5hbHl6ZWQoc2VxdWVuY2UsIHNwYWNlKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gc2VxdWVuY2VBbmFseXplZENvbnRhaW5lcigpXG5cbiAgICBjb25zdCBfc3Vic2VxdWVuY2VzID0gc3Vic2VxdWVuY2VzKHNwYWNlLCBzZXF1ZW5jZSlcbiAgICBjb25zb2xlLmxvZyhfc3Vic2VxdWVuY2VzKVxuXG4gICAgY29uc3Qgc2VxdWVuY2VzID0gc3Vic2VxdWVuY2VzU2VxdWVuY2VzKFtdLCBfc3Vic2VxdWVuY2VzLCBfc3Vic2VxdWVuY2VzKVxuXG4gICAgY29uc29sZS5sb2coc2VxdWVuY2VzKVxuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJlbmRlclNlcXVlbmNlKHNlcXVlbmNlKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmVuZGVyU3Vic2VxdWVuY2VzU2VxdWVuY2VzKHNlcXVlbmNlcywgc2VxdWVuY2UpKVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lclxufVxuXG5mdW5jdGlvbiBzZXF1ZW5jZXNBbmFseXplZChzZXF1ZW5jZXMsIHNwYWNlLCBjb250YWluZXIpIHtcbiAgICBjb250YWluZXIucmVwbGFjZUNoaWxkcmVuKC4uLnNlcXVlbmNlcy5tYXAoc2VxdWVuY2UgPT4gc2VxdWVuY2VBbmFseXplZChzZXF1ZW5jZSwgc3BhY2UpKSlcbn1cblxuZnVuY3Rpb24gbWFpbihzZXF1ZW5jZXNDb250YWluZXIsIGNvbnRyb2xzQ29udGFpbmVyKSB7XG4gICAgY29uc3QgY29udHJvbENiID0gKHJhdGlvKSA9PiB7XG4gICAgICAgIGNvbnN0IF9zZXF1ZW5jZXMgPSBmaXZlUmFuZG9tU2VxdWVuY2VzKHJhdGlvLCBzZXF1ZW5jZXMpXG4gICAgICAgIHNlcXVlbmNlc0FuYWx5emVkKF9zZXF1ZW5jZXMsIFtbMl0sIFsxLDJdLCBbMSwxLDFdXSwgc2VxdWVuY2VzQ29udGFpbmVyKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRyb2xzKHNlcXVlbmNlcywgY29udHJvbHNDb250YWluZXIsIGNvbnRyb2xDYilcblxuICAgIGNvbnN0IF9zZXF1ZW5jZXMgPSBmaXZlUmFuZG9tU2VxdWVuY2VzKDIsIHNlcXVlbmNlcylcbiAgICBzZXF1ZW5jZXNBbmFseXplZChfc2VxdWVuY2VzLCBbWzJdLCBbMSwyXSwgWzEsMSwxXV0sIHNlcXVlbmNlc0NvbnRhaW5lcilcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgbWFpbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbiAuc2VxdWVuY2VzLWFuYWx5emVkJyksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluIC5jb250cm9scycpKVxufSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=