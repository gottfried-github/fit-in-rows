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

  @param {[{slots: Int}, ...]} rowStructure where slots defines how many slots a row contains
  @param {[{space: Int}]} g where space is how many slots the item takes
  @param {[{space: 1 || 2}]} g where space is how many slots the item takes
*/

class Variant {
  constructor(items, compatiblePredecessors) {
    this.items = items || []
    this.compatiblePredecessors = compatiblePredecessors || []
  }
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

class UniDirectionalList {
  constructor(fwd, items) {
    if ('boolean' !== typeof(fwd)) throw new Error('fwd must be a boolean')
    this.fwd = fwd

    this.items = items || []
  }

  add(...items) {
    (this.fwd)
      ? this.items.push(...items)
      : this.items.unshift(...items.reverse())
  }
}

class Delta {
  constructor(d) {
    if (undefined !== d) this.d = d
  }

  set d(d) {
    if ("number" !== typeof(d) || !Number.isInteger(d) || 0 === d)
      throw new Error("delta must be an integer, greater or less than 0")

    this._d = d
  }

  get d() {
    return this._d
  }

  increment() {
    (this.d > 0) ? this.d++ : this.d--
    return this.d
  }
}

function formGroups(space, s, items) {
  const groupsByItem = new GroupsByItem()
  items.forEach(i => {
    groupsByItem.push(i, formGroup(space, i, s))
  })

  return groupsByItem.toArray()
}

function formGroup(space, i, s) {
  space -= s[i].space
  if (space === 0) {
    const g = [i]; g.spaceLeft = space
    return g
  } else if (space < 0)
  {const g = []; g.reached = true}


  let g = doFormGroup(
    new Delta(1), space, i, s, new UniDirectionalList(true, [i])
  )

  if (g.spaceLeft === 0) return g

  if (g.reached) {
    // g.reachedOpposite = g.reached; g.reached = false

    g = doFormGroup(
      new Delta(-1), g.spaceLeft, i, s,
      new UniDirectionalList(false, g.items)
    )
  }

  return g
}

function doFormGroup(d, spaceLeft, i, s, g) {
  if (i+d.d > s.length-1 || i+d.d < 0) {
    g.reached = true;
    if (undefined === g.spaceLeft) g.spaceLeft = spaceLeft
    return g
  }

  if (spaceLeft < 0) {
    g.reached = true; g.spaceLeft = spaceLeft + s[i+d.d].space
    return g
  } else if (spaceLeft === 0) {
    return Object.assign(g, spaceLeft)
  } else {
    g.add(i+d.d)
    spaceLeft -= s[i+d.d].space
    d.increment()
    return doFormGroup(d, spaceLeft, i, s, Object.assign(g, spaceLeft))
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

function formGroupsLegacy(items, spaceToFill, sequence) {
  const groupsByItem = new GroupsByItem()
  items.forEach((i) => {
    groupsByItem.push(i, formGroup(i, 1, spaceToFill, sequence))
  })

  return groupsByItem.toArray(groupsByItem)
}

function formGroupLegacy(i, spaceLeft, s) {
  if (0 === spaceLeft - s[i].space) return [i]

  const g = [i]
  spaceLeft = spaceLeft - s[i].space

  let iNext = i,
  checkedBefore = false, checkedAfter = false

  while (spaceLeft > 0) {
    if (iNext === i) { // which it is in the start of the loop
      g.push(i)

      if (i+1 <= s.length-1) {
        iNext = i+1
      } else if (i-1 < 0) {break} else {
        iNext = i-1
      }
    } else {
      const spaceDifference = spaceLeft - s[iNext].space

      if (spaceDifference < 0) {
        if (iNext > i) {
          checkedAfter = true
          // if (checkedBefore || i-1 < 0) break
          if (checkedBefore) break
          if (i-1 < 0) {
            // checkedBefore = true;
            break
          }

          iNext = i-1
        } else {
          checkedBefore = true
          // if (checkedAfter || i+1 > s.length-1) break
          if (checkedAfter) break
          if (i+1 > s.length-1) {
            // checkedAfter = true
            break
          }

          iNext = i+1
        }
      } else if (spaceDifference === 0) {
        if (iNext > i) {
          g.push(iNext)
        } else {
          g.unshift(iNext)
        }

        break // or: spaceLeft = spaceDifference (which is 0)
      } else {
        if (iNext > i) {
          g.push(iNext)

          if (iNext+1 > s.length-1) {
            checkedAfter = true
            if (checkedBefore) break
            iNext = i-1
          } else {
            iNext++;
            spaceLeft = spaceDifference // checkedAfter = true;
          }
        } else { // if iNext < i
          g.unshift(iNext)

          if (iNext-1 < 0) {
            checkedBefore = true
            if (checkedAfter) break
            iNext = i+1
          } else {
            iNext--;
            checkedBefore = true; spaceLeft = spaceDifference
          }
        }
      }
    }
  }

  return g
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
  formGroup, doFormGroup, formGroups,
  formGroupsLegacy, formGroupLegacy,
  GroupsByItem, Variant, UniDirectionalList, Delta,
  maximizeGroupsDifference,
  sortItemsBySpace, countItems,
}
