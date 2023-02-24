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
    
    if (subsequences.length === 1) {
      sequences.push(_sequence)
      return
    }

    let _subsequences = subsequences.slice(1)

    // detect overlapping subsequence
    while (overlaps(subsequence, _subsequences[0][0])) {      
      if (_subsequences.length === 1) {
        // skip recursion if space between the sequence and the subsequence can contain subsequences
        if (containsSubsequences(subsequenceLast ? subsequenceLast[subsequenceLast.length-1] : -1, subsequence[0], subsequencesAll.reduce((_subsequences, subsequences) => {_subsequences.push(...subsequences); return _subsequences}, []))) return
        
        sequences.push(...subsequencesSequences(sequence, _subsequences, subsequences))
        sequences.push(_sequence)
        
        return
      } 

      // skip recursion if space between the sequence and the subsequence can contain subsequences
      if (containsSubsequences(subsequenceLast ? subsequenceLast[subsequenceLast.length-1] : -1, subsequence[0], subsequencesAll.reduce((_subsequences, subsequences) => {_subsequences.push(...subsequences); return _subsequences}, []))) {
        _subsequences = _subsequences.slice(1)
        return
      }
      
      sequences.push(...subsequencesSequences(sequence, _subsequences, subsequences))

      _subsequences = _subsequences.slice(1)
    }

    // skip recursion if space between the sequence and the subsequence can contain subsequences
    if (containsSubsequences(subsequenceLast ? subsequenceLast[subsequenceLast.length-1] : -1, subsequence[0], subsequencesAll.reduce((_subsequences, subsequences) => {_subsequences.push(...subsequences); return _subsequences}, []))) return

    sequences.push(...subsequencesSequences(_sequence, _subsequences, subsequences))
  })

  return sequences
}

/**
 * @param {Number || Array} space a `space` or a `schema`
 * @param {Array} sequence a `sequence`
*/
function subsequence(space, sequence) {
  const subS = Array.isArray(space)
  ? fillSchema([...space], sequence, [], fillSchema)
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

function fill(space, sequence) {
  return Array.isArray(space)
    ? fillSchema([...space], [...sequence], [], fillSchema)
    : fillSpace(space, [...sequence], [], fillSpace)
}

/**
  @param {Sequence} sSrc a `sequence`
  @description Form a `subsequence` by unshifting `item`s from the given `sequence` until the given `space` is filled in the `subsequence`
*/
function fillSpace(d, sSrc, s, fill) {
  if (sSrc.length === 0) return s

  const itemSpace = sSrc.shift()
  const dNew = d - itemSpace

  if (dNew < 0) return s

  s.push(itemSpace)

  if (0 === dNew) return s

  return fill(dNew, sSrc, s, fill)
}

/**
  @param {Sequence} sSrc a `sequence`
*/
function fillSchema(d, sSrc, s, fill) {
  if (sSrc.length === 0) return s

  const itemSpace = sSrc.shift()
  if (!d.includes(itemSpace)) return s

  d.splice(d.indexOf(itemSpace), 1)
  s.push(itemSpace)

  if (d.length === 0) return s
  return fill(d, sSrc, s, fill)
}

export {
  subsequencesSequences,
  subsequences,

  fillSpace, fillSchema, fill,
}
