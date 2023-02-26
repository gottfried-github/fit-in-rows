import {size, delta, isDeltaEmpty, overlaps, containsSubsequences} from './helpers.js'
import {fillSpace, fillSchema} from './subsequence.js'

function cutSubsequences(subsequence, subsequences) {
    while (subsequences.length && overlaps(subsequence, subsequences[0][0])) subsequences = subsequences.slice(1)

    return subsequences
}

/**
* @param {Array} sequence a `sequence`
* @param {Array} subsequences arrays of `subsequence`s as returned by `subsequences`
* @param {Array} subsequencesAll arrays of `subsequence`s as returned by `subsequences`
* @returns {Array} array of sequences of `subsequence`s where none of the `subsequence`s overlap
*/
function subsequencesSequences(sequence, subsequences) {
	const sequences = []
	
    if (!subsequences.length) return [sequence]
    
    for (const subsequence of subsequences[0]) {
        console.log('subsequencesSequences, forEach - sequence, subsequence:', sequence, subsequence)

        if (!sequence.length) {
            sequences.push(...subsequencesSequences([subsequence], subsequences.slice(1)))
            continue
        }

        if (!overlaps(sequence[sequence.length-1], subsequence)) {
            sequences.push(...subsequencesSequences([...sequence, subsequence], subsequences.slice(1)))
            continue
        }

        const _subsequences = cutSubsequences(sequence[sequence.length-1], subsequences)
        sequences.push(...subsequencesSequences(sequence, _subsequences))
        break
    }
	
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

export {
	subsequences, subsequencesSequences,
}