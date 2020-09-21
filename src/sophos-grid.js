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

function formGroupsAll(space, sequence) {
  return space.reduce((bySpace, space) => {
    bySpace.push(formGroupsAllHomo(space, sequence.map(i => i)))
    return bySpace
  }, [])
}

/**
  @param {Int || [Int]} space space to fill (either a number or a schema)
*/
function formGroupsAllHomo(space, sequence) {
  const isSchema = Array.isArray(space),
  fill = (isSchema) ? fillSchema : fillSpace,
  l = sequence.length

  const gs = [], gsMap = []

  while (sequence.length>0) {
    const g = fill(space.map(i => i), sequence.map(i => i), [], fill)

    const d = isSchema ? g.d.length : g.d
    g.i = l - sequence.length

    if (0 === d) gs.push(g)

    sequence.shift()
  }

  return gs
}

function fillSpace(d, sSrc, s, fill) {
  if (sSrc.length === 0) return {s, d, reachedLimit: true}

  const item = sSrc.shift()
  const dNew = d - item.space

  if (dNew < 0) return {s, d, reachedLimit: true}

  s.push(item)

  if (0 === dNew) return {s, d: dNew, reachedLimit: false}
  return fill(dNew, sSrc, s, fill)
}

function fillSchema(d, sSrc, s, fill) {
  if (sSrc.length === 0) return {s, d, reachedLimit: true}

  const item = sSrc.shift()
  if (!d.includes(item.space)) return {
    s, d, reachedLimit: true
  }

  d.splice(d.indexOf(item.space), 1)
  s.push(item)

  if (d.length === 0) return {s, d, reachedLimit: false}
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
  It's assumed here, that each subsequent group in groups
  is situated further in the sequence of items by at least
  one item (see Notes.Subsequences)
*/
function negateOverlaps(groups) {
  return doNegateOverlaps(groups, [], doNegateOverlaps)
}

function doNegateOverlaps(groups, sequences, negate) {
  if (0 === groups.length) return sequences

  return negate(groups,
    cascadeGroup(groups.shift(), sequences, cascadeGroup), negate
  )
}

function cascadeGroup(g, sequences, cascade) {
  if (0 === sequences.length) return [[g]]

  if (!overlaps(sequences[0][sequences[0].length-1], g)) {
    sequences[0].push(g)
    return sequences
  }

  const s = sequences.shift()
  return [s, ...cascade(g, sequences, cascade)]
}

module.exports = {
  negateOverlaps, doNegateOverlaps, cascadeGroup,
  formGroupsAll, formGroupsAllHomo,

  fillSpace, fillSchema, formSideByOrderedSchema,

  formGroups,

  t: require('./test-helpers'),
}
