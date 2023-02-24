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
	
	console.log('delta, delta:', delta)
	
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
		if (subsequence[subsequence.length-1] < last) return true
		return false
	}
	
	return false
}

export {
	size, delta, isDeltaEmpty, overlaps, containsSubsequences
}
