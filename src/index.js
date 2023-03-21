import {size, delta, isDeltaEmpty, overlaps, containsSubsequences} from './helpers.js'

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
		if (containsSubsequences(subsequenceLast ? subsequenceLast[subsequenceLast.length-1] : -1, subsequence[0], subsequencesAll.reduce((_subsequences, subsequences) => {_subsequences.push(...subsequences); return _subsequences}, []))) return

		if (subsequences.length === 1) {			
			sequences.push(_sequence)
			return
		}
		
		let _subsequences = subsequences.slice(1)
		
		// skip subsequences to follow that overlap with current subsequence
		while (overlaps(subsequence, _subsequences[0][0])) {
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
		while (overlaps(subsequence, _subsequences[0][0])) {      
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
	if (isDeltaEmpty(space, subS)) return subS.map( 
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
	
export {
	subsequencesSequences,
	subsequences,
	
	fillSpace, fillSchema,
}
