const {randomBinaryProportionateSeqSecond} = require('./test-helpers')
const {permutationsToCombinations, getSize, isRatioEqual, overlaps, isAdjacent, sortItemsByType} = require('./helpers')

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
  It's assumed here, that each subsequent group in groups
  is situated further in the sequence of items by at least
  one item (see Notes.Subsequences)
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

function cascadeSubsequence(subS, sequences, cascade) {
  if (0 === sequences.length) return [[subS]]

  if (!overlaps(sequences[0][sequences[0].length-1], subS)) {
    sequences[0].push(subS)
    return sequences
  }

  const s = sequences.shift()
  return [s, ...cascade(subS, sequences, cascade)]
}

/**
  @param {[Int || [Int]]} space array of @space params to pass to formHomogeneousSubsequences
  @param {Sequence} sequence (see $Sequence in notes.md)
*/
function formSubsequences(space, sequence) {
  return space.reduce((bySpace, space) => {
    bySpace.push(formHomogeneousSubsequences(space, clone(sequence)))
    return bySpace
  }, [])
}

/**
  @param {Int || [Int]} space space to fill (either a number or a schema)
  @param {Sequence} sequence (see $Sequence in notes.md)
*/
function formHomogeneousSubsequences(space, sequence) {
  const subSs = []

  const len = sequence.length
  while (sequence.length>0) {
    const data = Array.isArray(space)
      ? fillSchema(clone(space), clone(sequence), [], fillSchema)
      : fillSpace(clone(space), clone(sequence), [], fillSpace)

    const subS = new Subsequence(...[...data, len - sequence.length])
    if (subS.isDeltaEmpty()) subSs.push(subS)

    sequence.shift()
  }

  return subSs
}

/**
  @param {Sequence} sSrc (see $Sequence in notes.md)
*/
function fillSpace(d, sSrc, s, fill) {
  if (sSrc.length === 0) return [s, d, true]

  const itemSpace = sSrc.shift()
  const dNew = d - itemSpace

  if (dNew < 0) return [s, d, true]

  s.push(itemSpace)

  if (0 === dNew) return [s, dNew, false]

  return fill(dNew, sSrc, s, fill)
}

/**
  @param {Sequence} sSrc (see $Sequence in notes.md)
*/
function fillSchema(d, sSrc, s, fill) {
  if (sSrc.length === 0) return [s, d, true]

  const itemSpace = sSrc.shift()
  if (!d.includes(itemSpace)) return [s, d, true]

  d.splice(d.indexOf(itemSpace), 1)
  s.push(itemSpace)

  if (d.length === 0) return [s, d, false]
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

module.exports = {
  negateOverlaps, doNegateOverlaps, cascadeGroup,
  formGroupsAll, formGroupsAllHomo,

  fillSpace, fillSchema, formSideByOrderedSchema,

  formGroups,

  t: require('./test-helpers'),
}
