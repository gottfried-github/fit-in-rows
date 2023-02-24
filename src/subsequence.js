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

export {fillSpace, fillSchema}