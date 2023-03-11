import {size, delta, isDeltaEmpty, overlaps, containsSubsequences} from './helpers.js'
import {fillSpace, fillSchema} from './subsequence.js'

function subsequencesSequences(subsequences) {
    let {sequences, subsequencesUnvisited} = _subsequencesSequences([], subsequences.map((v, i) => i), subsequences, [], [])

    while (subsequencesUnvisited.length) {
        console.log('subsequencesSequences - subsequencesUnvisited:', subsequencesUnvisited)
        const res = _subsequencesSequences([], subsequencesUnvisited, subsequences, [], [])

        sequences.push(...res.sequences)
        subsequencesUnvisited = res.subsequencesUnvisited
    }

    return sequences
}

function cutSubsequences(subsequence, subsequencesMap, subsequences) {
    const remainder = []

    while (subsequencesMap.length && overlaps(subsequence, subsequences[subsequencesMap[0]][0])) {
        remainder.unshift(subsequencesMap[0])
        subsequencesMap = subsequencesMap.slice(1)
    }

    return {subsequencesMap, remainder}
}

function filterUnvisited(subsequencesUnvisited, subsequencesVisited) {
    for (const sS of subsequencesVisited) {
        if (subsequencesUnvisited.includes(sS)) subsequencesUnvisited.splice(subsequencesUnvisited.indexOf(sS), 1)
    }

    return subsequencesUnvisited
}

/**
* @param {Array} sequence a `sequence`
* @param {Array} subsequences arrays of `subsequence`s as returned by `subsequences`
* @param {Array} subsequencesAll arrays of `subsequence`s as returned by `subsequences`
* @returns {Array} array of sequences of `subsequence`s where none of the `subsequence`s overlap
*/
function _subsequencesSequences(sequence, subsequencesMap, subsequences, subsequencesVisited, subsequencesUnvisited) {
    const sequences = []
	
    if (!subsequencesMap.length) {
        sequences.push(sequence)
        return {sequences, subsequencesUnvisited}
    }

    for (const subsequence of subsequences[subsequencesMap[0]]) {
        if (!sequence.length) {
            subsequencesVisited.push(subsequencesMap[0])
            filterUnvisited(subsequencesUnvisited, subsequencesVisited)

            const res = _subsequencesSequences([subsequence], subsequencesMap.slice(1), subsequences, subsequencesVisited, subsequencesUnvisited)
            sequences.push(...res.sequences)

            continue
        }

        if (!overlaps(sequence[sequence.length-1], subsequence)) {
            subsequencesVisited.push(subsequencesMap[0])    
            filterUnvisited(subsequencesUnvisited, subsequencesVisited)

            const res = _subsequencesSequences([...sequence, subsequence], subsequencesMap.slice(1), subsequences, subsequencesVisited, subsequencesUnvisited)
            sequences.push(...res.sequences)
            
            continue
        }

        const cutRes = cutSubsequences(sequence[sequence.length-1], subsequencesMap, subsequences)
        subsequencesUnvisited.push(...cutRes.remainder)
        
        const res = _subsequencesSequences(sequence, cutRes.subsequencesMap, subsequences, subsequencesVisited, subsequencesUnvisited)
        sequences.push(...res.sequences)
        
        break
    }
	
	return {sequences, subsequencesUnvisited}
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