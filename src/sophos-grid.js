const {randomBinaryProportionateSeqSecond} = require('./test-helpers')
const {permutationsToCombinations, getSize, isRatioEqual, sortItemsByType} = require('./schema-permutations')
const {size, delta, isDeltaEmpty, overlaps} = require('./helpers')

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
 * @returns sequences of `subsequence`s where none of the `subsequence`s overlap
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
  @param {[Int || [Int]]} space array of @space params to pass to formHomogeneousSubsequences
  @param {Sequence} sequence (see $Sequence in notes.md)
*/
function formSubsequences(space, sequence) {
  return space.reduce((bySpace, space) => {
    bySpace.push(formHomogeneousSubsequences(space, [...sequence]))
    return bySpace
  }, [])
}

/**
  @param {Int || [Int]} space space to fill (either a number or a schema)
  @param {Array} sequence (see Sequence)
  @returns {Array} of `subsequence`s where each `subsequence`'s first `item` is subsequent to the previous `item` in the `sequence`
*/
function formHomogeneousSubsequences(space, sequence) {
  const subSs = []

  const originalLength = sequence.length
  while (sequence.length>0) {
    const subS = fill(space, sequence)

    // store refs to `items` in the `sequence` rather than the `items` themselves
    if (isDeltaEmpty(space, subS)) subSs.push(subS.map(
      (t,i) => (originalLength - sequence.length) + i
    ))

    sequence.shift()
  }

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
  @param {Sequence} sSrc (see Sequence)
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
  @param {Sequence} sSrc (see Sequence)
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

module.exports = {
  negateOverlaps, doNegateOverlaps, cascadeSubsequence,
  formSubsequences, formHomogeneousSubsequences,

  fillSpace, fillSchema, fill,

  // Subsequence,
  t: require('./test-helpers'),
}
