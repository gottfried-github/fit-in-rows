import {size, delta, isDeltaEmpty, overlaps, containsSubsequences} from './helpers.js'
import {fillSpace, fillSchema} from './subsequence.js'

function subsequencesSequences(_subsequences) {
    let {sequences, subsequences} = _subsequencesSequences([], _subsequences)

    while (subsequences.length) {
        console.log('subsequencesSequences - subsequences:', subsequences)
        const res = _subsequencesSequences([], subsequences)

        sequences.push(...res.sequences)
        subsequences = res.subsequences
    }

    return sequences
}

function cutSubsequences(subsequence, subsequences) {
    const remainder = []

    while (subsequences.length && overlaps(subsequence, subsequences[0][0])) {
        remainder.unshift(subsequences[0])
        subsequences = subsequences.slice(1)
    }

    return {subsequences, remainder}
}

/**
* @param {Array} sequence a `sequence`
* @param {Array} subsequences arrays of `subsequence`s as returned by `subsequences`
* @param {Array} subsequencesAll arrays of `subsequence`s as returned by `subsequences`
* @returns {Array} array of sequences of `subsequence`s where none of the `subsequence`s overlap
*/
function _subsequencesSequences(sequence, subsequences) {
	const res = {
        sequences: [],
        subsequences: []
    }
	
    if (!subsequences.length) {
        res.sequences.push(sequence)
        return res
    }
    
    for (const subsequence of subsequences[0]) {
        if (!sequence.length) {
            const _res = _subsequencesSequences([subsequence], subsequences.slice(1))
            res.sequences.push(..._res.sequences)
            res.subsequences.push(..._res.subsequences)

            continue
        }

        if (!overlaps(sequence[sequence.length-1], subsequence)) {
            const _res = _subsequencesSequences([...sequence, subsequence], subsequences.slice(1))
            res.sequences.push(..._res.sequences)
            res.subsequences.push(..._res.subsequences)

            continue
        }

        const cutRes = cutSubsequences(sequence[sequence.length-1], subsequences)
        res.subsequences.push(...cutRes.remainder)

        const _res = _subsequencesSequences(sequence, cutRes.subsequences)
        res.sequences.push(..._res.sequences)
        res.subsequences.push(..._res.subsequences)
        
        break
    }
	
	return res
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