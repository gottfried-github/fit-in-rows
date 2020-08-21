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

/**
  @param {Int} originI index of the origin item in the sequence, from which
  items are taken
*/
class _Group {
  constructor(origin, originI, spaceToFill, before, after) {
    this.origin = origin; this.originI = originI
    this.spaceToFill = spaceToFill
    this.before = before || null
    this.after = after || null
  }

  get reachedLeftLimit() {
    return (this.before)
      ? this.before.reached
      : false
  }

  set reachedLeftLimit() {
    throw new Error('reachedLeftLimit is read-only')
  }

  get reachedRightLimit() {
    return (this.after)
      ? this.after.reached : false
  }

  set reachedRightLimit() {
    throw new Error('reachedRightLimit is read-only')
  }

  get spaceLeft() {
    return this.spaceToFill - (
      this.origin.space +
      (this.before && 'number' === typeof(this.before.spaceLeft) || 0) +
      (this.after && 'number' === typeof(this.after.spaceLeft) || 0)
    )
  }

  set spaceLeft() {
    throw new Error('spaceLeft is read-only')
  }

  get sequence() {
    return [
      ...(this.before || []), this.origin, ...(this.after || [])
    ]
  }

  set sequence() {
    throw new Error('sequence is read-only')
  }

  get originI() {
    return (this.before || []).length
  }

  set originI() {
    throw new Error('originI is read-only')
  }
}

function formGroup(spaceToFill, i, s) {
  let spaceLeft = spaceToFill
  spaceLeft -= s[i].space

  if (space <= 0) {
    return new _Group(s[i], i, spaceToFill, null, null)
    // return {
    //   g: [i], spaceLeft: space,
    //   reachedLeftLimit: true, reachedRightLimit: true,
    // }
  }

  const after = doFormGroup(1, space, i, s, [])
  console.log('formGroup, after', after)

  if (after.spaceLeft === 0) {
    return new _Group(s[i], i, spaceToFill, null, after)
    // return {
    //   g: [i].concat(after.g),
    //   spaceLeft: after.spaceLeft,
    //   reachedLeftLimit: false,
    //   reachedRightLimit: !!after.reached
    // }
  }

  const before = doFormGroup(-1, after.spaceLeft, i, s, [])
  console.log('formGroup, before', before)

  return new _Group(s[i], i, spaceToFill, before, after)
  // return {
  //   g: before.g.concat([i].concat(after.g)),
  //   spaceLeft: before.spaceLeft,
  //   reachedRightLimit: after.reached,
  //   reachedLeftLimit: before.reached
  // }
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

/*
class GroupHalf {
  constructor(sequence, spaceLeft, reached) {

  }
}
*/

class GroupHalf {
  constructor(sequence, spaceLeft, reachedLimit) {
    this.sequence = sequence
    this.spaceLeft = spaceLeft
    this.reachedLimit = reachedLimit
  }
}

function doFormGroup(d, spaceLeft, i, s, g) {
  if (i+d > s.length-1 || i+d < 0) {
    // $Group.Reaching-Limit.3
    return new GroupHalf(g, spaceLeft, true)
    // return {reached: true, spaceLeft, g}
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

    return new GroupHalf(g, spaceLeftNew, false)
    // return {g, spaceLeft: spaceLeftNew}
  } else {
    // $Group.Reaching-Limit.2
    return new GroupHalf(g, spaceLeft, true)
    // return {reached: true, spaceLeft, g}
  }
}

module.exports = {
  formGroup, doFormGroup, formGroups,
  GroupsByItem,
}
