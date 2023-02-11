/**
  @param {[Int]} [a,b] Int being the index of an `item` in the `sequence`
*/
function overlaps(a, b) {
  let i = 0, l = a.length
  for (i; i<l; i++) {
    if (b.includes(a[i])) return true
  }

  return false
}

/**
  @param {`space` || `schema`} space a sequence of `items`
  @param {[Item]} sequence a sequence of `items`
*/
function delta(space, sequence) {
  if ('number' === typeof(space)) return space - size(sequence)
  if (!Array.isArray(space)) throw new Error()

  return space.reduce((d, i) => {
    if (sequence.includes(i)) return d
    d.push(i); return d
  }, [])
}

/**
  @param {[Item]} sequence a sequence of `items`
*/
function size(sequence) {
  return sequence.reduce((sum, i) => sum+i, 0)
}

/**
  @param {`space` || `schema`} space a sequence of `items`
  @param {[Item]} sequence a sequence of `items`
*/
function isDeltaEmpty(space, sequence) {
  const _delta = delta(space, sequence)
  return Array.isArray(_delta)
    ? 0 === _delta.length
    : 0 === _delta
}

/*
// this hasn't been run
function isAdjacent(a, b) {
  return b[0] - a[a.length-1] === 1
    || a[0] - b[b.length-1] === 1
}

@param {Subsequence} [a, b]
function overlaps(a, b) {
  const bIs = b.items.map((item, i) => b.location+i)

  let i = 0, l = a.items.length
  for (i; i<l; i++) {
    if (bIs.includes(a.location+i)) return true
  }

  return false
}

function overlaps(a, b) {
  return doOverlaps(
    a.items.map((item, i) => a.i+i)
    b.items.map((item, i) => b.i+i)
  )
}

  @param {[Int]} a, @param {[Int]} b
    where Int is the position of the respective item in the source `sequence`
function doOverlaps(a, b) {
  let i = 0, l = a.length
  for (i; i<l; i++) {
    if (b.includes(a[i])) return true
  }

  return false
}
*/

export {
  delta, size, overlaps, isDeltaEmpty,
}
