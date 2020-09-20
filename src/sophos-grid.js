const {randomBinaryProportionateSeqSecond} = require('./test-helpers')

const {permutationsToCombinations, getSize, isRatioEqual, overlaps, isAdjacent, sortItemsByType} = require('./helpers')

/**
  itemSchemas: {anyOf: [1, 2]} // amount of space an item can take
    (e.g., there can be two types of items: one that takes 1 slot of space
    and one that takes 2 slots of space)
  // groupSchemas: {
  //   s: {anyOf: [[2]]},
  //   m: {anyOf: [[1,1,1], [1,2]},
  //   l: {anyOf: [1,1,1,1,1], [2,2], [1,1,2]}
  // }

  +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // the variants are listed in the order of their priority
  // (e.g., ideally, we want the sequence to be broken into [1,2] and [1,1,1] groups.
  // If that's not feasible, we will first consider [2], [1,1,2]. Then if that
  // doesn't solve the problem, we're going to turn to [2,2], [1,1,1,1,1]
  // ) * the formGroup sketch is intended to implement this

  // * another version of priorities: [2] and [1,1,1]; [1,2], [1,1,2]; [2,2], [1,1,1,1,1];

  // order of items in each of the variants doesnt matter
  groupSchemas: {anyOf: [
    [2], [1,1,1], [1,2], [1,1,2], [2,2], [1,1,1,1,1]
    // [1,2], [1,1,1], [2], [1,1,2], [2,2], [1,1,1,1,1]
  ]}

  Note: I could generate all possible permutations of these schemas;
  all possible permutations of the order of their priority...
  I'd have to have possible item types given apriori (e.g., [1, 2]);
  min and max space for a group to take...
  See formAllSequences
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  OR
  groupSizes: [2, 3, 4, 5]
  e.g., 2: [2]; 3: [1,1,1], [1,2]; 4: [1,1,2], [2,2]; 5: [1,1,1,1,1]
*/
function main(groupSchemas) {

}

/**
  itemTypes: [Int]
  groupSize: {min: Int, max: Int}
*/
function formAllSequences(itemTypes, groupSize) {
  const groupSizes = []
  let size = groupSize.min
  while (size < groupSize.max) {
    groupSizes.push(size++)
  }
}

/*
// eg, for size 2: [2], [1,1]
// size 3: [1,1,1], [1,2]
// size 4: [1,1,2], [2,2]
function createSchemaPermutations(size, itemTypes) {
  const ps = []
  const schemas = []

  const l =

  const i = makeRecursivelyIterate((v, data, depth, cb) => {
    // console.log('v: ', v, 'data: ', data, 'depth: ', depth)
    cb((v) ? [data].concat(v) : [data])
  })

  i(itemTypes, size, false, (v) => {ps.push(v)}, i)

  ps.forEach((p, i) => {
    if (size === p.reduce((sum, i) => sum+i, 0)) schemas.push(p)
  })

  // const psSizes = ps.map(p => p.reduce((sum, i) => sum+i, 0))
  // const psSizesVisited = []
  //
  // psSizes.forEach((p, i) => {
  //   if (psSizesVisited.includes(p)) return
  //
  //   schemas.push(ps[i])
  //   psSizesVisited.push(p)
  // })

  return schemas
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

function formGroups(spaceToFill, sequence) {
  const groups = []
  sequence = sequence.map((item, i) => {
    return {...item, i}
  })

  while (sequence.length > 0) {
    const g = formSideBySpace([], [].concat(sequence), spaceToFill)
    groups.push(g)
    sequence.splice(0, g.s.length)
  }

  return groups
}

/*
function formGroup(schemas, sequence) {
  let g = {s:[], schemaLeft: [null]}

  while (g.shemaLeft.length === 0 || schemas.length === 0) {
    g = formSideBySchema([], [].concat(sequence), schemas.shift())
  }

  return g
}
*/

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

