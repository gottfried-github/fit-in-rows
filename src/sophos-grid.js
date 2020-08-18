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

function formGroups(space, s, items) {
  const groupsByItem = new GroupsByItem()
  items.forEach(i => {
    groupsByItem.push(i, formGroup(space, i, s))
  })

  return groupsByItem.toArray()
}

function formGroup(space, i, s) {
  space -= s[i].space

  if (space <= 0) {
    return {
      g: [i], spaceLeft: space,
      reachedLeftLimit: true, reachedRightLimit: true,
    }
  }

  const gAfter = doFormGroup(1, space, i, s, [])
  console.log('formGroup, gAfter', gAfter)

  if (gAfter.spaceLeft === 0) {
    // gAfter.g.metFloor = false
    // gAfter.g.metCeiling = !!gAfter.reached
    return {
      g: [i].concat(gAfter.g),
      spaceLeft: gAfter.spaceLeft,
      reachedLeftLimit: false,
      reachedRightLimit: !!gAfter.reached
    }
  }

  const gBefore = doFormGroup(-1, gAfter.spaceLeft, i, s, [])
  console.log('formGroup, gBefore', gBefore)

  return {
    g: gBefore.g.concat([i].concat(gAfter.g)),
    spaceLeft: gBefore.spaceLeft,
    reachedRightLimit: gAfter.reached,
    reachedLeftLimit: gBefore.reached
  }
}

function doFormGroup(d, spaceLeft, i, s, g) {
  if (i+d > s.length-1 || i+d < 0) {
    // console.log('doFormGroup, i+d > s.length-1 || i+d < 0');
    return {reached: true, spaceLeft, g}
  }

  console.log('doFormGroup, d, spaceLeft, i', d, spaceLeft, i)
  console.log('doFormGroup, i+d, s[i+d].space', i+d, s[i+d].space)
  const spaceLeftNew = spaceLeft - s[i+d].space
  // console.log('doFormGroup, spaceLeftNew', spaceLeftNew);

  if (spaceLeftNew > 0) {
    (d > 0) ? g.push(i+d) : g.unshift(i+d);
    (d > 0) ? d++ : d--;

    return doFormGroup(d, spaceLeftNew, i, s, g)
  } else if (spaceLeftNew === 0) {
    (d > 0) ? g.push(i+d) : g.unshift(i+d)
    return {g, spaceLeft: spaceLeftNew}
  } else {
    return {reached: true, spaceLeft, g}
  }
}

/*
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
*/

module.exports = {
  formGroup, doFormGroup, formGroups,
  GroupsByItem,
}
