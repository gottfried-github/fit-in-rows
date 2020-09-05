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

function breakIntoGroups() {}

function formGroups(spaceToFill, sequence) {
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

/**
  @param groups from formGroups
  @param groupsInitial refs to @groups
*/
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

module.exports = {
  formGroups,
  formSide,
  GroupsByItem,
}
