const {doRecursivelyIterate, makeRecursivelyIterate} = require('recursion-and-discrete-math')

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

function getSize(sequence) {
  return sequence.reduce((sum, i) => sum+i, 0)
}

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

// eg, for size 2: [2], [1,1]
// size 3: [1,1,1], [1,2]
// size 4: [1,1,2], [2,2]
/*
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

function formGroup(schemas, sequence) {
  let g = {s:[], schemaLeft: [null]}

  while (g.shemaLeft.length === 0 || schemas.length === 0) {
    g = formSideBySchema([], [].concat(sequence), schemas.shift())
  }

  return g
}

/**
  Form a group (of the size, specified by spaceToFill) for each
  item in the given sequence, such that the group starts with that item.
  This forms all possible groups with the given size; it also occasionally
  forms some groups that are of smaller size, whenever it's not possible to
  form the proper size
*/
function formGroupsAll(spaceToFill, sequence) {
  const groups = []

  const sequenceIndexed = sequence.map((item, i) => {
    return {...item, i}
  })

  while (sequenceIndexed.length>0) {
    groups.push(formSide([], [].concat(sequenceIndexed), spaceToFill))
    sequenceIndexed.shift()
  }

  // sequence.forEach((item, i) => {
  //   const g = formSide([], sequence, spaceToFill)
  // })

  return groups
}

function formGroups(spaceToFill, sequence) {
  const groups = []
  sequence = sequence.map((item, i) => {
    return {...item, i}
  })

  while (sequence.length > 0) {
    const g = formSide([], [].concat(sequence), spaceToFill)
    groups.push(g)
    sequence.splice(0, g.s.length)
  }

  return groups
}

/**
  @returns
*/
function formSideBySpace(s, sSrc, spaceLeft) {
  if (sSrc.length === 0) return {s, spaceLeft, reachedLimit: true}

  const item = sSrc.shift()
  const spaceLeftNew = spaceLeft - item.space

  if (spaceLeftNew >= 0) s.push(item)

  if (spaceLeftNew > 0) return formSide(s, sSrc, spaceLeftNew)
  if (0 === spaceLeftNew) return {s, spaceLeft: spaceLeftNew, reachedLimit: false}

  return {s, spaceLeft, reachedLimit: true}
}

function formSideBySchema(s, sSrc, schema) {
  if (sSrc.length === 0) return {s, schemaLeft: schema, reachedLimit: true}

  const item = sSrc.shift()
  if (!schema.includes(item.space)) return {
    s, schemaLeft: schema, reachedLimit: true
  }

  schema.splice(schema.indexOf(item.space), 1)
  s.push(item)

  if (schema.length === 0) return {s, schemaLeft: schema, reachedLimit: false}
  return formSideBySchema(s, sSrc, schema)
}

function arrangeSequence(sequence, spaceToFill) {
  const groups = formGroups(sequence)
}

/*
function findGroupSequences(groups) {}
function doFindGroupSequences(groups) {
  const sequences = []
  const sequencesByGroups = []

  groups.forEach((g, i) => {
    if (0 === i) {sequences.push([i]); return}

    const sequence = sequences[sequences.length-1]
    const gPrev = sequence[sequence.length-1]

    if (overlaps(g, gPrev)) {
      // groupsInitial.push(i);
      return
    }

    if (!isAdjacent(g, gPrev)) return

    if (sequencesByGroups[i]) {
      sequencesByGroups[i].push(sequences.length-1);
      break // i.e don't continue the forEach loop
    }

    sequence.push(g)
    sequencesByGroups[i] = [sequences.length-1]
  })
}
*/

/**
  @param groups from formGroups
  @param groupsInitial refs to @groups
  function findGroupSequences(groups) {
    const sequences = []
    const sequencesByGroups = []
    const groupsInitial = []

    groups.forEach((g, i) => {
      if (0 === i) {sequences.push([i]); return}

      const sequence = sequences[sequences.length-1]
      const gPrev = sequence[sequence.length-1]

      if (overlaps(g, gPrev)) {
        groupsInitial.push(i); return
      }

      if (isAdjacent(g, gPrev)) {
        sequence.push(g); sequencesByGroups[i] = [sequences.length-1]
        return
      }

      // if (!overlaps(g, gPrev) && isAdjacent(g, gPrev)) {
      //   sequences[0].push(g)
      // } else {
      //   groupsInitial.push(i)
      // }
    })

    doFindGroupSequences(groups, groupsInitial, sequences, sequencesByGroups)
  }

  function doFindGroupSequences(groups, groupsInitial, sequences, sequencesByGroups) {
  }
*/

/*
function findGroupSequences(groups) {
  const sequences = []
  const sequencesByGroups = []

  groups.forEach()
}

function sequenceGroups(groups) {
  const sequences = []
  groups.forEach(g => {
    if (sequences.length === 0) {
      sequences.push([g])
      return
    }

    const sequence = sequences[sequences.length-1]
    const gPrev = sequence[sequence.length-1]
    if (!overlaps(gPrev, g)) {
      sequence.push(g)
    }
  })
}
*/

/**
  @param {[Int, Int, ...]} a, b
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

function isAdjacent(a, b) {
  return b[0] - a[a.length-1] === 1
    || a[0] - b[b.length-1] === 1
}

module.exports = {
  createSchemaPermutations,
  formGroups, formGroupsAll,
  permutationsToCombinations, isRatioEqual,
  sortItemsByType,
  // formSide,
  GroupsByItem,
}
