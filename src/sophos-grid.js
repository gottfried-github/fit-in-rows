
/**
  @type {Item} [{
    space: Int, groups: [ref to group (for example, a Variant)]
  }]
  @type {Variants} {variants: [Variants]}
  @type {{compatiblePredecessors: [Variants[i], ...], sequence: [Item, ...]}} Variant
  @type {Variant} {
    compatiblePredecessors: [PredescessorRef, ...],
    sequence: [Item, ...]
  }
  @type {PredescessorRef} {
    index: predescessor.variants[i],
    way:
      "add" ||
      "substract" ||
      "neglect" (special case of substract) ||
      "asIs"
    }
*/
class Variant {
  constructor(items, compatiblePredecessors) {
    this.items = items || []
    this.compatiblePredecessors = compatiblePredecessors || []
  }
}

/*
const Ways = new Set([
  "add",
  "substract",
  "neglect",
  "asIs",
])

class VariantRef {
  constructor(index, way) {
    if ("number" === typeof(index)) this.index = index
    if (undefined !== way && Ways.has(way)) {this.way = way} else {
      // throw new Error()
    }
  }
}
*/

/**
@param {[{slots: Int}, ...]} rowStructure where slots defines how many slots a row contains
@param {[{space: Int}]} g where space is how many slots the item takes
@param {[{space: 1 || 2}]} g where space is how many slots the item takes
*/
function secondDesc(rowStructure, sequence) {
  // const narrowItemsTopology = g.reduce(
  //   (topology, v, i) => {if (v === 0) topology.push(i)},
  // [])
  // const wideItemsTopology = g.reduce(
  //   (topology, v, i) => {if (v === 1) topology.push(i)},
  // [])

  const topology = sortItemsBySpace(sequence)

  check(3, topology.get(1), sequence)
}


class ItemGroups {
  constructor(i, groups) {
    this.index = i
    this.groups = groups || []
  }

  push(group) {this.groups.push(group)}
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
}

function check(slots, items, s) {
  const groupsByItem = new GroupsByItem()

  items.forEach((originI) => {
    const item = s[originI]
    let spaceToFill = slots - item.space
    if (spaceToFill === 0) {
      groupsByItem.push(originI, [originI]); return
    }

    let nextNeighborI = originI,
    checkedBefore = false, checkedAfter = false
    // lastNeighborSpace = null

    const g = []
    while (spaceToFill > 0) {
      if (nextNeighborI === originI) { // which it is in the start of the loop
        g.push(originI)

        if (originI+1 <= s.length-1) {
          nextNeighborI = originI+1
        } else if (originI-1 < 0) {break} else {
          nextNeighborI = originI-1
        }
      } else {
        const spaceDifference = spaceToFill - s[nextNeighborI].space

        if (spaceDifference < 0) {
          if (nextNeighborI > originI) {
            checkedAfter = true
            // if (checkedBefore || originI-1 < 0) break
            if (checkedBefore) break
            if (originI-1 < 0) {
              // checkedBefore = true;
              break
            }

            nextNeighborI = originI-1
          } else {
            checkedBefore = true
            // if (checkedAfter || originI+1 > s.length-1) break
            if (checkedAfter) break
            if (originI+1 > s.length-1) {
              // checkedAfter = true
              break
            }

            nextNeighborI = originI+1
          }

          // if (nextNeighborI > originI && !checkedBefore) {
            // if (originI-1 < 0) {break} else {
            //   nextNeighborI = originI-1
            // }
          // } else if (nextNeighborI < originI && !checkedAfter) {
            // nextNeighborI = originI+1
          // } else {
            // break
          // }
        } else if (spaceDifference === 0) {
          if (nextNeighborI > originI) {
            g.push(nextNeighborI)
          } else {
            g.unshift(nextNeighborI)
          }

          break // or: spaceToFill = spaceDifference (which is 0)
        } else {
          if (nextNeighborI > originI) {
            g.push(nextNeighborI)

            if (nextNeighborI+1 > s.length-1) {
              checkedAfter = true
              if (checkedBefore) break
              nextNeighborI = originI-1
            } else {
              nextNeighborI++;
              spaceToFill = spaceDifference // checkedAfter = true;
            }
          } else { // if nextNeighborI < originI
            g.unshift(nextNeighborI)

            if (nextNeighborI-1 < 0) {
              checkedBefore = true
              if (checkedAfter) break
              nextNeighborI = originI+1
            } else {
              nextNeighborI--;
              checkedBefore = true; spaceToFill = spaceDifference
            }
          }
        }
      }
    }

    console.log(originI, g)
    groupsByItem.push(originI, g)
  })

  const groupsByItemArr = []

  for ([k,v] of groupsByItem.items.entries()) {
    // console.log(k,v)
    groupsByItemArr.push({i: k, gs: v})
  }

  return groupsByItemArr
}


  // if (space < slots) {
  //
  // }
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