// the core logic in both formGroupBySpace (fillSpace) and formGroupBySchema (fillSchema) is
// the same, thus it might be better to put it in a single place.
// The equivalent would be to use fillSpace for space and fillSchema for
// for schema
/*
// this hasn't been run
function fillSpace(d, sSrc, s, formSide) {
  if (sSrc.length === 0) return {s, d, reachedLimit: true}
  const isSchema = 'object' === typeof(d)

  const item = sSrc.shift()
  const dNew = (isSchema) ? d : d - item.space

  if (
    isSchema && !dNew.includes(item.space)
    || !isSchema && dNew < 0
  ) return {s, d, reachedLimit: true}

  if (isSchema) dNew.splice(dNew.indexOf(item.space), 1)
  s.push(item)

  if (
    isSchema && dNew.length === 0
    || !isSchema && 0 === dNew
  ) return {s, d: dNew, reachedLimit: false}

  return formSide(dNew, sSrc, s, formSide)
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

/*
function doNegateOverlaps(groups, sequences, negate) {
  // console.log("groups:", groups, "sequences:", sequences);
  if (0 === groups.length) return {sequences, groups}
  // if (0 === sequences.length)
  //   return negate(groups, [[groups.shift()]], negate)

  if (!overlaps(sequences[0][0], groups[0])) {
    sequences[0][0].unshift(groups.shift())
    return negate(groups, sequences, negate)
  }

  const s = sequences.shift()
  if (0 === sequences.length) return {
    sequences: [s].concat([groups.shift()]), groups
  }

  const n = negate(groups, sequences, negate)

  // if (0 === groups.length) return {sequences, groups}
  return negate(n.groups, n.sequences, negate)

  // return [s].concat(sequences)

  // const s = sequences.shift()
  // const gPrev = sequences[0][0], g = groups[0] //.shift()
  //
  // if (!overlaps(gPrev, g)) {
  //   sequences[0][0].unshift(groups.shift())
  //   return negate(groups, sequences, negate)
  // }
  //
  // const s = sequences.shift()
  // const sequences = negate(groups, sequences, negate)
  // return negate()
}

function doNegateOverlaps(groups, sequences, negate) {
  console.log("groups:", groups, "sequences:", sequences);
  if (0 === groups.length) return sequences
  if (0 === sequences.length)
    return negate(groups, [[groups.shift()]], negate)

  // const s = sequences.shift()
  const gPrev = sequences[0][0], g = groups[0] //.shift()

  if (!overlaps(gPrev, g)) {
    sequences[0][0].unshift(groups.shift())
    return negate(groups, sequences, negate)
  }

  const s = sequences.shift()
  const sequences = negate(groups, sequences, negate)
  return negate()

  // if (overlaps(gPrev, g)) {
  //   const _sequences = negate(groups, sequences, negate)
  //
  //   return _sequences
  // }
  //
  // sequences[0][0].unshift(g)
  // return negate(groups, sequences, negate)
  // s.unshift(g)
  // sequences.unshift(s)
  //
  // return negate(groups, sequences, negate)
}

function doNegateOverlaps(groups, sequences, negate) {
  console.log("groups:", groups, "sequences:", sequences);
  if (0 === groups.length) return sequences
  if (0 === sequences.length)
    return negate(groups, [[groups.shift()]], negate)

  // const s = sequences.shift()
  const gPrev = sequences[0][0], g = groups.shift()

  if (overlaps(gPrev, g)) {
    const _sequences = negate(groups, sequences, negate)

    return _sequences
  }

  sequences[0][0].unshift(g)
  return negate(groups, sequences, negate)
  // s.unshift(g)
  // sequences.unshift(s)
  //
  // return negate(groups, sequences, negate)
}


function doNegateOverlaps(groups, sequences, negate) {
  if (0 === groups.length) return sequences
  if (0 === sequences.length)
    return negate(groups, [[groups.shift()]], negate)

  const s = sequences.shift()
  const gPrev = s[0], g = groups.shift()

  if (overlaps(gPrev, g)) {
    sequences = negate(
      (0 === sequences.length) ? groups : [g].concat(groups),
      (0 === sequences.length) ? [[g]] : sequences, negate
    )

    sequences.unshift(s)
    return negate(groups, sequences, negate)
  }

  s.unshift(g)
  sequences.unshift(s)

  return negate(groups, sequences, negate)
}

function doNegateOverlaps(groups, sequences, negate) {
  if (0 === groups.length) return sequences
  if (0 === sequences.length)
    return negate(groups, [[groups.shift()]], negate)

  const s = sequences.shift()
  const gPrev = s[0], g = groups.shift()

  if (overlaps(gPrev, g)) {
    sequences = negate(
      (0 === sequences.length) ? groups : [g].concat(groups),
      (0 === sequences.length) ? [[g]] : sequences, negate
    )
  }

  // s.unshift(g)
  sequences.unshift(s)

  return sequences
}

function doNegateOverlaps(groups, sequences, negate) {
  if (0 === groups.length) return sequences
  if (0 === sequences.length)
    return negate(groups, [[groups.shift()]], negate)

  const sClosest = sequences.shift()
  const gPrev = sClosest[0], g = groups.shift()

  if (overlaps(gPrev, g)) {
    return [sClosest].concat(negate(groups,
      (0 === sequences.length) ? [[g]] : sequences, negate
    ))
  }

  sClosest.unshift(g)
  return [sClosest].concat(sequences)
}

function doNegateOverlaps(groups, sequences, negate) {
  sClosest = sequences[0]
  const gPrev = sClosest[sClosest.length-1],
  g = groups.shift()

  if (gPrev)
}

function doNegateOverlaps(groups, sequences, negate) {
  const sLast = sequences[sequences.length-1]

  const gPrev = sLast[sLast.length-1],
  g = groups.shift()


}
*/

module.exports = {
  negateOverlaps, doNegateOverlaps, cascadeGroup,
  formGroupsAll, formGroupsAllHomo,

  fillSpace, fillSchema, formSideByOrderedSchema,

  formGroups,

  t: require('./test-helpers'),
}
