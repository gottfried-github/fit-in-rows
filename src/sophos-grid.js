const {doRecursivelyIterate, makeRecursivelyIterate} = require('recursion-and-discrete-math')
const {randomBinaryProportionateSeqSecond} = require('./test-helpers')

class GroupsByItem {
  constructor() {
    this.items = new Map()
  }

  push(i, ...groups) {
    if (this.items.has(i)) {
      this.items.get(i).push(...groups)
    } else {
      this.items.set(i, [...groups])
    }

    // this.items.push(new ItemGroups(i, groups))
  }

  toArray() {
    const itemsArr = []
    console.log(this.items)
    for (var [k,v] of this.items.entries()) {
      // console.log(k,v)
      itemsArr.push({i: k, gs: v})
    }

    return itemsArr
  }
}

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

function createSchemaPermutations(size, itemTypes) {
  if (itemTypes.filter(t => (t>size) ? true : false).length > 0) throw new Error()

  const schemas = []
  // if (itemTypes.includes(size)) schemas.push([size])

  let pSize = null, l = 0
  while (pSize <= size) {
    const ps = []

    const i = makeRecursivelyIterate((v, data, depth, cb) => {
      // console.log('v: ', v, 'data: ', data, 'depth: ', depth)
      cb((v) ? [data].concat(v) : [data])
    })
    i(itemTypes, l, false, (v) => {ps.push(v)}, i)

    // const ratios = []
    //
    // ps = ps.reduce((ps, p) => {
    //   sortItemsBySpace()
    //
    //   return ps
    // }, [])

    pSize = Math.min(...ps.map(p => getSize(p)))

    ps.forEach(p => {
      if (size === getSize(p)) schemas.push(p)
    })

    l++
  }

  return schemas
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

// this, I believe, doesnt work properly
function permutationsToCombinations(ps, itemTypes) {
  const combinations = []

  const ratios = ps.reduce((ratios, p, i) => {
    const pR = sortItemsByType(p)
    if (0 === ratios.length) return [pR]

    let _i = 0, l = ratios.length
    while (_i < l) {
      console.log(ps[i])
      if (isRatioEqual(ratios[_i], pR)) return ratios

      combinations.push(ps[i])

      ratios.push(pR)
      _i++
    }

    return ratios
  }, [])

  return combinations
}

function isRatioEqual(a, b) {
  const bKs = b.keys()
  // console.log(bKs)

  if (a.size !== b.size) return false

  let {done, value} = bKs.next()

  while (!done) {
    if (
    !a.has(value) || a.get(value).length !== b.get(value).length
    ) break

    const res = bKs.next()
    done = res.done; value = res.value
  }

  return done
}

function sortItemsByType(items) {
  return items.reduce((topology, v, i) => {
    if (topology.has(v)) {
      topology.get(v).push(i)
    } else {
      topology.set(v, [i])
    }

    return topology
  }, new Map())
}

function getSize(sequence) {
  return sequence.reduce((sum, i) => sum+i, 0)
}

function formGroup(schemas, sequence) {
  let g = {s:[], schemaLeft: [null]}

  while (g.shemaLeft.length === 0 || schemas.length === 0) {
    g = formSideBySchema([], [].concat(sequence), schemas.shift())
  }

  return g
}

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

function fillSpace(d, sSrc, s, fill) {
  if (sSrc.length === 0) return {s, d, reachedLimit: true}

  const item = sSrc.shift()
  const dNew = d - item.space

  if (dNew < 0) return {s, d, reachedLimit: true}

  s.push(item)

  if (0 === dNew) return {s, d: dNew, reachedLimit: false}
  return fill(dNew, sSrc, s, fill)
}

/**
  Example:
  `
  const sSrc = [{space: 1}, {space: 2}, {space: 1}]

  // both return: s: [1,2], reachedLimit: false, schemaLeft: []
  formSideBySchema([1,2], sSrc.map(i => i), [], formSideBySchema)
  formSideBySchema([2,1], sSrc.map(i => i), [], formSideBySchema)

  // returns: s: [1], reachedLimit: true, schemaLeft: [1,1]
  g.formSideBySchema([], sSrc, [1,1,1], g.formSideBySchema)

  // returns: s: [1,1], reachedLimit: true, schemaLeft: [1]
  formSideBySchema([1,1,1], [{space: 1}, {space: 1}], [], formSideBySchema)
  `
*/
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
  @param {[Int, Int, ...]} a, b
  // this hasn't been run
*/
function overlaps(a, b) {
  const overlap = []
  a.forEach((i) => {
    if (b.includes(i)) overlap.push(i)
  })

  let res = null

  if (overlap.length>0) {
    const aI = a.indexOf(overlap[0]),
    bI = b.indexOf(overlap[0])

    if (aI > bI) {
      return {
        res: [a, overlap, b],
        // res: [a.slice(0, aI), overlap, b.slice(bI+overlap.length)],
      }
    } else if (bI > aI) {
      return {
        res: [b, overlap, a],
        // res: [b.slice(0, bI), overlap, a.slice(aI+overlap.length)],
      }
    }

    return true
  }

  return false
}

// this hasn't been run
function isAdjacent(a, b) {
  return b[0] - a[a.length-1] === 1
    || a[0] - b[b.length-1] === 1
}

module.exports = {
  formGroupsAll, formGroupsAllHomo,

  fillSpace, fillSchema, formSideByOrderedSchema,

  createSchemaPermutations, permutationsToCombinations,
  isRatioEqual, sortItemsByType, getSize,

  formGroups,
  GroupsByItem,

  t: require('./test-helpers'),
}
