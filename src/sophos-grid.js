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
  makeSeq, iterate, doIterate
}
