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
  class _Group {
    constructor(originI, spaceToFill, sequence) {
      this.originI = originI
      this.spaceToFill = spaceToFill
      this.sequence = sequence

      const res = this.form(originI, spaceToFill, sequence)
      if (res.after) this.after = res.after
      if (res.before) this.before = res.before
    }

    form(i, space, s) {
      space -= s[i].space
      if (space <= 0) {
        return null
        // return new _Group(s[i], i, spaceToFill, null, null)
        // return {
        //   g: [i], spaceLeft: space,
        //   reachedLeftLimit: true, reachedRightLimit: true,
        // }
      }

      const after = doFormGroup(1, space, i, s, [])
      console.log('formGroup, after', after)

      if (after.spaceLeft === 0) {
        return {after}
        // return new _Group(s[i], i, spaceToFill, null, after)
        // return {
        //   g: [i].concat(after.g),
        //   spaceLeft: after.spaceLeft,
        //   reachedLeftLimit: false,
        //   reachedRightLimit: !!after.reached
        // }
      }

      const before = doFormGroup(-1, after.spaceLeft, i, s, [])
      console.log('formGroup, before', before)

      return {after, before}
      // return new _Group(s[i], i, spaceToFill, before, after)
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
*/

// class to use in functional formGroup right below
class Group {
  constructor(originI, spaceToFill, sequence, {before, after}) {

  }

  get origin() {
    return this._sequence[this._originI]
  }


}

function formGroup(originI, spaceToFill, sequence) {
  const origin = sequence[originI]
  // const before = sequence.slice(0, originI)
  // const after = sequence.slice(originI+1)
  if (0 === originI) {
    const after = formSide([], sequence.slice(1), spaceToFill-origin.space)
    return {
      origin, after: after.s, before: null,
      reachedLeftLimit: true, // $Groups.Reaching-Limit.3
      reachedRightLimit: true, // $Groups.Reaching-Limit.1 (see * below)
      spaceLeft: after.spaceLeft
    }

    // * some, possibly, irrelevant notes:
    // if !after.reachedLimit, then spaceLeft must be 0
    // (see $FormSide.note)
  }


  if (sequence.length-1 === originI) {
    const before = formSide([],
      sequence.slice(0, sequence.length-2).reverse(),
      spaceToFill-origin.space
    ); before.s.reverse()

    return {
      origin, after: null, before: before.s,
      reachedLeftLimit: true, // $Groups.Reaching-Limit.1
      reachedRightLimit: true, // $Groups.Reaching-Limit.3
      spaceLeft: before.spaceLeft
    }
  }

  const before = formSide([],
    sequence.slice(0, originI).reverse(),
    spaceToFill-origin.space
  ); before.s.reverse()

  const after = formSide([], sequence.slice(originI+1), spaceToFill-origin.space)

  return {

  }

}

/**

  @returns
*/
function formSide(s, sSrc, spaceLeft) {
  if (sSrc.length === 0) return {s, spaceLeft, reachedLimit: true}

  const item = sSrc.shift()
  const spaceLeftNew = spaceLeft - item.space

  if (spaceLeftNew >= 0) s.push(item)

  if (spaceLeftNew > 0) return formSide(s, sSrc, spaceLeftNew)
  if (0 === spaceLeftNew) return {s, spaceLeft: spaceLeftNew, reachedLimit: false}

  return {s, spaceLeft, reachedLimit: true}
}

/*
// example usage of formSide; a sketch for formGroup (although likely irrelevant)
function formGroup(originI, spaceToFill, sequence) {
  const origin = sequence[originI]
  const sBefore = sequence.slice(0, originI)
  const sAfter = sequence.slice(originI)

  return {
    before: (sBefore.length > 0)
      ? formSide([], sBefore.reverse(), SpaceToFill-origin.space).reverse() : null,
    after: (sBefore.length > 0)
      ? formSide([], sAfter, spaceLeft) : null
  }
}
function formGroup(originI, spaceToFill, sequence) {
  const origin = sequence[originI]
  const sBefore = sequence.slice(0, originI)
  const sAfter = sequence.slice(originI)

  return {
    before: (sBefore.length > 0)
      ? formSide([], sBefore.reverse(), spaceLeft).reverse() : null,
    after: (sBefore.length > 0)
      ? formSide([], sAfter, spaceLeft) : null
  }
}

// example usage of formSide
function lookFwd(originI, spaceToFill, sequence) {
  return formSide([], sequence.slice(originI), spaceToFill)
}

// example usage of formSide
function lookBwd(originI, spaceToFill, sequence) {
  return formSide(
    [], sequence.slice(0, originI).reverse(), spaceToFill
  ).reverse()
}
*/

/*
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
*/

module.exports = {
  formGroup, formSide,
  GroupsByItem,
}
