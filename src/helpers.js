const {doRecursivelyIterate, makeRecursivelyIterate} = require('recursion-and-discrete-math')

function allSchemas(size, itemTypes, ordered) {
  const ps = createSchemaPermutations(size, itemTypes)
  if (ordered) return ps
  return permutationsToCombinations(ps, itemTypes)
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

function permutationsToCombinations(ps, itemTypes) {
  const combinations = []

  const ratios = ps.reduce((ratios, p, i) => {
    // console.log('p', ps[i])
    const pR = sortItemsByType(p)
    if (0 === ratios.length) {
      combinations.push(p); return [pR]
    }

    let _i = 0, l = ratios.length
    while (_i < l) {
      // console.log(ps[_i])
      if (isRatioEqual(ratios[_i], pR)) return ratios
      _i++
    }

    combinations.push(ps[i])
    ratios.push(pR)
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

/**
  @param {Subsequence} a, b
  // this hasn't been run
*/
function overlaps(a, b) {
  const _a = a.s.map((item, i) => a.i+i),
  _b = b.s.map((item, i) => b.i+i)

  let i = 0, l = a.s.length
  for (i; i<l; i++) {
    if (_b.includes(_a[i])) return true
  }

  return false
}

/*
@param {[Int, Int, ...]} a, b
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
*/

// this hasn't been run
function isAdjacent(a, b) {
  return b[0] - a[a.length-1] === 1
    || a[0] - b[b.length-1] === 1
}

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

function sortItemsBySpace(sequence) {
  return sequence.reduce((topology, v, i) => {
    if (topology.has(v.space)) {
      topology.get(v.space).push(i)
    } else {
      topology.set(v.space, [i])
    }

    return topology
  }, new Map())
}

function countItems(sequence) {
  return sequence.reduce((itemsCount, i) => {
    if (i === 0) { itemsCount.n++ }
    else if (i === 1) { itemsCount.w++ }
    else { throw new Error("i must be either 0 or 1")}

    return itemsCount
  }, {n: 0, w: 0})
}

/**
  @param {Array} g a group, produced by maximizeGroupsDifference
*/
function isDenseGroup(g) {
  if (g.length <= 1) return null

  return (g.length <= 1)
    ? null
    : (g[0] === g[1]) ? true
    : false
}

function maximizeGroupsDifference(seq) {
  return seq.reduce((groups, v) => {
    if (groups.length === 1 && groups[groups.length-1].length === 0) {
      groups[groups.length-1].push(v)
      return groups
    }

    const lastGroup = groups[groups.length-1]
    const last = lastGroup[lastGroup.length-1]
    const secondToLast = lastGroup[lastGroup.length-2]

    if (secondToLast === undefined ||
      v === last && secondToLast === last ||
      v !== last && secondToLast !== last
    ) {lastGroup.push(v)} else if (
      v === last && secondToLast !== last
    ) {groups.push([lastGroup.pop(), v])} else if (
      v !== last && secondToLast === last
    ) {
      groups.push([v])
    }

    return groups
  }, [[]])
}

module.exports = {
  createSchemaPermutations, permutationsToCombinations, allSchemas,
  getSize, isRatioEqual,
  overlaps, isAdjacent,
  sortItemsByType,
  GroupsByItem,
  maximizeGroupsDifference,
  sortItemsBySpace, countItems,
}
