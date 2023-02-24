// const {randomBinaryProportionateSeqSecond} = require('./test-helpers')
// const {permutationsToCombinations, getSize, isRatioEqual, sortItemsByType} = require('./schema-permutations')
import {size, delta, isDeltaEmpty, overlaps, containsSubsequences} from './helpers.js'

/**
function main(groupSchemas) {

}

// itemTypes: [Int]
// groupSize: {min: Int, max: Int}
function formAllSequences(itemTypes, groupSize) {
  const groupSizes = []
  let size = groupSize.min
  while (size < groupSize.max) {
    groupSizes.push(size++)
  }
}
*/

/**
 * @param {[Array, Array, ...]} subSs `subsequence`s where each `subsequence`'s first `item` is subsequent to the previous one's in a `sequence`
 * @comment This has been only tried on homogeneous subsequences
*/
function negateOverlaps(subSs) {
  return doNegateOverlaps(subSs, [], doNegateOverlaps)
}

function doNegateOverlaps(subSs, sequences, negate) {
  if (0 === subSs.length) return sequences

  return negate(subSs,
    cascadeSubsequence(subSs.shift(), sequences, cascadeSubsequence), negate
  )
}

/**
 * @param {Array} subS a `subsequence`
 * @param {[Array, Array, ...] || []} sequences of `subsequence`s
 * @returns sequences of `subsequence`s, represented by `ref`s, where none of the `subsequence`s overlap
 * @description appends the subS to the first sequence in the sequences where it doesn't overlap with the last `subsequence` or appends a new sequence, containing the subS, to the sequences if all sequences overlap
*/
function cascadeSubsequence(subS, sequences, cascade) {
  if (0 === sequences.length) return [[subS]]

  if (!overlaps(sequences[0][sequences[0].length-1], subS)) {
    sequences[0].push(subS)
    return sequences
  }

  // process or create next sequence
  const s = sequences.shift()
  return [s, ...cascade(subS, sequences, cascade)]
}

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

/*
function formSubsequence(space, sequence) {
  return new Subsequence(
    space, Array.isArray(space)
      ? fillSchema([...space], [...sequence], [], fillSchema)
      : fillSpace(space, [...sequence], [], fillSpace),
  )
}
*/

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

/*
// this hasn't been run
function formSideByOrderedSchema(schema, sSrc, s, formSide) {
  if (sSrc.length === 0) return {s, schemaLeft: schema, reachedLimit: true}

  const item = sSrc.shift()
  if (!schema.includes(item.space)) return {
    s, schemaLeft: schema, reachedLimit: true
  }

  schema.splice(schema.indexOf(item.space), 1)
  s.push(item)

  if (schema.length === 0) return {s, schemaLeft: schema, reachedLimit: false}
  return formSide(schema, sSrc, s, formSide)
}
*/

/**
  @param {Space || Schema} spaceToFill
  class Subsequence {
    constructor(spaceToFill, items, location) {
      this._spaceToFill = spaceToFill
      this.items = items
    }

    get delta() {
      return (Array.isArray(this._spaceToFill))
        ? this._spaceToFill.reduce((d, i) => {
          if (this.items.includes(i)) return d
          d.push(i); return d
        }, [])
        : this._spaceToFill - this.size
    }

    set delta(x) {
      throw new Error("delta is read-only")
    }

    get size() {
      return this.items.reduce((sum, i) => sum+i, 0)
    }

    set size(x) {
      throw new Error("size is read-only")
    }

    isDeltaEmpty() {
      return Array.isArray(this.delta)
        ? 0 === this.delta.length
        : 0 === this.delta
    }
  }
*/

export {
  subsequencesSequences,
  negateOverlaps, doNegateOverlaps, cascadeSubsequence,
  subsequences,

  fillSpace, fillSchema, fill,
}