function fit(min, max, groups) {
  return groups.map((g) => {
    return {
      min: describeGroup(min, g),
      max: describeGroup(max, g),
      items: g
    }
  }).map(desc => {
    const {min, max, items} = desc

    return {
      minLeftover: min.leftover, minShortage: min.shortage,
      maxLeftover: max.leftover, maxShortage: max.shortage,
      items, count: min.count
    }
  })
}



/**
  @param {Array} g a group, produced by maximizeGroupsDifference
*/
function describeGroup(rowLength, g) {
  const {n, w} = countItems(g)
  const leftover = {
    n: (n < rowLength.n)
      ? n - rowLength.n
      : n % rowLength.n,
    w: (w < rowLength.w)
      ? w - rowLength.w
      : w % rowLength.w
  }

  const shortage = {
    n: (leftover.n <= 0)
      ? Math.abs(leftover.n)
      : rowLength.n - leftover.n,
    w: (leftover.w <= 0)
      ? Math.abs(leftover.w)
      : rowLength.w - leftover.w
  }

  return {leftover, shortage, count: {n, w}}
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

/**
  @param {n: Int, w: Int} min number of items of each type, allowed in a row
  @param {n: Int, w: Int} max

  function fit(min, max, groups) {
    return groups.map((g) => {
      const {nCount, wCount} = countItems(g)
      const leftover = {
        n: (nCount < min.n)
          ? nCount - min.n
          : nCount % min.n,
        w: (wCount < min.w)
          ? wCount - min.w
          : wCount % min.w
      }

      const shortage = {
        n: (nCount < min.n)
          ? min.n - nCount
          : nCount % min.n,
        w: (wCount < min.w)
          ? wCount - min.w
          : wCount % min.w
      }

      return {
        items: g, itemsCount,
        minModulo: {
          n: (itemsCount.n === 0) ? 0 : min.n % itemsCount.n,
          w: (itemsCount.w === 0) ? 0 : min.w % itemsCount.w,
        },
        maxModulo: {
          n: (itemsCount.n === 0) ? 0 : max.n % itemsCount.n,
          w: (itemsCount.w === 0) ? 0 : max.w % itemsCount.w,
        }, min, max
      }
    })
  }
*/

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

/**
  @param {[0 || 1, ...]} arr
*/
function makeSeq(arr) {
  return new Proxy(arr, {
    get(t, p, r) {
      if ("w" === p) {
        let w = 0
        t.forEach(i => {if (i === 1) {w++}})
        return w
      } else if ("n" === p) {
        let n = 0
        t.forEach(i => {if (i === 0) {n++}})
        return n
      } else if ("ratio" === p) {
        return r.n / r.w
      } else if ('ratioMax' === p) {
        return (t.length-1) / 1
      } else if ('ratioMin' === p) {
        return 1 / (t.length-1)
      } else if ('splice' === p) {
        // @param {{v: (the value of what to pass to splice)} || null (if not to pass anything)} items
        return (start, n, items) => {
          return (items)
            ? makeSeq(t.splice(start, n, items.v))
            : makeSeq(t.splice(start, n))
          }
      } else {
        return t[p]
      }
    }, set() {}
  })
}

function splitIntoChunks() {

}

function scan(seq) {

}

/**
  @param {Number} step in terms of a fraction of the length of the seq, by which
  to calibrate the cut of the sequence, based on compared ratios of narrow items to wide, in the two parts
*/
function doIterate(seq, step, initialRatio) {
  const ratio = seq.ratio
  let [subseqL, subseqR] = [seq, seq.splice(0, Math.round(seq.length/2))]

  // if (0 === subseqL.ratio || Infinity === subseqL.ratio)
  //   then it's a dense sequence, and we can throw it away (not deal with it in this method)

  // return new Set([
  //   {ratio: subseqL.ratio, w: subseqL.w, n: subseqL.n},
  //   {ratio: subseqR.ratio, w: subseqR.w, n: subseqR.n}
  // ])

  // return [ratio, subseqL.ratio, subseqR.ratio]
  return {subseqL, subseqR}
}

function iterate(seq) {
  return doIterate(seq, initialRatio)
}

/*
  @param {[0 || 1, ...]} seq
function calculate(seq) { // calculateRatio
  let w = 0, n = 0
  seq.forEach(i => (i === 1)
    ? w++ : n++
  )

  return {w, n}
}

@param {Array, such that arr.length is even} seq
function analyze(seq) {
  let [subseq0, subseq1] = [seq, seq.splice(0, seq.length/2)]

  return {
    subseq0: analyzeSubseq(subseq0),
    subseq1: analyzeSubseq(subseq1)
  }
}

function analyzeSubseq(seq) {
  const res = calculate(seq)
  res.ratio = res.w / res.n
  return res
}
*/

module.exports = {
  // calculate, analyze,
  makeSeq, iterate, doIterate,
  maximizeGroupsDifference, fit,
  secondDesc, sortItemsBySpace, check, Variant,
  GroupsByItem, tryit,
  describeGroup, countItems
}
