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

class Variant {
  constructor(items, compatiblePredecessors) {
    this.items = items || []
    this.compatiblePredecessors = compatiblePredecessors || []
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
  constructor(v) {
    if (undefined !== v) this.v = v
  }

  set v(v) {
    if ("number" !== typeof(v) || !Number.isInteger(v) || 0 === v)
      throw new Error("delta must be an integer, greater or less than 0")

    this._v = v
  }

  get v() {
    return this._v
  }

  increment() {
    (this.v > 0) ? this.v++ : this.v--
    return this.v
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

  let g = new UniDirectionalList(true, [i])
  g.spaceLeft = space

  g = doFormGroup(
    new Delta(1), space, i, s, g
  )

  console.log("formGroup, didFormGroupIncremental", g)
  if (g.spaceLeft === 0) return g

  if (g.reached) {
    // g.reachedOpposite = g.reached; g.reached = false

    const _g = new UniDirectionalList(false, g.items)
    _g.spaceLeft = g.spaceLeft
    g = doFormGroup(
      new Delta(-1), g.spaceLeft, i, s, _g

    )
  }

  return g
}

function doFormGroup(d, spaceLeft, i, s, g) {
  if (i+d.v > s.length-1 || i+d.v < 0) {
    g.reached = true;
    if (undefined === g.spaceLeft) g.spaceLeft = spaceLeft
    return g
  }

  if (spaceLeft < 0) {
    g.reached = true; g.spaceLeft = spaceLeft + s[i+d.v].space
    return g
  } else if (spaceLeft === 0) {
    return Object.assign(g, spaceLeft)
  } else {
    g.add(i+d.v)
    spaceLeft -= s[i+d.v].space
    d.increment()
    return doFormGroup(d, spaceLeft, i, s, Object.assign(g, spaceLeft))
  }
}

/*
Item { space: 1 },
Item { space: 1 },
Item { space: 1 },
Item { space: 1 },
Item { space: 1 },
5: Item { space: 2 },
Item { space: 1 },
Item { space: 1 },
8: Item { space: 2 },
9: Item { space: 2 }


r:
[5,6]
[8,9]: spaceLeft - 0
[8,9]: spaceLeft - 0
*/

/*
function formGroup(space, i, s) {
  const gAfter = doFormGroup(1, space, i, s, [])
  console.log('formGroup, gAfter', gAfter)

  if (gAfter.spaceLeft === 0) {
    // gAfter.g.metFloor = false
    // gAfter.g.metCeiling = !!gAfter.reached
    return {
      g: gAfter.g, spaceLeft: gAfter.spaceLeft,
      reachedLowerLimit: false,
      reachedUpperLimit: gAfter.reached
    }
  }

  const gBefore = doFormGroup(-1, gAfter.spaceLeft, i, s, [])
  console.log('formGroup, gBefore', gBefore)

  return {
    g: gBefore.concat(gAfter),
    spaceLeft: gBefore.spaceLeft,
    reachedUpperLimit: gAfter.reached,
    reachedLowerLimit: gBefore.reached
  }
}

function doFormGroup(d, spaceLeft, i, s, g) {
  if (i+d > s.length-1 || i+d < 0) {
    return {reached: true, spaceLeft, g}
  }

  const spaceLeftNew = spaceLeft - s[i+d].space

  if (spaceLeftNew > 0) {
    (d > 0) ? g.push(i+d) : g.unshift(i+d)
    (d > 0) ? d++ : d--

    return doFormGroup(d, spaceLeftNew, i, s, g)
  } else if (spaceLeftNew < 0) {
    return {reached: true, spaceLeft, g}
  } else {
    return {g, spaceLeftNew}
  }

  // if (spaceLeftNew === 0) {
  //   return {g, spaceLeftNew}
  // } else if (spaceLeftNew < 0) {
  //   return {reached: true, spaceLeft, g}
  // } else {
  //   (d > 0) ? g.push(i+d) : g.unshift(i+d)
  //   (d > 0) ? d++ : d--
  //   return doFormGroup(d, spaceLeftNew, i, s, g)
  // }

  // if (spaceLeft === 0) {
  //   return {g, spaceLeft}
  // } else if (spaceLeft < 0) {
  //   spaceLeft += spaceAdj
  //   return {reached: true, spaceLeft, g}
  // } else {
  //   g.add(i+d.v)
  //   d.increment()
  //   return doFormGroup(d, spaceLeft, i, s, Object.assign(g, spaceLeft))
  // }
}

function doFormGroup(d, spaceLeft, i, s, g) {
  if (i+d.d > s.length-1 || i+d.d < 0) {
    return {reached: true, spaceLeft, g}
  }

  if (spaceLeft < 0) {
    return {reached: true, spaceLeft: spaceLeft + s[i+d.d].space, g}
  } else if (spaceLeft === 0) {
    return {g, spaceLeft}
  } else {
    g.add(i+d.d)
    // spaceLeft -= s[i+d.d].space
    d.increment()
    return doFormGroup(d, spaceLeft, i, s, Object.assign(g, spaceLeft))
  }
}
*/

module.exports = {
  formGroup, doFormGroup, formGroups,
  GroupsByItem, Variant, UniDirectionalList, Delta,
}
